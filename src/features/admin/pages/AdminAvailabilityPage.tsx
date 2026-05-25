import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { LoadingState } from '../../../components/ui/LoadingState';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { useToast } from '../../../components/ui/Toast';
import { adminGetBarbers, adminGetAvailability, adminSetAvailability } from '../services/adminService';
import type { Barber } from '../../barbers/types';

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

type SlotForm = { weekday: number; startTime: string; endTime: string; enabled: boolean };

const DEFAULT_SLOTS: SlotForm[] = DAYS.map((_, i) => ({
  weekday: i,
  startTime: '09:00',
  endTime: '18:00',
  enabled: i >= 1 && i <= 5,
}));

export function AdminAvailabilityPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState('');
  const [slots, setSlots] = useState<SlotForm[]>(DEFAULT_SLOTS);
  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    adminGetBarbers()
      .then(setBarbers)
      .catch((err) => setError(err instanceof Error ? err.message : 'Erro ao carregar barbeiros.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedBarberId) return;
    setLoadingSlots(true);
    adminGetAvailability(selectedBarberId)
      .then((data) => {
        const updated = DEFAULT_SLOTS.map((def) => {
          const found = data.find((d) => d.weekday === def.weekday);
          return found
            ? { weekday: found.weekday, startTime: found.startTime, endTime: found.endTime, enabled: true }
            : { ...def, enabled: false };
        });
        setSlots(updated);
      })
      .catch(() => setSlots(DEFAULT_SLOTS.map((s) => ({ ...s, enabled: false }))))
      .finally(() => setLoadingSlots(false));
  }, [selectedBarberId]);

  async function handleSave() {
    if (!selectedBarberId) return;
    setSaving(true);
    try {
      await adminSetAvailability(
        selectedBarberId,
        slots.filter((s) => s.enabled).map(({ weekday, startTime, endTime }) => ({ weekday, startTime, endTime }))
      );
      showToast('Disponibilidade salva.', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao salvar disponibilidade.', 'error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingState />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Disponibilidade" subtitle="Configure os horários de trabalho dos barbeiros" />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700">Barbeiro</label>
        <select
          value={selectedBarberId}
          onChange={(e) => setSelectedBarberId(e.target.value)}
          className="rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 max-w-xs"
        >
          <option value="">Selecione um barbeiro</option>
          {barbers.map((b) => (
            <option key={b.id} value={b.id}>{b.user.name}</option>
          ))}
        </select>
      </div>

      {selectedBarberId && (
        <>
          {loadingSlots ? (
            <LoadingState message="Carregando disponibilidade..." />
          ) : (
            <div className="flex flex-col gap-3">
              {slots.map((slot, idx) => (
                <Card key={slot.weekday} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <label className="flex items-center gap-2 min-w-[110px]">
                    <input
                      type="checkbox"
                      checked={slot.enabled}
                      onChange={(e) => {
                        const updated = [...slots];
                        updated[idx] = { ...slot, enabled: e.target.checked };
                        setSlots(updated);
                      }}
                      className="h-4 w-4 rounded border-zinc-300"
                    />
                    <span className="text-sm font-medium text-zinc-800">{DAYS[slot.weekday]}</span>
                  </label>
                  {slot.enabled && (
                    <div className="flex items-center gap-2 text-sm text-zinc-700">
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => {
                          const updated = [...slots];
                          updated[idx] = { ...slot, startTime: e.target.value };
                          setSlots(updated);
                        }}
                        className="rounded-lg border border-zinc-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      />
                      <span>até</span>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => {
                          const updated = [...slots];
                          updated[idx] = { ...slot, endTime: e.target.value };
                          setSlots(updated);
                        }}
                        className="rounded-lg border border-zinc-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      />
                    </div>
                  )}
                </Card>
              ))}
              <Button loading={saving} onClick={handleSave} className="self-start">
                Salvar disponibilidade
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
