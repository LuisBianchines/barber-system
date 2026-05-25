import { apiFetch } from '../../../lib/api';
import type { Barber, Availability } from '../types';

export async function getBarbers(): Promise<Barber[]> {
  return apiFetch<Barber[]>('/barbers?active=true');
}

export async function getBarberAvailability(barberId: string): Promise<Availability[]> {
  return apiFetch<Availability[]>(`/admin/barbers/${barberId}/availability`);
}
