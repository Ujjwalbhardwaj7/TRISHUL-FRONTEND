import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'quiet' | 'danger';
}

export function Button({ className, variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <button className={cn('button', `button--${variant}`, className)} type={type} {...props} />;
}
