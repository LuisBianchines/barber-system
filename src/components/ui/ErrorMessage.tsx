type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorMessage({
  message = 'Não foi possível carregar os dados. Tente novamente.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg bg-red-50 p-4 text-center">
      <p className="text-sm text-red-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium text-red-700 underline hover:no-underline"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
