import { unavailableEndpoint } from '../client';

export function getAudit(caseId: string): never { void caseId; return unavailableEndpoint('Audit retrieval'); }
