import { cn } from '../../../lib/utils';

export interface SkeletonProps { className?: string; height?: string; width?: string; }

export function Skeleton({ className, height, width }: SkeletonProps) {
  return <span className={cn('skeleton', className)} style={{ height, width }} aria-hidden="true" />;
}
