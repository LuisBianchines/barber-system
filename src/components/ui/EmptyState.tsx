type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-brand-gold/10 bg-brand-charcoal/60 py-12 text-center px-4">
      <p className="text-base font-medium text-brand-ivory">{title}</p>
      {description && <p className="text-sm text-brand-silver">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
