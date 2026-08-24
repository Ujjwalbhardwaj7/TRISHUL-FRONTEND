import {
  AlertBanner,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
} from '../../design-system/components';
import { AssessmentDecision } from './components/AssessmentDecision';
import { ReasonCodes } from './components/ReasonCodes';
import { RiskDimensions } from './components/RiskDimensions';
import { TransactionSummary } from './components/TransactionSummary';
import { TrustVerification } from './components/TrustVerification';
import { usePaymentRiskAssessment } from './hooks/usePaymentRiskAssessment';
import './paymentRisk.css';

export function RiskQueuePage() {
  const { data, error, isError, isPending, refetch } = usePaymentRiskAssessment();

  if (isPending) {
    return <LoadingState variant="content" label="Loading payment assessment" />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={() => void refetch()} />;
  }

  if (!data) {
    return (
      <EmptyState
        title="Assessment unavailable"
        description="No payment-risk assessment is available for this transaction."
      />
    );
  }

  return (
    <div className="payment-risk-page">
      <PageHeader
        eyebrow="Payment Risk / Verify"
        title="Payment Risk Assessment"
        description="Trust verification and observed behavioural risk are evaluated and presented independently."
      />

      {data.dataCompleteness === 'PARTIAL' && (
        <AlertBanner tone="warning" title="Partial Assessment Notice">
          {data.dataNotice ?? 'Some evidence is unavailable. Review the available dimensions before acting.'}
        </AlertBanner>
      )}

      {/* Visual Hierarchy:
          1. Transaction Summary
          2. PrivacyPass Trust Verification
          3. Transaction Anomaly
          4. Receiver Behaviour
          5. Network Risk
          6. Explainable Reason Codes
          7. Final Decision
      */}

      {/* 1. Transaction Summary */}
      <TransactionSummary transaction={data.transaction} />

      {/* 2. PrivacyPass Trust Verification */}
      <TrustVerification trust={data.trust} />

      {/* 3, 4, 5. Risk Dimensions (Transaction Anomaly, Receiver Behaviour, Network Risk) */}
      <RiskDimensions dimensions={data.dimensions} />

      {/* 6. Explainable Reason Codes */}
      <ReasonCodes reasons={data.reasons} />

      {/* 7. Final Decision */}
      <AssessmentDecision
        outcome={data.decision.outcome}
        reasons={data.decision.reasons}
        partnerDefined={data.decision.partnerDefined}
      />
    </div>
  );
}
