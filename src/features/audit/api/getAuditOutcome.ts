import { apiRequest, unavailableEndpoint } from '../../../api/client';
import { getAuditFixture } from '../fixtures/audit.fixture';
import type { AuditOutcomeData } from '../audit.types';

const configuredEndpoint = import.meta.env.VITE_AUDIT_OUTCOME_PATH;

export async function getAuditOutcome(caseId: string): Promise<AuditOutcomeData> {
  if (configuredEndpoint) return apiRequest<AuditOutcomeData>(configuredEndpoint.replace(':caseId', encodeURIComponent(caseId)));
  if (import.meta.env.DEV) return getAuditFixture(caseId);
  return unavailableEndpoint('Audit outcome retrieval');
}
