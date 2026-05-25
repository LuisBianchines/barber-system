import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export function HomePage() {
  return (
    <div className="flex flex-col items-center gap-8 py-8 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-zinc-900">BarberScheduler</h1>
        <p className="text-zinc-500">Agende seu horário na barbearia de forma rápida e fácil.</p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link to="/login">
          <Button size="lg" className="w-full">Entrar</Button>
        </Link>
        <Link to="/register">
          <Button size="lg" variant="secondary" className="w-full">Criar conta</Button>
        </Link>
      </div>
    </div>
  );
}
