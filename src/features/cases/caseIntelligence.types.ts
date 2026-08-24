import type { SystemStatus } from '../../api/types/status';

export interface CaseGraphNode { id: string; label: string; kind: 'ACCOUNT' | 'TRANSACTION' | 'BENEFICIARY'; x: number; y: number; }
export interface CaseGraphEdge { id: string; from: string; to: string; transactionReference: string; occurredAt: string; caseLinkage: string; provenance: string; }
export interface CaseEvidenceEntry { id: string; occurredAt: string; title: string; detail: string; provenance: string; }
export interface CaseDirectoryRecord { caseId: string; complaintReference: string; transactionReference: string; status: Extract<SystemStatus, 'ACTIVE' | 'MONITORING' | 'CLOSED'>; updatedAt: string; }
export interface CaseIntelligenceData {
  caseId: string;
  status: Extract<SystemStatus, 'ACTIVE' | 'MONITORING' | 'CLOSED'>;
  complaintReference: string;
  transactionReference: string;
  transactionOccurredAt: string;
  attributableExposure: { minimum: number; maximum: number; currency: string };
  riskReasons: string[];
  graph: { nodes: CaseGraphNode[]; edges: CaseGraphEdge[] };
  evidence: CaseEvidenceEntry[];
}
