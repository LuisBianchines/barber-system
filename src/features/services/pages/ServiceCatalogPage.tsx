import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { LoadingState } from '../../../components/ui/LoadingState';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { EmptyState } from '../../../components/ui/EmptyState';
import { ServiceCard } from '../components/ServiceCard';
import { getServices } from '../services/servicesService';
import type { Service } from '../types';

export function ServiceCatalogPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchServices() {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar serviços.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Serviços" subtitle="Escolha o serviço que deseja agendar" />

      {loading && <LoadingState message="Carregando serviços..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={fetchServices} />}

      {!loading && !error && services.length === 0 && (
        <EmptyState
          title="Nenhum serviço disponível"
          description="Volte em breve para ver os serviços disponíveis."
        />
      )}

      {!loading && !error && services.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
