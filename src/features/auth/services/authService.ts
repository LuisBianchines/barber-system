import { apiFetch } from '../../../lib/api';
import type { AuthResponse, LoginInput, RegisterInput, User } from '../types';

export async function login(data: LoginInput): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  });
}

export async function register(data: Omit<RegisterInput, 'confirmPassword'>): Promise<User> {
  return apiFetch<User>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  });
}
