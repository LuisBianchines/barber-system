import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { BrandLogo } from '../brand/BrandLogo';

const navLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/servicos', label: 'Serviços' },
  { to: '/admin/barbeiros', label: 'Barbeiros' },
  { to: '/admin/disponibilidade', label: 'Disponibilidade' },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-brand-ink">
      <header className="border-b border-brand-gold/15 bg-brand-black px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl flex items-center justify-between gap-4">
          <NavLink to="/admin">
            <BrandLogo size="sm" showText subtitle="Admin" />
          </NavLink>
          <div className="hidden md:flex items-center gap-5 text-sm">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `pb-0.5 border-b-2 font-medium transition-colors ${isActive ? 'text-brand-gold border-brand-gold' : 'text-brand-silver border-transparent hover:text-brand-ivory'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1.5 text-sm">
              <span className="text-brand-smoke">{user?.name}</span>
              <span className="rounded-full bg-brand-gold/15 px-2 py-0.5 text-xs text-brand-gold border border-brand-gold/25">
                Admin
              </span>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-brand-smoke hover:text-brand-ivory transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <nav className="md:hidden border-b border-brand-gold/10 bg-brand-black/80 flex overflow-x-auto text-sm">
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `px-4 py-3 whitespace-nowrap font-medium transition-colors ${isActive ? 'text-brand-gold' : 'text-brand-silver hover:text-brand-ivory'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
