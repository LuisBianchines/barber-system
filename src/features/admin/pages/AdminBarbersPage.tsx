import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { LoadingState } from '../../../components/ui/LoadingState';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useToast } from '../../../components/ui/Toast';
import {
  adminCreateBarber,
  adminGetBarbers,
  adminToggleBarber,
} from '../services/adminService';
import type { Barber } from '../../barbers/types';

export function AdminBarbersPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  async function fetchBarbers() {
    setLoading(true);
    setError(null);
    try {
      setBarbers(await adminGetBarbers());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar barbeiros.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchBarbers(); }, []);

  async function handleCreate() {
    if (!form.name || !form.email) {
      showToast('Preencha nome e e-mail.', 'error');
      return;
    }
    setSaving(true);
    try {
      const created = await adminCreateBarber(form);
      setBarbers((prev) => [...prev, created]);
      setForm({ name: '', email: '' });
      setShowForm(false);
      showToast('Barbeiro criado.', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao criar barbeiro.', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(id: string) {
    try {
      const updated = await adminToggleBarber(id);
      setBarbers((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao alterar barbeiro.', 'error');
    }
  }

  if (loading) return <LoadingState message="Carregando barbeiros..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchBarbers} />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Barbeiros"
        action={<Button size="sm" onClick={() => setShowForm(true)}>Novo barbeiro</Button>}
      />

      {showForm && (
        <Card className="flex flex-col gap-4">
          <p className="font-semibold text-zinc-900">Novo barbeiro</p>
          <Input label="Nome *" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <Input label="E-mail *" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          <div className="flex gap-3">
            <Button loading={saving} onClick={handleCreate}>Salvar</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </Card>
      )}

      {barbers.length === 0 && <EmptyState title="Nenhum barbeiro cadastrado" />}

      <div className="flex flex-col gap-3">
        {barbers.map((b) => (
          <Card key={b.id} className={`flex items-center justify-between gap-4 ${!b.active ? 'opacity-60' : ''}`}>
            <div>
              <p className="font-medium text-zinc-900">{b.name}</p>
              <p className="text-sm text-zinc-500">
                {b.email}
                {!b.active && <span className="ml-2 text-xs text-red-500">Inativo</span>}
              </p>
            </div>
            <Button size="sm" variant={b.active ? 'danger' : 'ghost'} onClick={() => handleToggle(b.id)}>
              {b.active ? 'Inativar' : 'Ativar'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
