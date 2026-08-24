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
  const isStringBody = typeof body === 'string';
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...requestOptions,
      headers: {
        Accept: 'application/json',
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: body === undefined ? undefined : isStringBody ? body : JSON.stringify(body),
    });
  } catch {
    throw new ApiError({ status: 0, code: 'NETWORK_ERROR', message: 'The server could not be reached.' });
  }
  const payload: unknown = response.status === 204 ? undefined : await response.json().catch(() => undefined);
  if (!response.ok) throw toApiError(response, payload);
  return payload as TResponse;
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return apiRequest<T>(endpoint, options as ApiRequestOptions);
}

export function unavailableEndpoint(operation: string): never {
  throw new ApiError({ status: 501, code: 'CONTRACT_PENDING', message: `${operation} is unavailable until a backend contract is integrated.` });
}

export { ApiError };
