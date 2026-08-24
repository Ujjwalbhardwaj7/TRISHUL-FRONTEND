import { Link } from 'react-router-dom';
import { Card, SectionHeader, StatusPill } from '../../../design-system/components';
import type { InterventionPhase, InterventionRecord } from '../commandCenter.types';

interface InterventionStatesProps { interventions: InterventionRecord[]; }
const phaseLabel: Record<InterventionPhase, string> = { ACTIVE_WINDOW: 'Active intervention window', ELEVATED_HORIZON: 'Elevated horizon', MONITORING: 'Monitoring', CASH_OUT_MAY_HAVE_OCCURRED: 'Cash-out may have occurred', CLOSED_OUTCOME_KNOWN: 'Closed / outcome known' };
const timestampFormat = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

export function InterventionStates({ interventions }: InterventionStatesProps) {
  return <section className="command-center-section"><SectionHeader title="Intervention states" description="Current intervention and monitoring windows." />{interventions.length ? <Card className="command-center-feed"><ul>{interventions.map((record) => <li key={record.id}><div className="command-center-feed__heading"><StatusPill status={record.status} /><Link to={`/resolution/${encodeURIComponent(record.caseId)}`}>{record.caseId}</Link></div><strong>{phaseLabel[record.phase]}</strong><p>{record.detail}</p><time dateTime={record.updatedAt}>{timestampFormat.format(new Date(record.updatedAt))}</time></li>)}</ul></Card> : <p className="command-center-empty-inline">No active intervention states are available.</p>}</section>;
}
