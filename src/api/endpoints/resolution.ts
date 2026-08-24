import { unavailableEndpoint } from '../client';

export function getResolution(caseId: string): never { void caseId; return unavailableEndpoint('Resolution retrieval'); }
