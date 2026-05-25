import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-brand-silver">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-xl border bg-brand-ink/60 px-3 py-2.5 text-sm text-brand-ivory placeholder:text-brand-smoke focus:outline-none focus:ring-2 disabled:opacity-50 ${
            error
              ? 'border-brand-red/60 focus:ring-brand-red/40'
              : 'border-brand-graphite focus:ring-brand-gold/50 focus:border-brand-gold/50'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-brand-red">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
