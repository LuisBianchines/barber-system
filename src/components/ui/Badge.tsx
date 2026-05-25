import type { AppointmentStatus } from '../../features/appointments/types';

type BadgeProps = {
  status: AppointmentStatus;
};

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  SCHEDULED: { label: 'Agendado', className: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: 'Concluído', className: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Cancelado', className: 'bg-red-100 text-red-700' },
};

export function StatusBadge({ status }: BadgeProps) {
  const { label, className } = statusConfig[status];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
