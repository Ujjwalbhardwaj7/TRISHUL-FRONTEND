import { Card, SectionHeader } from '../../../design-system/components';
import type { PaymentRiskReasonCode } from '../paymentRisk.types';

interface ReasonCodesProps {
  reasons: PaymentRiskReasonCode[];
}

const REASON_CODE_METADATA: Record<
  PaymentRiskReasonCode,
  { label: string; description: string; category: string }
> = {
  NEW_BENEFICIARY: {
    label: 'New Beneficiary Relationship',
    description: 'First recorded transfer between this payer and receiver account within the observation window.',
    category: 'Relationship',
  },
  AMOUNT_ANOMALY: {
    label: 'Amount Baseline Deviation',
    description: 'Transfer value significantly exceeds the payer’s typical transaction volume and channel baseline.',
    category: 'Anomaly',
  },
  TIME_ANOMALY: {
    label: 'Time-of-Day Anomaly',
    description: 'Payment initiated outside the payer’s established operational activity hours.',
    category: 'Anomaly',
  },
  VELOCITY_SPIKE: {
    label: 'Velocity Spike',
    description: 'Unusual frequency of outbound transfers originating from the payer within a concentrated window.',
    category: 'Velocity',
  },
  RECEIVER_INFLOW_SPIKE: {
    label: 'Receiver Inflow Spike',
    description: 'Abrupt increase in incoming credit volume to the receiver account relative to historical averages.',
    category: 'Receiver',
  },
  FIRST_TIME_SENDER_SPIKE: {
    label: 'First-Time Sender Cluster',
    description: 'Elevated influx of credits received from multiple unlinked accounts within a short period.',
    category: 'Receiver',
  },
  HIGH_PASS_THROUGH: {
    label: 'High Pass-Through Ratio',
    description: 'Rapid outbound redistribution of funds following incoming credit arrival, consistent with pass-through flow.',
    category: 'Behaviour',
  },
  NETWORK_CONVERGENCE: {
    label: 'Network Convergence',
    description: 'Receiver node is topologically adjacent to multiple accounts exhibiting elevated risk indicators.',
    category: 'Network',
  },
};

export function ReasonCodes({ reasons }: ReasonCodesProps) {
  return (
    <section className="payment-risk-section" aria-labelledby="section-explainable-reasons">
      <SectionHeader
        title="Explainable Reason Codes"
        description="Structured behavioral indicators and anomaly markers supporting this evaluation."
      />
      <Card className="payment-risk-reasons-card">
        {reasons.length === 0 ? (
          <p className="payment-risk-reasons-empty">
            No elevated anomaly reason codes triggered for this transaction.
          </p>
        ) : (
          <div className="payment-risk-reasons-grid">
            {reasons.map((reason) => {
              const meta = REASON_CODE_METADATA[reason] ?? {
                label: reason.replace(/_/g, ' '),
                description: 'Observable risk signal identified during transaction evaluation.',
                category: 'Assessment',
              };

              return (
                <div key={reason} className="payment-risk-reason-item">
                  <div className="payment-risk-reason-top">
                    <code className="payment-risk-reason-code">{reason}</code>
                    <span className="payment-risk-reason-category">{meta.category}</span>
                  </div>
                  <h4 className="payment-risk-reason-label">{meta.label}</h4>
                  <p className="payment-risk-reason-desc">{meta.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </section>
  );
}
