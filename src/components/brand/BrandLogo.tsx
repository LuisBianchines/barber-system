type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  className?: string;
};

const imageSizes = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-20 w-20',
  xl: 'h-32 w-32',
};

const titleSizes = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

export function BrandLogo({ size = 'md', showText = true, subtitle, className = '' }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/images/logo-barbersystem.png"
        alt="BarberSystem"
        className={`${imageSizes[size]} object-contain drop-shadow-lg flex-shrink-0`}
      />
      {showText && (
        <div className="leading-tight">
          <p className={`${titleSizes[size]} font-black tracking-wide text-brand-ivory`}>
            BarberSystem
          </p>
          {subtitle && (
            <p className="text-xs uppercase tracking-[0.25em] text-brand-gold">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
}
