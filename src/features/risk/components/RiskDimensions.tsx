import {
  Card,
  ConfidenceMeter,
  EvidenceGapMarker,
  SectionHeader,
  StatusPill,
} from '../../../design-system/components';
import type { RiskDimension } from '../paymentRisk.types';

interface RiskDimensionsProps {
  dimensions: RiskDimension[];
}

const dimensionOrder: Record<string, number> = {
  'transaction-anomaly': 1,
  'receiver-behaviour': 2,
  'network-risk': 3,
};

const dimensionStepLabels: Record<string, string> = {
  'transaction-anomaly': '3',
  'receiver-behaviour': '4',
  'network-risk': '5',
};

export function RiskDimensions({ dimensions }: RiskDimensionsProps) {
  const sortedDimensions = [...dimensions].sort((a, b) => {
    const orderA = dimensionOrder[a.id] ?? 99;
    const orderB = dimensionOrder[b.id] ?? 99;
    return orderA - orderB;
  });

  return (
    <section className="payment-risk-section" aria-labelledby="section-risk-dimensions">
      <SectionHeader
        title="Behavioural & Network Risk Dimensions"
        description="Observed transaction patterns, receiver behaviour, and graph network evidence evaluated independently."
      />
      <div className="payment-risk-dimensions-grid">
        {sortedDimensions.map((dimension) => {
          const isAbstain = dimension.status === 'ABSTAIN' || dimension.availability === 'UNAVAILABLE';
          const stepNumber = dimensionStepLabels[dimension.id];

          return (
            <Card
              key={dimension.id}
              className={`payment-risk-dimension-card ${isAbstain ? 'payment-risk-dimension-card--abstain' : ''}`}
            >
              <div className="payment-risk-dimension-header">
                <div className="payment-risk-dimension-title-group">
                  {stepNumber && <span className="payment-risk-dimension-index">{stepNumber}.</span>}
                  <h3>{dimension.title}</h3>
                </div>
                <StatusPill status={dimension.status} />
              </div>

              {dimension.availability === 'UNAVAILABLE' || dimension.status === 'ABSTAIN' ? (
                <div className="payment-risk-dimension-gap">
                  <EvidenceGapMarker label="Evidence unavailable for this dimension" />
                  <p className="payment-risk-dimension-abstain-notice">
                    Baseline coverage is currently insufficient for a defensible assessment. The system withholds scoring to prevent speculative conclusions.
                  </p>
                </div>
              ) : (
                <div className="payment-risk-dimension-score-block">
                  {typeof dimension.score === 'number' && (
                    <ConfidenceMeter value={dimension.score} label="Observed Risk Score" />
                  )}
                  {dimension.availability === 'PARTIAL' && (
                    <div style={{ marginTop: 'var(--space-2)' }}>
                      <EvidenceGapMarker label="Partial baseline evidence" />
                    </div>
                  )}
                </div>
              )}

              <p className="payment-risk-dimension-explanation">{dimension.explanation}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
