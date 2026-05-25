import { HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-brand-gold/15 bg-brand-charcoal/90 p-4 shadow-premium backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
