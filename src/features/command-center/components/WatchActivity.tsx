import { Link } from 'react-router-dom';
import { Card, SectionHeader, StatusPill } from '../../../design-system/components';
import type { WatchActivityEvent } from '../commandCenter.types';

interface WatchActivityProps { events: WatchActivityEvent[]; }
const timestampFormat = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

export function WatchActivity({ events }: WatchActivityProps) {
  return <section className="command-center-section"><SectionHeader title="WATCH activity" description="Recent observed changes that merit review." />{events.length ? <Card className="command-center-feed"><ul>{events.map((event) => <li key={event.id}><div className="command-center-feed__heading"><StatusPill status={event.status} /><Link to={`/cases/${encodeURIComponent(event.caseId)}`}>{event.caseId}</Link></div><strong>{event.title}</strong><p>{event.detail}</p><time dateTime={event.occurredAt}>{timestampFormat.format(new Date(event.occurredAt))}</time></li>)}</ul></Card> : <p className="command-center-empty-inline">No recent WATCH or anomalous activity.</p>}</section>;
}
