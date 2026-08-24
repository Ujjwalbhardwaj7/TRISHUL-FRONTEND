import { unavailableEndpoint } from '../client';

export function getCase(caseId: string): never { void caseId; return unavailableEndpoint('Case retrieval'); }
