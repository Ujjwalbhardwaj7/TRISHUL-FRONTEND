import type { ReactNode } from 'react';

export interface TooltipProps { content: string; children: ReactNode; }

/** Native title is intentionally used until richer tooltip behaviour is required. */
export function Tooltip({ content, children }: TooltipProps) {
  return <span className="tooltip" title={content}>{children}</span>;
}
