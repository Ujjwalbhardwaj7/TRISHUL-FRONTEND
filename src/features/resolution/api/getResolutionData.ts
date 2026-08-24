import { apiRequest, unavailableEndpoint } from '../../../api/client';
import { getResolutionFixture } from '../fixtures/resolution.fixture';
import type { ResolutionData } from '../resolution.types';

const configuredEndpoint = import.meta.env.VITE_SECURE_RESOLUTION_PATH;

export async function getResolutionData(caseId: string): Promise<ResolutionData> {
  if (configuredEndpoint) return apiRequest<ResolutionData>(configuredEndpoint.replace(':caseId', encodeURIComponent(caseId)));
  if (import.meta.env.DEV) return getResolutionFixture(caseId);
  return unavailableEndpoint('Secure resolution retrieval');
}
