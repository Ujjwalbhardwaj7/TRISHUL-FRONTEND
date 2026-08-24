import type { SystemStatus } from '../../../api/types/status';

const statusDetails: Record<SystemStatus, { label: string; description: string }> = {
  NORMAL: { label: 'Normal', description: 'No elevated concern identified' },
  ANOMALOUS: { label: 'Anomalous', description: 'Pattern differs from baseline' },
  WATCH: { label: 'Watch', description: 'Requires continued observation' },
  SUSPECTED: { label: 'Suspected', description: 'Requires investigation' },
  ACTIVE: { label: 'Active', description: 'Operationally active' },
  MONITORING: { label: 'Monitoring', description: 'Monitoring is in progress' },
  PREDICT: { label: 'Predict', description: 'Prediction workflow state' },
  ABSTAIN: { label: 'Abstained — insufficient evidence', description: 'The system intentionally declined to conclude' },
  CRITICAL: { label: 'Critical', description: 'Confirmed operational urgency' },
  CLOSED: { label: 'Closed', description: 'No further action is open' },
};

export interface StatusPillProps { status: SystemStatus; compact?: boolean; }

/** The only component that maps a domain status to presentation colour. */
export function StatusPill({ status, compact = false }: StatusPillProps) {
  const detail = statusDetails[status];
  return (
    <span className={`status-pill status-pill--${status.toLowerCase()}`} aria-label={detail.description} title={detail.description}>
      {status === 'ABSTAIN' && <span aria-hidden="true">⊘</span>}
      <span>{compact ? status.replace('_', ' ') : detail.label}</span>
    </span>
  );
}
