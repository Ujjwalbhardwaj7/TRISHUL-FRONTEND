import { Link } from 'react-router-dom';
import {
  AlertBanner,
  Button,
  EmptyState,
  ErrorState,
  LoadingState,
} from '../../design-system/components';
import { CasesRequiringAttention } from './components/CasesRequiringAttention';
import { InterventionStates } from './components/InterventionStates';
import { OperationalSummary } from './components/OperationalSummary';
import { OperationalMargin } from './components/OperationalMargin';
import { RecentActivity } from './components/RecentActivity';
import { WatchActivity } from './components/WatchActivity';
import { useCommandCenterData } from './hooks/useCommandCenterData';
import './commandCenter.css';

export function CommandCenterPage() {
  const { data, error, isError, isPending, refetch } = useCommandCenterData();

  if (isPending) return <LoadingState variant="table" label="Loading Command Center" />;
  if (isError) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) {
    return (
      <EmptyState
        title="Command Center unavailable"
        description="No operational data is currently available for this workspace."
      />
    );
  }

  return (
    <div className="command-center-page">
      <header className="command-center-hero">
        <h1 className="command-center-hero__title">
          A cyber-fraud intelligence dossier you can defend under scrutiny.
        </h1>
        <p className="command-center-hero__lead">
          TRISHUL turns raw transaction alerts into an evidence-linked investigation file, audits money-flow graphs against observed account velocities, and forecasts potential cash-out zones before funds exit the banking rails.
        </p>
        <div className="command-center-hero__actions">
          <Link to="/cases/CASE-0018">
            <Button variant="primary">Investigate active case</Button>
          </Link>
          <Link to="/risk">
            <Button variant="secondary">Verify payment risk</Button>
          </Link>
        </div>
      </header>

      {data.dataCompleteness === 'PARTIAL' && (
        <AlertBanner tone="warning" title="Partial operational coverage">
          {data.dataNotice ?? 'Some operational data is unavailable. Review the evidence state shown for each case.'}
        </AlertBanner>
      )}

      <OperationalSummary data={data} />

      <div className="command-center-page__body">
        <div className="command-center-page__main">
          <CasesRequiringAttention cases={data.cases} />

          <div className="command-center-page__split">
            <WatchActivity events={data.watchActivity} />
            <InterventionStates interventions={data.interventions} />
          </div>

          <RecentActivity events={data.recentActivity} />

          <section className="command-center-protocol">
            <div className="command-center-protocol__header">
              <span className="command-center-hero__eyebrow">OPERATING PROTOCOL</span>
              <h3>What TRISHUL evaluates</h3>
            </div>
            <div className="command-center-protocol__list">
              <div className="command-center-protocol__row">
                <span className="command-center-protocol__index">A</span>
                <span className="command-center-protocol__label">Deterministic links</span>
                <span className="command-center-protocol__desc">
                  Money-flow edges and timeline entries strictly mirror verified payment logs and official complaints.
                </span>
              </div>
              <div className="command-center-protocol__row">
                <span className="command-center-protocol__index">B</span>
                <span className="command-center-protocol__label">Behavioural velocity</span>
                <span className="command-center-protocol__desc">
                  Receiver credit surges and rapid pass-through ratios are measured against historical account baselines.
                </span>
              </div>
              <div className="command-center-protocol__row">
                <span className="command-center-protocol__index">C</span>
                <span className="command-center-protocol__label">Defensible forecast</span>
                <span className="command-center-protocol__desc">
                  When evidence depth is insufficient, the system intentionally abstains rather than producing speculative location forecasts.
                </span>
              </div>
            </div>
          </section>
        </div>

        <OperationalMargin data={data} />
      </div>
    </div>
  );
}
