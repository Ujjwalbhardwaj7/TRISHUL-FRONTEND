import { useQuery } from '@tanstack/react-query';
import { getPaymentRiskAssessment } from '../api/getPaymentRiskAssessment';

export function usePaymentRiskAssessment() {
  return useQuery({ queryKey: ['payment-risk-assessment'], queryFn: getPaymentRiskAssessment });
}
