import { apiRequest, unavailableEndpoint } from '../../../api/client';
import { getCaseIntelligenceFixture } from '../fixtures/caseIntelligence.fixture';
import type { CaseIntelligenceData } from '../caseIntelligence.types';

const configuredEndpoint = import.meta.env.VITE_CASE_INTELLIGENCE_PATH;

export async function getCaseIntelligence(caseId: string): Promise<CaseIntelligenceData> {
  if (configuredEndpoint) return apiRequest<CaseIntelligenceData>(configuredEndpoint.replace(':caseId', encodeURIComponent(caseId)));
  if (import.meta.env.DEV) return getCaseIntelligenceFixture(caseId);
  return unavailableEndpoint('Case intelligence retrieval');
}
