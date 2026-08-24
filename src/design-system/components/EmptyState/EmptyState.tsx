import type { ReactNode } from 'react';

export interface EmptyStateProps { title: string; description: string; action?: ReactNode; }

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return <section className="state-card empty-state"><div aria-hidden="true" className="state-card__mark">○</div><h2>{title}</h2><p>{description}</p>{action && <div>{action}</div>}</section>;
}
