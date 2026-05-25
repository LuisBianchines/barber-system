import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-gold text-brand-black hover:bg-brand-copper shadow-gold disabled:bg-brand-smoke disabled:text-brand-graphite',
  secondary:
    'bg-transparent text-brand-ivory border border-brand-gold/40 hover:border-brand-gold hover:bg-brand-graphite disabled:border-brand-graphite disabled:text-brand-smoke',
  danger:
    'bg-brand-red/90 text-white hover:bg-brand-red disabled:bg-brand-red/40',
  ghost:
    'bg-transparent text-brand-silver hover:text-brand-ivory hover:bg-brand-graphite disabled:text-brand-smoke',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
