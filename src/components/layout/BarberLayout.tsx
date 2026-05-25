import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { BrandLogo } from '../brand/BrandLogo';

export function BarberLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-brand-ink">
      <header className="border-b border-brand-gold/15 bg-brand-black px-4 py-3">
        <div className="mx-auto max-w-2xl flex items-center justify-between gap-4">
          <BrandLogo size="sm" showText subtitle="Barbeiro" />
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-sm text-brand-smoke">{user?.name}</span>
              <span className="rounded-full bg-brand-copper/15 px-2 py-0.5 text-xs text-brand-copper border border-brand-copper/25">
                Barbeiro
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-brand-smoke hover:text-brand-ivory transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
