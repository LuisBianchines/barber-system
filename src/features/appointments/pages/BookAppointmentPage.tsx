import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { LoadingState } from '../../../components/ui/LoadingState';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { useToast } from '../../../components/ui/Toast';
import { getBarbers } from '../../barbers/services/barbersService';
import { getServices } from '../../services/services/servicesService';
import { createAppointment, getAvailableSlots } from '../services/appointmentsService';
import type { Barber } from '../../barbers/types';
import type { Service } from '../../services/types';

export function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [slots, setSlots] = useState<string[]>([]);

  const [selectedServiceId, setSelectedServiceId] = useState(searchParams.get('serviceId') ?? '');
  const [selectedBarberId, setSelectedBarberId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const [loadingInit, setLoadingInit] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    async function init() {
      try {
        const [s, b] = await Promise.all([getServices(), getBarbers()]);
        setServices(s);
        setBarbers(b);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados.');
      } finally {
        setLoadingInit(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (!selectedBarberId || !selectedServiceId || !selectedDate) {
      setSlots([]);
      setSelectedSlot('');
      return;
    }
    setLoadingSlots(true);
    setSelectedSlot('');
    getAvailableSlots(selectedBarberId, selectedServiceId, selectedDate)
      .then(setSlots)
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedBarberId, selectedServiceId, selectedDate]);

  async function handleConfirm() {
    if (!selectedServiceId || !selectedBarberId || !selectedDate || !selectedSlot) return;
    setSubmitting(true);
    try {
      await createAppointment({
        barberId: selectedBarberId,
        serviceId: selectedServiceId,
        appointmentDate: selectedDate,
        startTime: selectedSlot,
      });
      showToast('Agendamento confirmado!', 'success');
      navigate('/app/agendamentos');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao confirmar agendamento.', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingInit) return <LoadingState message="Carregando..." />;
  if (error) return <ErrorMessage message={error} />;

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const selectedBarber = barbers.find((b) => b.id === selectedBarberId);
  const isComplete = selectedServiceId && selectedBarberId && selectedDate && selectedSlot;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Agendar serviço" />

      <Card className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-silver">Serviço</label>
          <select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            className="rounded-xl border border-brand-graphite bg-brand-ink/60 px-3 py-2.5 text-sm text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50"
          >
            <option value="" className="bg-brand-charcoal">Selecione um serviço</option>
            {services.map((s) => (
              <option key={s.id} value={s.id} className="bg-brand-charcoal">
                {s.name} — {s.durationMinutes} min — {Number(s.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-silver">Barbeiro</label>
          <select
            value={selectedBarberId}
            onChange={(e) => setSelectedBarberId(e.target.value)}
            className="rounded-xl border border-brand-graphite bg-brand-ink/60 px-3 py-2.5 text-sm text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50"
          >
            <option value="" className="bg-brand-charcoal">Selecione um barbeiro</option>
            {barbers.map((b) => (
              <option key={b.id} value={b.id} className="bg-brand-charcoal">
                {b.user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-silver">Data</label>
          <input
            type="date"
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-xl border border-brand-graphite bg-brand-ink/60 px-3 py-2.5 text-sm text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 [color-scheme:dark]"
          />
        </div>

        {selectedBarberId && selectedServiceId && selectedDate && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-brand-silver">Horário disponível</label>
            {loadingSlots ? (
              <p className="text-sm text-brand-smoke">Buscando horários...</p>
            ) : slots.length === 0 ? (
              <p className="text-sm text-brand-smoke">Nenhum horário disponível para essa data.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                      selectedSlot === slot
                        ? 'border-brand-gold bg-brand-gold text-brand-black shadow-gold'
                        : 'border-brand-graphite text-brand-silver hover:border-brand-gold/40 hover:text-brand-ivory'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>

      {isComplete && (
        <Card className="flex flex-col gap-3 border-brand-gold/25">
          <p className="text-sm font-semibold text-brand-gold">Resumo do agendamento</p>
          <div className="flex flex-col gap-1.5 text-sm text-brand-silver">
            <p><span className="font-medium text-brand-ivory">Serviço:</span> {selectedService?.name}</p>
            <p><span className="font-medium text-brand-ivory">Barbeiro:</span> {selectedBarber?.user.name}</p>
            <p><span className="font-medium text-brand-ivory">Data:</span> {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
            <p><span className="font-medium text-brand-ivory">Horário:</span> {selectedSlot}</p>
          </div>
          <Button onClick={handleConfirm} loading={submitting} size="lg" className="w-full">
            Confirmar agendamento
          </Button>
        </Card>
      )}
    </div>
  );
}
