import type { CommandCenterData } from '../commandCenter.types';

interface OperationalSummaryProps {
  data: CommandCenterData;
}

export function OperationalSummary({ data }: OperationalSummaryProps) {
  const activeCases = data.cases.filter((item) => item.operationalStatus === 'ACTIVE').length;
  const activeInterventions = data.interventions.filter((item) => item.status === 'ACTIVE').length;
  const withheldForecasts = data.cases.filter((item) => item.forecast.status === 'ABSTAIN').length;

  return (
    <section className="command-center-section" aria-label="Operational summary">
      <div className="command-center-summary-matrix">
        <div className="command-center-summary-cell">
          <span className="command-center-summary-cell__label">01 · Active Cases</span>
          <strong className="command-center-summary-cell__value">
            {String(activeCases).padStart(2, '0')}
          </strong>
          <span className="command-center-summary-cell__desc">
            Cases currently requiring operational attention
          </span>
        </div>
        <div className="command-center-summary-cell">
          <span className="command-center-summary-cell__label">02 · Watch Signals</span>
          <strong className="command-center-summary-cell__value">
            {String(data.watchActivity.length).padStart(2, '0')}
          </strong>
          <span className="command-center-summary-cell__desc">
            Recent observable network & velocity changes
          </span>
        </div>
        <div className="command-center-summary-cell">
          <span className="command-center-summary-cell__label">03 · Active Windows</span>
          <strong className="command-center-summary-cell__value">
            {String(activeInterventions).padStart(2, '0')}
          </strong>
          <span className="command-center-summary-cell__desc">
            Partner-defined intervention windows in progress
          </span>
        </div>
        <div className="command-center-summary-cell">
          <span className="command-center-summary-cell__label">04 · Forecast Withheld</span>
          <strong className="command-center-summary-cell__value">
            {String(withheldForecasts).padStart(2, '0')}
          </strong>
          <span className="command-center-summary-cell__desc">
            Cases intentionally marked ABSTAIN due to evidence gap
          </span>
        </div>
      </div>
    </section>
  );
}
