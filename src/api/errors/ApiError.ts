export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly requestId?: string;

  public constructor({ message, status, code, requestId }: { message: string; status: number; code?: string; requestId?: string }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}
