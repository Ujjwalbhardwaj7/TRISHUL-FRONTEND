import type { ReactNode } from 'react';
import { Card } from '../Card/Card';

export interface MetricCardProps { label: string; value: ReactNode; supportingText?: string; }

export function MetricCard({ label, value, supportingText }: MetricCardProps) {
  return <Card className="metric-card"><p>{label}</p><strong>{value}</strong>{supportingText && <span>{supportingText}</span>}</Card>;
}
