import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { BrandLogo } from '../brand/BrandLogo';

const navLinks = [
  { to: '/app/servicos', label: 'Serviços' },
  { to: '/app/agendar', label: 'Agendar' },
  { to: '/app/agendamentos', label: 'Meus agendamentos' },
];

const activeClass = 'text-brand-gold border-b-2 border-brand-gold';
const inactiveClass = 'text-brand-silver hover:text-brand-ivory border-b-2 border-transparent';

export function AuthenticatedLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-brand-ink">
      <header className="border-b border-brand-gold/10 bg-brand-black/80 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl flex items-center justify-between gap-4">
          <NavLink to="/app">
            <BrandLogo size="sm" showText />
          </NavLink>
          <div className="hidden md:flex items-center gap-5 text-sm">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `pb-0.5 transition-colors font-medium ${isActive ? activeClass : inactiveClass}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-sm text-brand-smoke">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-brand-smoke hover:text-brand-ivory transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <nav className="md:hidden border-b border-brand-gold/10 bg-brand-black/60 flex overflow-x-auto text-sm">
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-4 py-3 whitespace-nowrap font-medium transition-colors ${isActive ? 'text-brand-gold' : 'text-brand-silver hover:text-brand-ivory'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
