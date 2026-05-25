import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

export function BarberLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between">
        <span className="text-lg font-bold text-zinc-900">BarberScheduler</span>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-zinc-500 hidden md:block">{user?.name}</span>
          <button onClick={handleLogout} className="text-zinc-500 hover:text-zinc-800 underline">
            Sair
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
