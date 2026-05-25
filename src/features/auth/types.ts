import type { Role } from '../../lib/constants';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type AuthResponse = {
  token: string;
  user: User;
};
