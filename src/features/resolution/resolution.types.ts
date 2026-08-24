import type { SystemStatus } from '../../api/types/status';

export type ResolutionAccessState = 'GRANTED' | 'DENIED' | 'REVOKED' | 'EXPIRED' | 'PENDING';
export type ResolutionVerificationState = 'VERIFIED' | 'UNVERIFIED' | 'UNAVAILABLE';
export type ResolutionResultState = 'PENDING' | 'APPROVED' | 'DENIED' | 'UNAVAILABLE';

export interface ResolutionData {
  caseId: string;
  caseState: Extract<SystemStatus, 'ACTIVE' | 'MONITORING' | 'CLOSED'>;
  tracedReference: string;
  tracedAccount: string | null;
  institution: string | null;
  credential: {
    role: string;
    purpose: string;
    issuer: string | null;
    state: ResolutionAccessState;
    verification: ResolutionVerificationState;
    requirements: string[];
  };
  request: {
    targetInstitution: string | null;
    purpose: string;
    action: string;
    requestedAt: string | null;
    state: ResolutionAccessState;
    auditReference: string | null;
  };
  result: {
    state: ResolutionResultState;
    permittedInformation: string[];
    rationale: string;
  };
  accessRationale: string;
}
