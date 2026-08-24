import type { ReactNode } from 'react';

export interface PageHeaderProps { title: string; description?: string; actions?: ReactNode; eyebrow?: string; }

export function PageHeader({ title, description, actions, eyebrow }: PageHeaderProps) {
  return <header className="page-header">
    <div>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p className="page-header__description">{description}</p>}
    </div>
    {actions && <div className="page-header__actions">{actions}</div>}
  </header>;
}
