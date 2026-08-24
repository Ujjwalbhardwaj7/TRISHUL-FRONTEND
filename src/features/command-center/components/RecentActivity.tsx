import { Link } from 'react-router-dom';
import { Card, SectionHeader } from '../../../design-system/components';
import type { RecentActivityEvent } from '../commandCenter.types';

interface RecentActivityProps { events: RecentActivityEvent[]; }
const timestampFormat = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

export function RecentActivity({ events }: RecentActivityProps) {
  return <section className="command-center-section"><SectionHeader title="Recent changes" description="A concise view of recent operational updates." />{events.length ? <Card className="command-center-activity"><ul>{events.map((event) => <li key={event.id}><div><strong>{event.title}</strong><p>{event.detail}</p></div><div><Link to={`/cases/${encodeURIComponent(event.caseId)}`}>{event.caseId}</Link><time dateTime={event.occurredAt}>{timestampFormat.format(new Date(event.occurredAt))}</time></div></li>)}</ul></Card> : <p className="command-center-empty-inline">No recent changes are available.</p>}</section>;
}
