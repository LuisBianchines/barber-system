import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { LoadingState } from '../../../components/ui/LoadingState';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useToast } from '../../../components/ui/Toast';
import { adminCreateBarber, adminGetBarbers, adminToggleBarber } from '../services/adminService';
import type { Barber } from '../../barbers/types';

export function AdminBarbersPage() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', bio: '' });
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
    if (!form.name || !form.email || !form.password) {
      showToast('Preencha nome, e-mail e senha.', 'error');
      return;
    }
    setSaving(true);
    try {
      const created = await adminCreateBarber({
        name: form.name,
        email: form.email,
        password: form.password,
        bio: form.bio || undefined,
      });
      setBarbers((prev) => [...prev, created]);
      setForm({ name: '', email: '', password: '', bio: '' });
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
          <p className="font-semibold text-brand-ivory">Novo barbeiro</p>
          <Input label="Nome *" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <Input label="E-mail *" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          <Input label="Senha *" type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          <Input label="Bio" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
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
              <p className="font-medium text-brand-ivory">{b.user.name}</p>
              <p className="text-sm text-brand-silver">
                {b.user.email}
                {b.bio && <span className="ml-2 text-brand-smoke">· {b.bio}</span>}
                {!b.active && <span className="ml-2 text-xs text-red-400">Inativo</span>}
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
