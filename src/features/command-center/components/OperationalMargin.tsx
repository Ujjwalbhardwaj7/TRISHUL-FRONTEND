import { Link } from 'react-router-dom';
import { MarginNote } from '../../../design-system/components';
import type { CommandCenterData } from '../commandCenter.types';

export interface OperationalMarginProps {
  data: CommandCenterData;
}

export function OperationalMargin({ data }: OperationalMarginProps) {
  const criticalCase = data.cases.find((item) => item.riskStatus === 'CRITICAL');
  const withheld = data.cases.find((item) => item.forecast.status === 'ABSTAIN');
  const activeIntervention = data.interventions.find((item) => item.status === 'ACTIVE');

  return (
    <aside className="command-center-margin" aria-label="Operational margin notes">
      <div className="command-center-margin__header">
        <span>MARGIN AUDIT</span>
      </div>

      {criticalCase && (
        <MarginNote marker={`${criticalCase.id} / CRITICAL`} title="Priority conflict detected">
          Elevated transaction anomaly and multi-hop velocity. Immediate review required before exit window expires.
          <div style={{ marginTop: 'var(--space-2)' }}>
            <Link
              to={`/cases/${encodeURIComponent(criticalCase.id)}`}
              style={{ fontWeight: 600, fontSize: '0.75rem', textDecoration: 'underline' }}
            >
              Inspect case evidence →
            </Link>
          </div>
        </MarginNote>
      )}

      {withheld && (
        <MarginNote marker={`${withheld.id} / EVIDENCE GAP`} title="Location forecast withheld">
          Insufficient comparable baseline sample depth. The system declines geographic estimation.
          <div style={{ marginTop: 'var(--space-2)' }}>
            <Link
              to={`/cases/${encodeURIComponent(withheld.id)}`}
              style={{ fontWeight: 600, fontSize: '0.75rem', textDecoration: 'underline' }}
            >
              Review evidence graph →
            </Link>
          </div>
        </MarginNote>
      )}

      {activeIntervention && (
        <MarginNote marker={`${activeIntervention.caseId} / INTERVENTION`} title="Active intervention window">
          Partner-coordinated hold window active. Traceable liquidity remains inside monitored rails.
        </MarginNote>
      )}

      <MarginNote marker="GOVERNANCE" title="Operational integrity">
        Every risk classification and prediction horizon is logged in the cryptographic audit ledger.
      </MarginNote>
    </aside>
  );
}
