import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-5xl font-bold text-zinc-300">404</p>
      <p className="text-lg font-medium text-zinc-700">Página não encontrada</p>
      <p className="text-sm text-zinc-500">A página que você tentou acessar não existe.</p>
      <Link to="/">
        <Button variant="secondary">Voltar ao início</Button>
      </Link>
    </div>
  );
}
