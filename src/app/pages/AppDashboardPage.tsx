import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Card } from '../../components/ui/Card';

const actions = [
  {
    label: 'Ver serviços',
    description: 'Escolha e agende um serviço',
    href: '/app/servicos',
    accent: '✂',
  },
  {
    label: 'Agendar',
    description: 'Novo agendamento rápido',
    href: '/app/agendar',
    accent: '📅',
  },
  {
    label: 'Meus agendamentos',
    description: 'Consulte e cancele seus horários',
    href: '/app/agendamentos',
    accent: '🗒',
  },
];

export function AppDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-brand-ivory">
          Olá, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-sm text-brand-silver">O que você gostaria de fazer hoje?</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((a) => (
          <Link key={a.href} to={a.href}>
            <Card className="flex items-center gap-4 hover:border-brand-gold/30 transition-colors cursor-pointer">
              <span className="text-2xl select-none">{a.accent}</span>
              <div>
                <p className="font-semibold text-brand-ivory">{a.label}</p>
                <p className="mt-0.5 text-sm text-brand-silver">{a.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
