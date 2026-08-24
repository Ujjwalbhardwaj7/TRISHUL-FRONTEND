import { Badge, Card, EvidenceGapMarker, SectionHeader } from '../../../design-system/components';
import type { TrustVerification as TrustVerificationData, TrustVerificationState } from '../paymentRisk.types';

interface TrustVerificationProps {
  trust: TrustVerificationData;
}

const trustTone: Record<TrustVerificationState, 'success' | 'warning' | 'neutral'> = {
  VERIFIED: 'success',
  UNVERIFIED: 'warning',
  REVOKED: 'neutral',
  UNAVAILABLE: 'neutral',
};

const trustBadgeLabel: Record<TrustVerificationState, string> = {
  VERIFIED: '✓ Verified Identity',
  UNVERIFIED: '⚠ Unverified Identity',
  REVOKED: '⊘ Revoked Credential',
  UNAVAILABLE: '⊘ Verification Unavailable',
};

export function TrustVerification({ trust }: TrustVerificationProps) {
  return (
    <section className="payment-risk-section" aria-labelledby="section-trust-verification">
      <SectionHeader
        title="PrivacyPass Trust Verification"
        description="Receiver cryptographic identity verification is evaluated independently from behavioural and network risk."
      />
      <Card className="payment-risk-trust-card">
        <div className="payment-risk-trust-header">
          <div className="payment-risk-trust-badges">
            <Badge tone={trustTone[trust.state]}>
              {trustBadgeLabel[trust.state]}
            </Badge>
            {trust.provider && (
              <span className="payment-risk-trust-provider">Provider: {trust.provider}</span>
            )}
          </div>
          {trust.checkedAt && (
            <span className="payment-risk-trust-time">
              Verified {new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(trust.checkedAt))}
            </span>
          )}
        </div>

        <div className="payment-risk-trust-body">
          {trust.state === 'UNAVAILABLE' ? (
            <EvidenceGapMarker label="Trust verification unavailable from provider" />
          ) : (
            <p className="payment-risk-trust-detail">
              {trust.detail ?? 'Receiver credential status confirmed by identity provider.'}
            </p>
          )}

          <div className="payment-risk-trust-distinction" role="note">
            <span className="payment-risk-trust-distinction-icon" aria-hidden="true">ℹ</span>
            <div className="payment-risk-trust-distinction-text">
              <strong>Domain Boundary: Identity Trust ≠ Transaction Safety</strong>
              <p>
                Verification confirms that receiver credentials match provider cryptographic records. It does not evaluate behavioural anomalies, money-flow risk, or payment legitimacy.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
