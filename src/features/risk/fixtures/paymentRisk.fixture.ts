import type { PaymentRiskAssessment } from '../paymentRisk.types';

/** Development-only fixture. It is not a representation of a production response. */
export const paymentRiskAssessmentFixture: PaymentRiskAssessment = {
  transaction: {
    reference: 'DEV-TRX-000184',
    amount: { value: 50000, currency: 'INR' },
    payer: { label: 'Payer account', identifier: '•••• 4821' },
    receiver: { label: 'Receiver account', identifier: '•••• 9038' },
    timestamp: '2026-08-25T09:42:00+05:30',
    provider: 'Development payment provider',
    paymentMethod: 'UPI',
  },
  trust: {
    state: 'VERIFIED',
    provider: 'PrivacyPass',
    detail: 'Receiver verification is available from the provider.',
    checkedAt: '2026-08-25T09:41:54+05:30',
  },
  dimensions: [
    {
      id: 'transaction-anomaly',
      title: 'Transaction anomaly',
      status: 'WATCH',
      availability: 'AVAILABLE',
      score: 72,
      explanation: 'Amount and beneficiary relationship differ from the payer’s observed baseline.',
    },
    {
      id: 'receiver-behaviour',
      title: 'Receiver behaviour',
      status: 'SUSPECTED',
      availability: 'AVAILABLE',
      score: 68,
      explanation: 'Recent inflow and pass-through activity warrant review before the payment proceeds.',
    },
    {
      id: 'network-risk',
      title: 'Network risk',
      status: 'ABSTAIN',
      availability: 'UNAVAILABLE',
      explanation: 'Network evidence is not currently sufficient for a defensible assessment.',
    },
  ],
  reasons: ['NEW_BENEFICIARY', 'AMOUNT_ANOMALY', 'RECEIVER_INFLOW_SPIKE', 'HIGH_PASS_THROUGH'],
  decision: {
    outcome: 'STEP_UP',
    reasons: ['NEW_BENEFICIARY', 'AMOUNT_ANOMALY', 'RECEIVER_INFLOW_SPIKE', 'HIGH_PASS_THROUGH'],
    partnerDefined: false,
  },
  dataCompleteness: 'PARTIAL',
  dataNotice: 'Network evidence is unavailable for this assessment. The decision reflects the available transaction and receiver evidence.',
};
