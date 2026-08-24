import { apiFetch } from './client';
import {
  GeoCandidatesResponse,
  ExitModePayload,
  ExitModeResponse,
  ForecastRequestPayload,
  ForecastResponse,
  ForecastData,
} from '../types/geo';

/**
 * TRISHUL Geo / Prediction Module API Integration Service
 * Blueprint API Endpoint Mappings
 */

/**
 * GET /cases/:id/geo-candidates
 * Retrieve spatial candidate locations for a given case
 */
export async function getGeoCandidates(caseId: string): Promise<GeoCandidatesResponse> {
  return apiFetch<GeoCandidatesResponse>(`/cases/${encodeURIComponent(caseId)}/geo-candidates`);
}

/**
 * POST /cases/:id/exit-mode
 * Toggle/Configure Exit Mode enforcement protocol for a case
 */
export async function postExitMode(
  caseId: string,
  payload: ExitModePayload
): Promise<ExitModeResponse> {
  return apiFetch<ExitModeResponse>(`/cases/${encodeURIComponent(caseId)}/exit-mode`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * POST /cases/:id/forecast
 * Trigger a new geo prediction forecast computation with parameters
 */
export async function postForecast(
  caseId: string,
  payload: ForecastRequestPayload
): Promise<ForecastResponse> {
  return apiFetch<ForecastResponse>(`/cases/${encodeURIComponent(caseId)}/forecast`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * GET /cases/:id/forecast/latest
 * Fetch the latest generated geo forecast results for a case
 */
export async function getLatestForecast(caseId: string): Promise<ForecastData> {
  return apiFetch<ForecastData>(`/cases/${encodeURIComponent(caseId)}/forecast/latest`);
}
