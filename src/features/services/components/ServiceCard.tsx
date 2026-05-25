import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import type { Service } from '../types';

type ServiceCardProps = {
  service: Service;
};

function formatPrice(price: string | number): string {
  return Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function ServiceCard({ service }: ServiceCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col gap-3">
      <div>
        <h3 className="text-base font-semibold text-zinc-900">{service.name}</h3>
        {service.description && (
          <p className="mt-1 text-sm text-zinc-500">{service.description}</p>
        )}
      </div>
      <div className="flex items-center gap-3 text-sm text-zinc-600">
        <span className="font-medium text-zinc-900">{formatPrice(service.price)}</span>
        <span>•</span>
        <span>{service.durationMinutes} min</span>
      </div>
      <Button
        onClick={() => navigate(`/app/agendar?serviceId=${service.id}`)}
        className="w-full"
        disabled={!service.active}
      >
        Agendar
      </Button>
    </Card>
  );
}
