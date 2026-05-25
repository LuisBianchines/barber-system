export const ROLES = {
  CLIENT: 'CLIENT',
  BARBER: 'BARBER',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
