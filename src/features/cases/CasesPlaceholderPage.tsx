import { useNavigate, useParams } from 'react-router-dom';
import { DataTable, EmptyState, ErrorState, EvidenceGapMarker, LoadingState, MarginNote, MetadataList, PageHeader, SectionHeader, StatusPill } from '../../design-system/components';
import type { DataTableColumn } from '../../design-system/components/Table/Table';
import { CaseGraph } from './components/CaseGraph';
import { EvidenceTimeline } from './components/EvidenceTimeline';
import { caseIntelligenceIndexFixture } from './fixtures/caseIntelligence.fixture';
import { useCaseIntelligence } from './hooks/useCaseIntelligence';
import type { CaseDirectoryRecord } from './caseIntelligence.types';
import './caseIntelligence.css';

export function CasesPlaceholderPage() {
  const { caseId } = useParams();
  if (!caseId) return <CaseIntelligenceIndex />;
  return <CaseIntelligencePage caseId={caseId} />;
}

function CaseIntelligenceIndex() {
  const navigate = useNavigate();
  const columns: DataTableColumn<CaseDirectoryRecord>[] = [
    { key: 'case', header: 'Case', render: (item) => <strong className="command-center-case-id">{item.caseId}</strong> },
    { key: 'complaint', header: 'Complaint', render: (item) => item.complaintReference },
    { key: 'transaction', header: 'Transaction anchor', render: (item) => <code>{item.transactionReference}</code> },
    { key: 'state', header: 'State', render: (item) => <StatusPill status={item.status} /> },
    { key: 'updated', header: 'Updated', render: (item) => new Date(item.updatedAt).toLocaleString('en-IN') },
  ];
  return <div className="case-intelligence-page"><PageHeader eyebrow="03 · Investigation workspace" title="Case intelligence" description="Select a case file to review its complaint anchor, evidence graph, exposure range, and provenance." /><section><SectionHeader title="Case register" description="Development records are separated from production case contracts." /><DataTable columns={columns} rows={caseIntelligenceIndexFixture} getRowKey={(item) => item.caseId} onRowActivate={(item) => navigate(`/cases/${encodeURIComponent(item.caseId)}`)} caption="Case Intelligence development register" /></section><MarginNote marker="EVIDENCE" title="Case selection">Open a case record to inspect only fixture-backed edges and stated provenance. Production case retrieval remains contract-gated.</MarginNote></div>;
}

function CaseIntelligencePage({ caseId }: { caseId: string }) {
  const { data, error, isError, isPending, refetch } = useCaseIntelligence(caseId);
  if (isPending) return <LoadingState variant="content" label="Loading case intelligence" />;
  if (isError) return <ErrorState error={error} onRetry={() => void refetch()} />;
  if (!data) return <EmptyState title="Case intelligence unavailable" description="No evidence record is currently available for this case." />;
  const amount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: data.attributableExposure.currency, maximumFractionDigits: 0 });
  return <div className="case-intelligence-page"><PageHeader eyebrow="03 · Case intelligence file" title="Evidence that supports intervention" description="A financial trail presented with explicit provenance and range-based exposure." /><MetadataList items={[{ label: 'Case', value: data.caseId }, { label: 'Complaint', value: data.complaintReference }, { label: 'Transaction anchor', value: data.transactionReference }, { label: 'Status', value: <StatusPill status={data.status} /> }]} /><div className="case-intelligence-layout"><div className="case-intelligence-main"><section><SectionHeader title="Transaction anchor" description="The complaint and payment record currently linking this investigation." /><MetadataList items={[{ label: 'Transaction', value: data.transactionReference }, { label: 'Observed at', value: new Date(data.transactionOccurredAt).toLocaleString('en-IN') }, { label: 'Complaint linkage', value: data.complaintReference }]} /></section><section><SectionHeader title="Evidence-linked graph" description="Relationships are shown only where a fixture-backed event is available. Select an edge for its source details." /><CaseGraph nodes={data.graph.nodes} edges={data.graph.edges} /></section><section><SectionHeader title="Evidence timeline" description="Chronological observations and their stated provenance." /><EvidenceTimeline entries={data.evidence} /></section></div><aside className="case-intelligence-margin"><MarginNote marker="02 · OBSERVED EXPOSURE" title="Attributable exposure">{amount.format(data.attributableExposure.minimum)} – {amount.format(data.attributableExposure.maximum)}. The available evidence does not support an exact identity after commingling.</MarginNote><MarginNote marker="03 · RISK REASONS" title="Observed reasons">{data.riskReasons.join(' · ')}</MarginNote><MarginNote marker="EVIDENCE" title="Provenance">Each graph edge and timeline entry retains the recorded source available in this development fixture.</MarginNote><EvidenceGapMarker label="Backend case contract pending" /></aside></div></div>;
}
