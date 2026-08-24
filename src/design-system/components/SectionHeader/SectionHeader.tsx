import type { ReactNode } from 'react';

export interface SectionHeaderProps { title: string; description?: string; action?: ReactNode; }

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
  return <header className="section-header"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</header>;
}
