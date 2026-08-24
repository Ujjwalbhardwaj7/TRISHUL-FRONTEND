import { AlertBanner, Badge, Card, SectionHeader } from '../../../design-system/components';
import type { PaymentDecision, PaymentRiskReasonCode } from '../paymentRisk.types';

interface AssessmentDecisionProps {
  outcome: PaymentDecision;
  reasons: PaymentRiskReasonCode[];
  partnerDefined: boolean;
}

interface DecisionDetail {
  tone: 'success' | 'warning' | 'info';
  badgeLabel: string;
  title: string;
  description: string;
}

const DECISION_DETAILS: Record<PaymentDecision, DecisionDetail> = {
  ALLOW: {
    tone: 'success',
    badgeLabel: '✓ ALLOW',
    title: 'Allow Payment',
    description: 'Transaction risk remains within standard acceptable thresholds. No elevated intervention or step-up authentication is recommended.',
  },
  WARN: {
    tone: 'warning',
    badgeLabel: '⚠ WARN',
    title: 'Advisory Warning',
    description: 'Observable anomaly patterns warrant operational advisory logging or customer notification prior to execution.',
  },
  STEP_UP: {
    tone: 'info',
    badgeLabel: '⇪ STEP-UP',
    title: 'Step-Up Verification Required',
    description: 'Elevated transaction and receiver behavioural anomalies require secondary out-of-band or biometric authentication before fund release.',
  },
  BLOCK: {
    tone: 'warning',
    badgeLabel: '⛔ PARTNER BLOCK',
    title: 'Partner-Defined Block',
    description: 'Payment parameters match partner-configured risk intervention thresholds.',
  },
};

export function AssessmentDecision({
  outcome,
  reasons,
  partnerDefined,
}: AssessmentDecisionProps) {
  const detail = DECISION_DETAILS[outcome] ?? {
    tone: 'info',
    badgeLabel: outcome,
    title: outcome,
    description: 'Decision evaluated against current intelligence evidence.',
  };

  return (
    <section className="payment-risk-section" aria-labelledby="section-final-decision">
      <SectionHeader
        title="Final Decision"
        description="Consolidated intervention recommendation based on evaluated dimensions and configured policy."
      />
      <Card className="payment-risk-decision-card">
        <div className="payment-risk-decision-header">
          <div className="payment-risk-decision-main">
            <Badge tone={detail.tone} className="payment-risk-decision-badge">
              {detail.badgeLabel}
            </Badge>
            <h3 className="payment-risk-decision-title">{detail.title}</h3>
          </div>
          <div>
            {partnerDefined ? (
              <Badge tone="warning">Partner Policy Defined</Badge>
            ) : (
              <Badge tone="neutral">Standard Risk Engine</Badge>
            )}
          </div>
        </div>

        <p className="payment-risk-decision-desc">{detail.description}</p>

        {outcome === 'BLOCK' && (
          <AlertBanner tone="warning" title="Partner-Defined Policy Decision">
            TRISHUL records and communicates the partner policy decision; it does not autonomously block payment-network traffic.
          </AlertBanner>
        )}

        <div className="payment-risk-decision-reasons-block">
          <p className="payment-risk-decision-reasons-label">Decisive Reason Codes</p>
          {reasons.length > 0 ? (
            <div className="payment-risk-code-chips">
              {reasons.map((reason) => (
                <code key={reason} className="payment-risk-code-chip">
                  {reason}
                </code>
              ))}
            </div>
          ) : (
            <p className="payment-risk-decision-desc" style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
              No specific reason codes were attached to this outcome.
            </p>
          )}
        </div>
      </Card>
    </section>
  );
}
