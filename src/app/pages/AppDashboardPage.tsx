import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Card } from '../../components/ui/Card';

const actions = [
  { label: 'Ver serviços', description: 'Escolha e agende um serviço', href: '/app/servicos' },
  { label: 'Agendar', description: 'Novo agendamento rápido', href: '/app/agendar' },
  { label: 'Meus agendamentos', description: 'Consulte e cancele seus horários', href: '/app/agendamentos' },
];

export function AppDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-zinc-900">Olá, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-sm text-zinc-500">O que você gostaria de fazer?</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {actions.map((a) => (
          <Link key={a.href} to={a.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <p className="font-semibold text-zinc-900">{a.label}</p>
              <p className="mt-1 text-sm text-zinc-500">{a.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
