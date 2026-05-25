type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = 'Carregando...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-brand-graphite border-t-brand-gold" />
      <p className="text-sm text-brand-silver">{message}</p>
    </div>
  );
}
