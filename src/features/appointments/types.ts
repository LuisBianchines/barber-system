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
  barberName?: string;
  serviceName?: string;
  clientName?: string;
};

export type CreateAppointmentInput = {
  barberId: string;
  serviceId: string;
  appointmentDate: string;
  startTime: string;
};

export type AvailableSlot = {
  startTime: string;
  endTime: string;
};
