import { Skeleton } from '../Skeleton/Skeleton';

export interface LoadingStateProps { variant?: 'content' | 'table' | 'route'; label?: string; }

export function LoadingState({ variant = 'content', label = 'Loading content' }: LoadingStateProps) {
  const rows = variant === 'table' ? 5 : 3;
  return <div className={`loading-state loading-state--${variant}`} role="status" aria-label={label}>
    <Skeleton width="35%" height="1.4rem" />
    {Array.from({ length: rows }, (_, index) => <Skeleton key={index} height="3rem" />)}
    <span className="sr-only">{label}</span>
  </div>;
}
