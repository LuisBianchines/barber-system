type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-brand-gold/20">
      <div>
        <h1 className="text-xl font-bold text-brand-ivory">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-brand-silver">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
