import { apiFetch } from '../../../lib/api';
import type { Service } from '../../services/types';
import type { Barber, Availability } from '../../barbers/types';

export async function adminGetServices(): Promise<Service[]> {
  return apiFetch<Service[]>('/admin/services');
}

export async function adminCreateService(data: Omit<Service, 'id'>): Promise<Service> {
  return apiFetch<Service>('/admin/services', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminUpdateService(id: string, data: Partial<Omit<Service, 'id'>>): Promise<Service> {
  return apiFetch<Service>(`/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function adminToggleService(id: string): Promise<Service> {
  return apiFetch<Service>(`/admin/services/${id}/toggle-active`, { method: 'PATCH' });
}

export async function adminGetBarbers(): Promise<Barber[]> {
  return apiFetch<Barber[]>('/admin/barbers');
}

export async function adminCreateBarber(data: { name: string; email: string }): Promise<Barber> {
  return apiFetch<Barber>('/admin/barbers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminToggleBarber(id: string): Promise<Barber> {
  return apiFetch<Barber>(`/admin/barbers/${id}/toggle-active`, { method: 'PATCH' });
}

export async function adminGetAvailability(barberId: string): Promise<Availability[]> {
  return apiFetch<Availability[]>(`/admin/barbers/${barberId}/availability`);
}

export async function adminSetAvailability(barberId: string, data: Omit<Availability, 'id' | 'barberId'>[]): Promise<Availability[]> {
  return apiFetch<Availability[]>(`/admin/barbers/${barberId}/availability`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
