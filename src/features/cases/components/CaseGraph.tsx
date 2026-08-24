import { useState } from 'react';
import { MetadataList } from '../../../design-system/components';
import type { CaseGraphEdge, CaseGraphNode } from '../caseIntelligence.types';

export function CaseGraph({ nodes, edges }: { nodes: CaseGraphNode[]; edges: CaseGraphEdge[] }) {
  const [selectedEdgeId, setSelectedEdgeId] = useState(edges[0]?.id);
  const selectedEdge = edges.find((edge) => edge.id === selectedEdgeId) ?? edges[0];
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return <div className="case-graph"><svg viewBox="0 0 460 168" role="img" aria-label="Evidence-linked transaction graph">{edges.map((edge) => { const from = byId.get(edge.from); const to = byId.get(edge.to); return from && to ? <line key={edge.id} x1={from.x + 44} y1={from.y} x2={to.x - 44} y2={to.y} className={edge.id === selectedEdge?.id ? 'is-selected' : undefined} /> : null; })}{nodes.map((node) => <g key={node.id}><rect x={node.x - 44} y={node.y - 22} width="88" height="44" /><text x={node.x} y={node.y - 3}>{node.kind}</text><text x={node.x} y={node.y + 12}>{node.label}</text></g>)}</svg><div className="case-graph__edges" aria-label="Graph relationships">{edges.map((edge) => <button key={edge.id} type="button" className={edge.id === selectedEdge?.id ? 'is-selected' : undefined} onClick={() => setSelectedEdgeId(edge.id)}>{byId.get(edge.from)?.label} → {byId.get(edge.to)?.label}</button>)}</div>{selectedEdge && <MetadataList items={[{ label: 'Transaction / source', value: selectedEdge.transactionReference }, { label: 'Timestamp', value: new Date(selectedEdge.occurredAt).toLocaleString('en-IN') }, { label: 'Case linkage', value: selectedEdge.caseLinkage }, { label: 'Provenance', value: selectedEdge.provenance }]} />}</div>;
}
