export type AppointmentStatus = 'SCHEDULED' | 'CANCELLED' | 'COMPLETED';

export type Appointment = {
  id: string;
  clientId: string;
  barberId: string;
  serviceId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  createdAt?: string;
};

export type AppointmentWithRelations = Appointment & {
  client?: { name: string; email: string };
  service?: { name: string; durationMinutes: number; price: string };
};

export type CreateAppointmentInput = {
  barberId: string;
  serviceId: string;
  appointmentDate: string;
  startTime: string;
};
