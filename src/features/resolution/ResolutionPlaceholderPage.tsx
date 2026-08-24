import { Navigate, useParams } from 'react-router-dom';
import { Badge, EmptyState, ErrorState, EvidenceGapMarker, LoadingState, MarginNote, MetadataList, PageHeader, SectionHeader, StatusPill } from '../../design-system/components';
import { ApiError } from '../../api/errors/ApiError';
import { DEVELOPMENT_CASE_ID } from '../../lib/constants';
import type { ResolutionAccessState, ResolutionResultState } from './resolution.types';
import { useResolutionData } from './hooks/useResolutionData';
import './resolution.css';

export function ResolutionPlaceholderPage() {
  const { caseId } = useParams();
  if (!caseId && import.meta.env.DEV) return <Navigate to={`/resolution/${DEVELOPMENT_CASE_ID}`} replace />;
  if (!caseId) return <><PageHeader eyebrow="05 · Restricted capability" title="Secure resolution" description="Open a case to review its scoped identity-resolution capability." /><EmptyState title="No case selected" description="Secure resolution requires a specific case context." /></>;
  return <ResolutionPage caseId={caseId} />;
}

function ResolutionPage({ caseId }: { caseId: string }) {
  const { data, error, isError, isPending, refetch } = useResolutionData(caseId);
  if (isPending) return <LoadingState label="Loading secure resolution" />;
  if (isError && error instanceof ApiError && (error.status === 401 || error.status === 403)) return <EmptyState title="Access unauthorized" description="This restricted workflow requires an authorised investigator credential and a case-linked purpose." />;
  if (isError) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return <EmptyState title="Resolution unavailable" description="No scoped capability record is available." />;
  return <div className="resolution-page"><PageHeader eyebrow="05 · Restricted capability" title="Secure resolution" description="Identity resolution is limited by case purpose, credential state, and institution-approved access." /><MetadataList items={[{ label: 'Case', value: data.caseId }, { label: 'Case state', value: <StatusPill status={data.caseState} /> }, { label: 'Traced reference', value: <code>{data.tracedReference}</code> }, { label: 'Traced account', value: data.tracedAccount ?? <EvidenceGapMarker label="Account reference unavailable" /> }, { label: 'Institution', value: data.institution ?? <EvidenceGapMarker label="Institution unavailable" /> }]} /><div className="resolution-layout"><main><section><SectionHeader title="Restricted access context" description="This is a sensitive workflow. Credential validity does not itself grant access to identity information." /><p className="resolution-copy">{data.accessRationale}</p></section><section><SectionHeader title="Investigator credential" description="Credential and verification requirements are presented independently from the request state." /><MetadataList items={[{ label: 'Role', value: data.credential.role }, { label: 'Purpose', value: data.credential.purpose }, { label: 'Issuer', value: data.credential.issuer ?? <EvidenceGapMarker label="Issuer unavailable" /> }, { label: 'Credential state', value: <AccessBadge state={data.credential.state} /> }, { label: 'Verification', value: data.credential.verification }]} /><ul className="resolution-requirements">{data.credential.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul></section><section><SectionHeader title="Identity-resolution request" description="The request action and audit reference remain visible without exposing identity attributes." /><MetadataList items={[{ label: 'Target institution', value: data.request.targetInstitution ?? <EvidenceGapMarker label="Target institution unavailable" /> }, { label: 'Request purpose', value: data.request.purpose }, { label: 'Action', value: data.request.action }, { label: 'Requested at', value: data.request.requestedAt ? new Date(data.request.requestedAt).toLocaleString('en-IN') : <EvidenceGapMarker label="Timestamp unavailable" /> }, { label: 'Request state', value: <AccessBadge state={data.request.state} /> }, { label: 'Audit reference', value: data.request.auditReference ?? <EvidenceGapMarker label="Audit reference unavailable" /> }]} /></section><section><SectionHeader title="Resolution result" description="Only institution-permitted information may be shown after approval." /><MetadataList items={[{ label: 'Result state', value: <ResultBadge state={data.result.state} /> }, { label: 'Result rationale', value: data.result.rationale }, { label: 'Permitted information', value: data.result.permittedInformation.length ? data.result.permittedInformation.join(' · ') : <EvidenceGapMarker label={data.result.state === 'PENDING' ? 'Result pending' : 'No information returned'} /> }]} /></section></main><aside><MarginNote marker="ACCESS" title="Why access is limited">{data.accessRationale}</MarginNote><MarginNote marker="SCOPE" title="No sensitive details">This frontend does not expose Aadhaar, PAN, full KYC, or other identity attributes in a development fixture.</MarginNote><MarginNote marker="AUDIT" title="Request record">{data.request.auditReference ? `Request recorded as ${data.request.auditReference}.` : 'No audit reference is currently available.'}</MarginNote></aside></div></div>;
}

function AccessBadge({ state }: { state: ResolutionAccessState }) {
  return <Badge tone={state === 'GRANTED' ? 'success' : state === 'PENDING' ? 'warning' : 'neutral'}>{state}</Badge>;
}

function ResultBadge({ state }: { state: ResolutionResultState }) {
  return <Badge tone={state === 'APPROVED' ? 'success' : state === 'PENDING' ? 'warning' : 'neutral'}>{state}</Badge>;
}
