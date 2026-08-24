import { apiRequest, unavailableEndpoint } from '../../../api/client';
import { paymentRiskAssessmentFixture } from '../fixtures/paymentRisk.fixture';
import type { PaymentRiskAssessment } from '../paymentRisk.types';

const configuredEndpoint = import.meta.env.VITE_PAYMENT_RISK_ASSESSMENT_PATH;

/**
 * Adapter boundary for the future payment-risk contract. The development fixture
 * is intentionally isolated and never used for production builds.
 */
export async function getPaymentRiskAssessment(): Promise<PaymentRiskAssessment> {
  if (configuredEndpoint) return apiRequest<PaymentRiskAssessment>(configuredEndpoint);
  if (import.meta.env.DEV) return paymentRiskAssessmentFixture;
  return unavailableEndpoint('Payment risk assessment');
}
