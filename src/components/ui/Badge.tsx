import type { AppointmentStatus } from '../../features/appointments/types';

type BadgeProps = {
  status: AppointmentStatus;
};

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  SCHEDULED: {
    label: 'Agendado',
    className: 'bg-brand-blue/20 text-sky-300 border border-brand-blue/30',
  },
  COMPLETED: {
    label: 'Concluído',
    className: 'bg-emerald-900/30 text-emerald-400 border border-emerald-700/30',
  },
  CANCELLED: {
    label: 'Cancelado',
    className: 'bg-brand-red/15 text-red-400 border border-brand-red/25',
  },
};

export function StatusBadge({ status }: BadgeProps) {
  const { label, className } = statusConfig[status];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
