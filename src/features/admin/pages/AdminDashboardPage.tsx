import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { PageHeader } from '../../../components/ui/PageHeader';

const modules = [
  { label: 'Serviços', description: 'Gerenciar serviços da barbearia', href: '/admin/servicos' },
  { label: 'Barbeiros', description: 'Gerenciar barbeiros e status', href: '/admin/barbeiros' },
  { label: 'Disponibilidade', description: 'Configurar horários de atendimento', href: '/admin/disponibilidade' },
];

export function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Painel administrativo" subtitle="Gerencie seu negócio" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {modules.map((m) => (
          <Link key={m.href} to={m.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <p className="font-semibold text-zinc-900">{m.label}</p>
              <p className="mt-1 text-sm text-zinc-500">{m.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
