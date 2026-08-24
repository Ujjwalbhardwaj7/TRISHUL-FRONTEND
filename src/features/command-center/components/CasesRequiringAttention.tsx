import { Link, useNavigate } from 'react-router-dom';
import { Badge, DataTable, EmptyState, EvidenceGapMarker, SectionHeader, StatusPill } from '../../../design-system/components';
import type { DataTableColumn } from '../../../design-system/components/Table/Table';
import type { CommandCenterCase, EvidenceAvailability } from '../commandCenter.types';

interface CasesRequiringAttentionProps { cases: CommandCenterCase[]; }

const timestampFormat = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
const evidenceTone: Record<EvidenceAvailability, 'success' | 'warning' | 'neutral'> = { AVAILABLE: 'success', PARTIAL: 'warning', UNAVAILABLE: 'neutral' };

function formatExposure(caseItem: CommandCenterCase) {
  if (!caseItem.exposure) return <EvidenceGapMarker label="Exposure unavailable" />;
  const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: caseItem.exposure.currency, maximumFractionDigits: 0 });
  return `${formatter.format(caseItem.exposure.minimum)}–${formatter.format(caseItem.exposure.maximum)}`;
}

function forecastSummary(caseItem: CommandCenterCase) {
  if (caseItem.forecast.status === 'ABSTAIN') return <div className="command-center-forecast"><StatusPill status="ABSTAIN" /><span>Forecast withheld</span></div>;
  return <div className="command-center-forecast"><StatusPill status={caseItem.forecast.status} />{caseItem.forecast.topZone && <span>{caseItem.forecast.topZone}</span>}{caseItem.forecast.timeHorizon && <span>{caseItem.forecast.timeHorizon}</span>}{caseItem.forecast.exitMode && <span>{caseItem.forecast.exitMode}</span>}{caseItem.forecast.status === 'PREDICT' && <Link to={`/prediction/${encodeURIComponent(caseItem.id)}`} onClick={(event) => event.stopPropagation()}>View prediction</Link>}</div>;
}

export function CasesRequiringAttention({ cases }: CasesRequiringAttentionProps) {
  const navigate = useNavigate();
  const columns: DataTableColumn<CommandCenterCase>[] = [
    { key: 'case', header: 'Case', render: (item) => <strong className="command-center-case-id">{item.id}</strong> },
    { key: 'exposure', header: 'Attributable exposure', render: formatExposure },
    { key: 'risk', header: 'Risk state', render: (item) => <StatusPill status={item.riskStatus} /> },
    { key: 'forecast', header: 'Forecast', render: forecastSummary },
    { key: 'evidence', header: 'Evidence', render: (item) => <Badge tone={evidenceTone[item.forecast.evidence]}>{item.forecast.evidence}</Badge> },
    { key: 'priority', header: 'Priority', render: (item) => <Badge tone={item.priority === 'HIGH' ? 'warning' : 'neutral'}>{item.priority}</Badge> },
    { key: 'updated', header: 'Last updated', render: (item) => timestampFormat.format(new Date(item.lastUpdated)) },
  ];
  return <section className="command-center-section"><SectionHeader title="Cases requiring attention" description="Select a case to open its investigation workspace." />{cases.length ? <DataTable columns={columns} rows={cases} getRowKey={(item) => item.id} onRowActivate={(item) => navigate(`/cases/${encodeURIComponent(item.id)}`)} caption="Cases requiring operational review" /> : <EmptyState title="No cases require attention" description="There are no active cases in the current Command Center dataset." />}</section>;
}
