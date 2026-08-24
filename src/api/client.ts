import { ApiError } from './errors/ApiError';

export interface ApiRequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
  body?: unknown;
  headers?: HeadersInit;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? '';

function toApiError(response: Response, payload: unknown): ApiError {
  const body = payload as { message?: unknown; code?: unknown; requestId?: unknown } | null;
  return new ApiError({
    status: response.status,
    message: typeof body?.message === 'string' ? body.message : `Request failed (${response.status})`,
    code: typeof body?.code === 'string' ? body.code : undefined,
    requestId: typeof body?.requestId === 'string' ? body.requestId : response.headers.get('x-request-id') ?? undefined,
  });
}

export async function apiRequest<TResponse>(path: string, options: ApiRequestOptions = {}): Promise<TResponse> {
  const { body, headers, ...requestOptions } = options;
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...requestOptions,
      headers: { Accept: 'application/json', ...(body === undefined ? {} : { 'Content-Type': 'application/json' }), ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError({ status: 0, code: 'NETWORK_ERROR', message: 'The server could not be reached.' });
  }
  const payload: unknown = response.status === 204 ? undefined : await response.json().catch(() => undefined);
  if (!response.ok) throw toApiError(response, payload);
  return payload as TResponse;
}

export function unavailableEndpoint(operation: string): never {
  throw new ApiError({ status: 501, code: 'CONTRACT_PENDING', message: `${operation} is unavailable until a backend contract is integrated.` });
}
/**
 * Base HTTP Client for TRISHUL API Integration
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let errorMsg = `API request failed with status ${response.status}`;
    try {
      const errData = await response.json();
      if (errData.message) errorMsg = errData.message;
    } catch {
      // ignore json parse error
    }
    throw new ApiError(response.status, errorMsg);
  }

  return response.json();
}
