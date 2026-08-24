import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export interface AlertBannerProps { title: string; children?: ReactNode; tone?: 'info' | 'warning' | 'critical'; }

export function AlertBanner({ title, children, tone = 'info' }: AlertBannerProps) {
  return <section className={cn('alert-banner', `alert-banner--${tone}`)} role={tone === 'critical' ? 'alert' : undefined}><strong>{title}</strong>{children && <span>{children}</span>}</section>;
}
