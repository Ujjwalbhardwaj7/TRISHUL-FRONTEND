export interface EvidenceGapMarkerProps { label?: string; }

export function EvidenceGapMarker({ label = 'Evidence unavailable' }: EvidenceGapMarkerProps) {
  return <span className="evidence-gap"><span aria-hidden="true">⊘</span>{label}</span>;
}
