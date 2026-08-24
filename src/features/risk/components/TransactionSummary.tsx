import { Card, SectionHeader } from '../../../design-system/components';
import type { PaymentTransaction } from '../paymentRisk.types';

interface TransactionSummaryProps {
  transaction: PaymentTransaction;
}

const timestampFormat = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function TransactionSummary({ transaction }: TransactionSummaryProps) {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: transaction.amount.currency,
    maximumFractionDigits: 0,
  }).format(transaction.amount.value);

  return (
    <section className="payment-risk-section" aria-labelledby="section-transaction-summary">
      <SectionHeader
        title="Transaction Summary"
        description="Anchor payment event under evaluation."
      />
      <Card className="payment-risk-transaction-card">
        <div className="payment-risk-transaction-hero">
          <div className="payment-risk-transaction-amount-group">
            <span className="payment-risk-transaction-amount-label">Evaluated Amount</span>
            <p className="payment-risk-transaction-amount">{formattedAmount}</p>
            <p className="payment-risk-transaction-ref">
              <span>Ref:</span>
              <code>{transaction.reference}</code>
            </p>
          </div>

          <div className="payment-risk-transaction-route" aria-label="Transaction Direction">
            <div className="payment-risk-route-node">
              <strong>{transaction.payer.label}</strong>
              {transaction.payer.identifier && <span>{transaction.payer.identifier}</span>}
            </div>
            <span className="payment-risk-route-arrow" aria-hidden="true">→</span>
            <div className="payment-risk-route-node">
              <strong>{transaction.receiver.label}</strong>
              {transaction.receiver.identifier && <span>{transaction.receiver.identifier}</span>}
            </div>
          </div>
        </div>

        <dl className="payment-risk-details-grid">
          <div className="payment-risk-details-item">
            <dt>Payer Account</dt>
            <dd>
              <span>{transaction.payer.label}</span>
              {transaction.payer.identifier && (
                <span className="mono-tag">{transaction.payer.identifier}</span>
              )}
            </dd>
          </div>

          <div className="payment-risk-details-item">
            <dt>Receiver Account</dt>
            <dd>
              <span>{transaction.receiver.label}</span>
              {transaction.receiver.identifier && (
                <span className="mono-tag">{transaction.receiver.identifier}</span>
              )}
            </dd>
          </div>

          <div className="payment-risk-details-item">
            <dt>Recorded Timestamp</dt>
            <dd>{timestampFormat.format(new Date(transaction.timestamp))}</dd>
          </div>

          <div className="payment-risk-details-item">
            <dt>Payment Method</dt>
            <dd>{transaction.paymentMethod ?? 'Standard Electronic Transfer'}</dd>
          </div>

          {transaction.provider && (
            <div className="payment-risk-details-item">
              <dt>Originating Provider</dt>
              <dd>{transaction.provider}</dd>
            </div>
          )}

          <div className="payment-risk-details-item">
            <dt>Evaluation Status</dt>
            <dd>
              <span className="mono-tag">ACTIVE ASSESSMENT</span>
            </dd>
          </div>
        </dl>
      </Card>
    </section>
  );
}
