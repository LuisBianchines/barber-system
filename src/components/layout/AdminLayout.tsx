import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-zinc-900 text-white px-4 py-3 flex items-center justify-between">
        <Link to="/admin" className="text-lg font-bold">
          BarberScheduler — Admin
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/admin/servicos" className="text-zinc-300 hover:text-white">Serviços</Link>
            <Link to="/admin/barbeiros" className="text-zinc-300 hover:text-white">Barbeiros</Link>
            <Link to="/admin/disponibilidade" className="text-zinc-300 hover:text-white">Disponibilidade</Link>
          </nav>
          <span className="text-zinc-400 hidden md:block">{user?.name}</span>
          <button onClick={handleLogout} className="text-zinc-400 hover:text-white underline">
            Sair
          </button>
        </div>
      </header>

      <nav className="md:hidden bg-zinc-800 text-white flex overflow-x-auto text-sm">
        <Link to="/admin/servicos" className="px-4 py-3 text-zinc-300 hover:text-white whitespace-nowrap">Serviços</Link>
        <Link to="/admin/barbeiros" className="px-4 py-3 text-zinc-300 hover:text-white whitespace-nowrap">Barbeiros</Link>
        <Link to="/admin/disponibilidade" className="px-4 py-3 text-zinc-300 hover:text-white whitespace-nowrap">Disponibilidade</Link>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
