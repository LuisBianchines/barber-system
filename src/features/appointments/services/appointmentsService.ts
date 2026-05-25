import { apiFetch } from '../../../lib/api';
import type { Appointment, AppointmentWithRelations, CreateAppointmentInput } from '../types';

export async function getAvailableSlots(
  barberId: string,
  serviceId: string,
  date: string
): Promise<string[]> {
  return apiFetch<string[]>(
    `/appointments/available-slots?barberId=${barberId}&serviceId=${serviceId}&date=${date}`
  );
}

export async function createAppointment(data: CreateAppointmentInput): Promise<Appointment> {
  return apiFetch<Appointment>('/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getMyAppointments(): Promise<Appointment[]> {
  return apiFetch<Appointment[]>('/appointments/me');
}

export async function cancelAppointment(id: string): Promise<Appointment> {
  return apiFetch<Appointment>(`/appointments/${id}/cancel`, { method: 'PATCH' });
}

export async function completeAppointment(id: string): Promise<AppointmentWithRelations> {
  return apiFetch<AppointmentWithRelations>(`/appointments/${id}/complete`, { method: 'PATCH' });
}

export async function getBarberAppointments(date: string): Promise<AppointmentWithRelations[]> {
  return apiFetch<AppointmentWithRelations[]>(`/barber/appointments?date=${date}`);
}
