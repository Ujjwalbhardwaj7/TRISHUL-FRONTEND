import { unavailableEndpoint } from '../client';

export function getPrediction(caseId: string): never { void caseId; return unavailableEndpoint('Prediction retrieval'); }
