import type { CaseEvidenceEntry } from '../caseIntelligence.types';

export function EvidenceTimeline({ entries }: { entries: CaseEvidenceEntry[] }) {
  return <ol className="evidence-timeline">{entries.map((entry) => <li key={entry.id}><time dateTime={entry.occurredAt}>{new Date(entry.occurredAt).toLocaleString('en-IN')}</time><div><strong>{entry.title}</strong><p>{entry.detail}</p><span>{entry.provenance}</span></div></li>)}</ol>;
}
