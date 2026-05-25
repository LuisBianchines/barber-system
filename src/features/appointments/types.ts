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
};
