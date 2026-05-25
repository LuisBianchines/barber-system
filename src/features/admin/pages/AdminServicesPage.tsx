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
  adminCreateService,
  adminGetServices,
  adminToggleService,
  adminUpdateService,
} from '../services/adminService';
import type { Service } from '../../services/types';

type ServiceFormData = {
  name: string;
  description: string;
  price: string;
  durationMinutes: string;
};

const EMPTY_FORM: ServiceFormData = { name: '', description: '', price: '', durationMinutes: '' };

export function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  async function fetchServices() {
    setLoading(true);
    setError(null);
    try {
      setServices(await adminGetServices());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar serviços.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchServices(); }, []);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(service: Service) {
    setEditingId(service.id);
    setForm({
      name: service.name,
      description: service.description ?? '',
      price: String(service.price),
      durationMinutes: String(service.durationMinutes),
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name || !form.price || !form.durationMinutes) {
      showToast('Preencha todos os campos obrigatórios.', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description || undefined,
        price: parseFloat(form.price),
        durationMinutes: parseInt(form.durationMinutes),
        active: true,
      };
      if (editingId) {
        const updated = await adminUpdateService(editingId, payload);
        setServices((prev) => prev.map((s) => (s.id === editingId ? updated : s)));
        showToast('Serviço atualizado.', 'success');
      } else {
        const created = await adminCreateService(payload);
        setServices((prev) => [...prev, created]);
        showToast('Serviço criado.', 'success');
      }
      setShowForm(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao salvar serviço.', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(id: string) {
    try {
      const updated = await adminToggleService(id);
      setServices((prev) => prev.map((s) => (s.id === id ? updated : s)));
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao alterar serviço.', 'error');
    }
  }

  if (loading) return <LoadingState message="Carregando serviços..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchServices} />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Serviços"
        action={<Button size="sm" onClick={openCreate}>Novo serviço</Button>}
      />

      {showForm && (
        <Card className="flex flex-col gap-4">
          <p className="font-semibold text-zinc-900">{editingId ? 'Editar serviço' : 'Novo serviço'}</p>
          <Input label="Nome *" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <Input label="Descrição" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Preço (R$) *" type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            <Input label="Duração (min) *" type="number" min="1" value={form.durationMinutes} onChange={(e) => setForm((f) => ({ ...f, durationMinutes: e.target.value }))} />
          </div>
          <div className="flex gap-3">
            <Button loading={saving} onClick={handleSave}>Salvar</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </Card>
      )}

      {services.length === 0 && <EmptyState title="Nenhum serviço cadastrado" />}

      <div className="flex flex-col gap-3">
        {services.map((s) => (
          <Card key={s.id} className={`flex items-center justify-between gap-4 ${!s.active ? 'opacity-60' : ''}`}>
            <div>
              <p className="font-medium text-zinc-900">{s.name}</p>
              <p className="text-sm text-zinc-500">
                {s.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} · {s.durationMinutes} min
                {!s.active && <span className="ml-2 text-xs text-red-500">Inativo</span>}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="sm" variant="secondary" onClick={() => openEdit(s)}>Editar</Button>
              <Button size="sm" variant={s.active ? 'danger' : 'ghost'} onClick={() => handleToggle(s.id)}>
                {s.active ? 'Inativar' : 'Ativar'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
