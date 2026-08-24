import { Navigate, useParams } from 'react-router-dom';
import { AlertBanner, Badge, EmptyState, ErrorState, EvidenceGapMarker, LoadingState, MarginNote, MetadataList, PageHeader, SectionHeader, StatusPill } from '../../design-system/components';
import { DEVELOPMENT_CASE_ID } from '../../lib/constants';
import type { AuditEventStatus, OutcomeState } from './audit.types';
import { useAuditOutcome } from './hooks/useAuditOutcome';
import './audit.css';

export function AuditPlaceholderPage() {
  const { caseId } = useParams();
  if (!caseId && import.meta.env.DEV) return <Navigate to={`/audit/${DEVELOPMENT_CASE_ID}`} replace />;
  if (!caseId) return <><PageHeader eyebrow="06 · Evidence record" title="Audit and outcome" description="Open a case to inspect its chronological evidence and outcome record." /><EmptyState title="No case selected" description="Audit history is scoped to an individual investigation case." /></>;
  return <AuditPage caseId={caseId} />;
}

function AuditPage({ caseId }: { caseId: string }) {
  const { data, error, isError, isPending, refetch } = useAuditOutcome(caseId);
  if (isPending) return <LoadingState variant="table" label="Loading audit history" />;
  if (isError) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return <EmptyState title="Audit record unavailable" description="No audit outcome record is currently available." />;
  const integrityNeedsReview = data.evidenceIntegrity.anchorState === 'MISMATCH' || data.evidenceIntegrity.verification === 'MISMATCH';
  return <div className="audit-page"><PageHeader eyebrow="06 · Evidence record" title="Audit and outcome" description="Chronological evidence, verification state, and reported outcome remain distinct." /><MetadataList items={[{ label: 'Case', value: data.caseId }, { label: 'Graph version', value: data.graphVersion ?? <EvidenceGapMarker label="Graph version unavailable" /> }, { label: 'Latest event', value: data.latestEventAt ? new Date(data.latestEventAt).toLocaleString('en-IN') : <EvidenceGapMarker label="Latest event unavailable" /> }, { label: 'Case state', value: <StatusPill status={data.caseState} /> }]} />{integrityNeedsReview && <AlertBanner tone="warning" title="Evidence integrity review required">The available record indicates an anchor or verification mismatch. Do not treat this as a verified evidence state.</AlertBanner>}<div className="audit-layout"><main><section><SectionHeader title="Evidence integrity" description="An anchor verifies a recorded digest; it does not store or reveal raw case data." /><MetadataList items={[{ label: 'Evidence ID', value: data.evidenceIntegrity.evidenceId ?? <EvidenceGapMarker label="Evidence ID unavailable" /> }, { label: 'Evidence hash', value: data.evidenceIntegrity.evidenceHash ? <code>{data.evidenceIntegrity.evidenceHash}</code> : <EvidenceGapMarker label="Hash unavailable" /> }, { label: 'Anchor state', value: data.evidenceIntegrity.anchorState }, { label: 'Verification', value: data.evidenceIntegrity.verification }, { label: 'Integrity note', value: data.evidenceIntegrity.detail }]} /></section><section><SectionHeader title="Action and access timeline" description="Each entry preserves the actor, source, status, and audit reference." /><ol className="audit-timeline">{data.history.map((entry) => <li key={entry.id}><time dateTime={entry.occurredAt}>{new Date(entry.occurredAt).toLocaleString('en-IN')}</time><div><strong>{entry.action}</strong><p>{entry.actor} · {entry.provenance}</p><span><AuditBadge status={entry.status} /> {entry.auditReference ?? 'Audit reference unavailable'}</span></div></li>)}</ol></section><section><SectionHeader title="Predicted versus actual" description="Forecast and recorded outcomes are shown separately; missing actuals are explicit." /><MetadataList items={[{ label: 'Predicted exit mode', value: data.comparison.predictedExitMode ?? <EvidenceGapMarker label="No predicted exit mode" /> }, { label: 'Predicted zone', value: data.comparison.predictedZone ?? <EvidenceGapMarker label="No zone issued" /> }, { label: 'Predicted horizon', value: data.comparison.predictedTimeHorizon ?? <EvidenceGapMarker label="No horizon issued" /> }, { label: 'Actual exit mode', value: data.comparison.actualExitMode ?? <EvidenceGapMarker label="No actual outcome yet" /> }, { label: 'Actual zone / time', value: data.comparison.actualZoneOrTime ?? <EvidenceGapMarker label="No actual zone or time" /> }, { label: 'Comparison', value: data.comparison.result }]} /></section></main><aside><MarginNote marker="OUTCOME" title="Outcome state"><OutcomeBadge state={data.outcome.state} /> {data.outcome.recordedHistory ?? 'No final outcome has been recorded. This is not an error or a recovery guarantee.'}</MarginNote><MarginNote marker="HISTORY" title="Future evaluation">{data.outcome.recordedHistory ?? 'A recorded final outcome will appear here when available for future evaluation.'}</MarginNote><EvidenceGapMarker label="Backend audit contract pending" /></aside></div></div>;
}

function AuditBadge({ status }: { status: AuditEventStatus }) {
  return <Badge tone={status === 'VERIFIED' ? 'success' : status === 'PENDING' ? 'warning' : 'neutral'}>{status}</Badge>;
}

function OutcomeBadge({ state }: { state: OutcomeState }) {
  return <Badge tone={state === 'CLOSED' || state === 'OUTCOME_KNOWN' ? 'success' : state === 'CASH_OUT_MAY_HAVE_OCCURRED' ? 'warning' : 'neutral'}>{state.replaceAll('_', ' ')}</Badge>;
}
