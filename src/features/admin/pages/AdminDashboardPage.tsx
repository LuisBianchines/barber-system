import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { PageHeader } from '../../../components/ui/PageHeader';

const modules = [
  {
    label: 'Serviços',
    description: 'Gerenciar serviços da barbearia',
    href: '/admin/servicos',
    accent: '✂',
  },
  {
    label: 'Barbeiros',
    description: 'Gerenciar barbeiros e status',
    href: '/admin/barbeiros',
    accent: '👤',
  },
  {
    label: 'Disponibilidade',
    description: 'Configurar horários de atendimento',
    href: '/admin/disponibilidade',
    accent: '🗓',
  },
];

export function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Painel administrativo" subtitle="Gerencie seu negócio" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {modules.map((m) => (
          <Link key={m.href} to={m.href}>
            <Card className="flex flex-col gap-3 h-full hover:border-brand-gold/30 transition-colors cursor-pointer">
              <span className="text-3xl">{m.accent}</span>
              <div>
                <p className="font-semibold text-brand-ivory">{m.label}</p>
                <p className="mt-1 text-sm text-brand-silver">{m.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
