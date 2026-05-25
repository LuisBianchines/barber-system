import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { StatusBadge } from '../../../components/ui/Badge';
import { LoadingState } from '../../../components/ui/LoadingState';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useToast } from '../../../components/ui/Toast';
import { completeAppointment, getBarberAppointments } from '../../appointments/services/appointmentsService';
import type { AppointmentWithRelations } from '../../appointments/types';

export function BarberAgendaPage() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [appointments, setAppointments] = useState<AppointmentWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completing, setCompleting] = useState<string | null>(null);
  const { showToast } = useToast();

  async function fetchAppointments(date: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await getBarberAppointments(date);
      setAppointments(data.sort((a, b) => a.startTime.localeCompare(b.startTime)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar agenda.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAppointments(selectedDate); }, [selectedDate]);

  async function handleComplete(id: string) {
    setCompleting(id);
    try {
      const updated = await completeAppointment(id);
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
      showToast('Atendimento concluído.', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao concluir atendimento.', 'error');
    } finally {
      setCompleting(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Minha agenda" />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700">Data</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 max-w-xs"
        />
      </div>

      {loading && <LoadingState message="Carregando agenda..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={() => fetchAppointments(selectedDate)} />}
      {!loading && !error && appointments.length === 0 && (
        <EmptyState title="Nenhum agendamento para esse dia" />
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="flex flex-col gap-3">
          {appointments.map((a) => (
            <Card key={a.id} className={`flex flex-col gap-3 ${a.status === 'CANCELLED' ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <p className="font-medium text-zinc-900">{a.startTime} — {a.endTime}</p>
                  <p className="text-sm text-zinc-700">{a.client?.name ?? '—'}</p>
                  <p className="text-sm text-zinc-500">{a.service?.name ?? '—'}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
              {a.status === 'SCHEDULED' && (
                <Button size="sm" loading={completing === a.id} onClick={() => handleComplete(a.id)} className="self-start">
                  Concluir
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
