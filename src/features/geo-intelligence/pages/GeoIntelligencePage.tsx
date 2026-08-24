import { useParams } from 'react-router-dom';
import { AlertBanner, Badge, Button, EvidenceGapMarker, MarginNote, MetadataList, PageHeader, SectionHeader, StatusPill } from '../../../design-system/components';
import { useGeoPrediction } from '../hooks/useGeoPrediction';
import type { ForecastState, TimeHorizonHours } from '../../../types/geo';
import './geoIntelligence.css';

function toSystemStatus(state: ForecastState): 'PREDICT' | 'MONITORING' | 'ABSTAIN' {
  return state === 'CONFIRMED' ? 'PREDICT' : state;
}

export function GeoIntelligencePage() {
  const { caseId } = useParams();
  const {
    forecast,
    toggleExitMode,
    setTimeHorizon,
  } = useGeoPrediction(caseId ?? 'CASE-2026-8891');

  const status = toSystemStatus(forecast.state);
  const isAbstained = status === 'ABSTAIN';

  return (
    <div className="geo-intelligence-page">
      <PageHeader eyebrow="04 · Forecast file" title="Prediction workspace" description="Evidence coverage, available zones, and intervention state are presented without overstating certainty." />
      <MetadataList items={[{ label: 'Case', value: forecast.caseId }, { label: 'Forecast', value: forecast.forecastId }, { label: 'State', value: <StatusPill status={status} /> }, { label: 'Generated', value: new Date(forecast.generatedAt).toLocaleString('en-IN') }]} />
      <AlertBanner tone={isAbstained ? 'warning' : 'info'} title={isAbstained ? 'Prediction withheld' : status === 'MONITORING' ? 'Monitoring continues' : 'Prediction available'}>{forecast.stateReason}</AlertBanner>
      <div className="geo-intelligence-layout"><main><section><SectionHeader title="Evidence gate" description="Coverage and gate state remain visible before any forecast is used." /><MetadataList items={[{ label: 'Evidence coverage', value: `${forecast.evidenceCoverage.overallPercent}%` }, { label: 'Required coverage', value: `${forecast.evidenceCoverage.minRequiredPercent}%` }, { label: 'Gate state', value: forecast.evidenceGate.status }, { label: 'Verified features', value: `${forecast.evidenceCoverage.verifiedFeaturesCount} / ${forecast.evidenceCoverage.totalFeaturesCount}` }]} /></section><section><SectionHeader title="Time horizon" description="The existing development simulation can be viewed across its configured forecast windows." /><div className="geo-horizon-controls">{([1, 6, 12, 24, 48] as TimeHorizonHours[]).map((horizon) => <Button key={horizon} variant={forecast.selectedHorizon === horizon ? 'primary' : 'secondary'} onClick={() => setTimeHorizon(horizon)}>+{horizon}h</Button>)}</div></section>{isAbstained ? <section><SectionHeader title="Location forecast" description="No geographic visual or zone list is presented while evidence is insufficient." /><EvidenceGapMarker label="Prediction intentionally withheld" /></section> : <section><SectionHeader title="Top-K zones" description="Ranked locations returned by the existing deterministic forecast fixture." /><div className="table-scroll"><table className="data-table"><thead><tr><th scope="col">Zone</th><th scope="col">District</th><th scope="col">Signal</th><th scope="col">Evidence</th></tr></thead><tbody>{forecast.topKCashOutZones.map((zone) => <tr key={zone.id}><td><strong>{zone.name}</strong><br /><code>{zone.zoneCode}</code></td><td>{zone.district}</td><td>{zone.primarySignal}</td><td><Badge tone={zone.riskLevel === 'CRITICAL' || zone.riskLevel === 'ELEVATED' ? 'warning' : 'neutral'}>{zone.riskLevel}</Badge></td></tr>)}</tbody></table></div></section>}<section><SectionHeader title="Explainable reasons" description="Signal descriptions are retained from the existing forecast fixture." /><ol className="geo-reason-list">{forecast.explainableReasons.map((reason) => <li key={reason.id}><strong>{reason.title}</strong><p>{reason.description}</p><span>{reason.category} · Evidence weight {reason.importanceWeight}%</span></li>)}</ol></section></main><aside><MarginNote marker="EXIT MODE" title={forecast.exitMode.isActive ? 'Exit mode active' : 'Exit mode standby'}>{forecast.exitMode.protocolStatus} · {forecast.exitMode.targetRadiusKm} km configured radius · {forecast.exitMode.activeInterceptionsCount} active corridors.</MarginNote><Button variant={forecast.exitMode.isActive ? 'danger' : 'secondary'} onClick={toggleExitMode}>{forecast.exitMode.isActive ? 'Deactivate exit mode' : 'Engage exit mode'}</Button><MarginNote marker="LIMIT" title="Evidence coverage">{forecast.evidenceGate.blockingReasons.length ? forecast.evidenceGate.blockingReasons.join(' · ') : 'No blocking reasons are reported by the current development fixture.'}</MarginNote></aside></div>
    </div>
  );
}
