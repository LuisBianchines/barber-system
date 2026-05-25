type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorMessage({
  message = 'Não foi possível carregar os dados. Tente novamente.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-brand-red/25 bg-brand-red/10 p-4 text-center">
      <p className="text-sm text-red-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium text-brand-gold underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 rounded"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
