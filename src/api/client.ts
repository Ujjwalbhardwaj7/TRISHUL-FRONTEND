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
