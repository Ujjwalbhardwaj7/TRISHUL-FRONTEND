import type { SystemStatus } from '../../api/types/status';

export type AuditEventStatus = 'RECORDED' | 'VERIFIED' | 'PENDING' | 'DENIED' | 'UNAVAILABLE';
export type EvidenceAnchorState = 'ANCHORED' | 'NO_ANCHOR' | 'MISMATCH' | 'UNAVAILABLE';
export type EvidenceVerification = 'VERIFIED' | 'MISMATCH' | 'UNAVAILABLE';
export type OutcomeState = 'OPEN' | 'MONITORING' | 'CLOSED' | 'OUTCOME_KNOWN' | 'CASH_OUT_MAY_HAVE_OCCURRED';

export interface AuditEntry { id: string; occurredAt: string; actor: string; action: string; provenance: string; status: AuditEventStatus; auditReference: string | null; }
export interface AuditOutcomeData {
  caseId: string;
  graphVersion: string | null;
  latestEventAt: string | null;
  caseState: Extract<SystemStatus, 'ACTIVE' | 'MONITORING' | 'CLOSED'>;
  evidenceIntegrity: {
    evidenceId: string | null;
    evidenceHash: string | null;
    anchorState: EvidenceAnchorState;
    verification: EvidenceVerification;
    detail: string;
  };
  comparison: {
    predictedExitMode: string | null;
    predictedZone: string | null;
    predictedTimeHorizon: string | null;
    actualExitMode: string | null;
    actualZoneOrTime: string | null;
    result: string;
  };
  outcome: {
    state: OutcomeState;
    recordedHistory: string | null;
  };
  history: AuditEntry[];
}
