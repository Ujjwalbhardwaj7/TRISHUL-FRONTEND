import { ApiError } from '../../../api/errors/ApiError';
import { Button } from '../Button/Button';

export interface ErrorStateProps { error?: unknown; onRetry?: () => void; fullPage?: boolean; }

export function ErrorState({ error, onRetry, fullPage = false }: ErrorStateProps) {
  const apiError = error instanceof ApiError ? error : undefined;
  const message = apiError?.message ?? 'The requested content could not be displayed.';
  return <section className={`state-card error-state ${fullPage ? 'error-state--full' : ''}`} role="alert">
    <div aria-hidden="true" className="state-card__mark">!</div><h2>Something went wrong</h2><p>{message}</p>
    {apiError?.requestId && <p className="request-id">Request ID: {apiError.requestId}</p>}
    {onRetry && <Button variant="secondary" onClick={onRetry}>Try again</Button>}
  </section>;
}
