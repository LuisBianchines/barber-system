import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { StatusBadge } from '../../../components/ui/Badge';
import { LoadingState } from '../../../components/ui/LoadingState';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useToast } from '../../../components/ui/Toast';
import { cancelAppointment, getMyAppointments } from '../services/appointmentsService';
import type { Appointment } from '../types';

export function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const { showToast } = useToast();

  async function fetchAppointments() {
    setLoading(true);
    setError(null);
    try {
      setAppointments(await getMyAppointments());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar agendamentos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAppointments(); }, []);

  async function handleCancel(id: string) {
    if (!window.confirm('Tem certeza que deseja cancelar este agendamento?')) return;
    setCancelling(id);
    try {
      const updated = await cancelAppointment(id);
      setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)));
      showToast('Agendamento cancelado.', 'info');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao cancelar agendamento.', 'error');
    } finally {
      setCancelling(null);
    }
  }

  const now = new Date().toISOString().split('T')[0];
  const upcoming = appointments.filter((a) => a.appointmentDate.slice(0, 10) >= now && a.status === 'SCHEDULED');
  const past = appointments.filter((a) => a.appointmentDate.slice(0, 10) < now || a.status !== 'SCHEDULED');

  if (loading) return <LoadingState message="Carregando agendamentos..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAppointments} />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Meus agendamentos"
        action={
          <Link to="/app/agendar">
            <Button size="sm">Novo agendamento</Button>
          </Link>
        }
      />

      {appointments.length === 0 && (
        <EmptyState
          title="Nenhum agendamento ainda"
          description="Agende um serviço e ele aparecerá aqui."
          action={
            <Link to="/app/servicos">
              <Button variant="secondary">Ver serviços</Button>
            </Link>
          }
        />
      )}

      {upcoming.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold text-brand-smoke uppercase tracking-wide">Próximos</h2>
          {upcoming.map((a) => (
            <AppointmentCard key={a.id} appointment={a} onCancel={handleCancel} cancelling={cancelling === a.id} />
          ))}
        </section>
      )}

      {past.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold text-brand-smoke uppercase tracking-wide">Histórico</h2>
          {past.map((a) => (
            <AppointmentCard key={a.id} appointment={a} />
          ))}
        </section>
      )}
    </div>
  );
}

type AppointmentCardProps = {
  appointment: Appointment;
  onCancel?: (id: string) => void;
  cancelling?: boolean;
};

function AppointmentCard({ appointment: a, onCancel, cancelling }: AppointmentCardProps) {
  const date = new Date(a.appointmentDate).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  });

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm text-brand-silver">{date} às {a.startTime}</p>
          <p className="text-xs text-brand-smoke">até {a.endTime}</p>
        </div>
        <StatusBadge status={a.status} />
      </div>
      {onCancel && a.status === 'SCHEDULED' && (
        <Button variant="danger" size="sm" loading={cancelling} onClick={() => onCancel(a.id)} className="self-start">
          Cancelar
        </Button>
      )}
    </Card>
  );
}
