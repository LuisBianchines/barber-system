import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

export function AuthenticatedLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between">
        <Link to="/app" className="text-lg font-bold text-zinc-900">
          BarberScheduler
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link to="/app/servicos" className="text-zinc-600 hover:text-zinc-900">
              Serviços
            </Link>
            <Link to="/app/agendar" className="text-zinc-600 hover:text-zinc-900">
              Agendar
            </Link>
            <Link to="/app/agendamentos" className="text-zinc-600 hover:text-zinc-900">
              Meus agendamentos
            </Link>
          </nav>
          <span className="text-sm text-zinc-500 hidden md:block">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-500 hover:text-zinc-800 underline"
          >
            Sair
          </button>
        </div>
      </header>

      <nav className="md:hidden bg-white border-b border-zinc-200 flex overflow-x-auto text-sm">
        <Link to="/app/servicos" className="px-4 py-3 text-zinc-600 hover:text-zinc-900 whitespace-nowrap">
          Serviços
        </Link>
        <Link to="/app/agendar" className="px-4 py-3 text-zinc-600 hover:text-zinc-900 whitespace-nowrap">
          Agendar
        </Link>
        <Link to="/app/agendamentos" className="px-4 py-3 text-zinc-600 hover:text-zinc-900 whitespace-nowrap">
          Meus agendamentos
        </Link>
      </nav>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
