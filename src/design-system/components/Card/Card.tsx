import type { HTMLAttributes } from 'react';
import { cn } from '../../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLElement> { as?: 'article' | 'section' | 'div'; }

export function Card({ as: Tag = 'section', className, ...props }: CardProps) {
  return <Tag className={cn('card', className)} {...props} />;
}
