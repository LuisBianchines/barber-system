import { apiFetch } from '../../../lib/api';
import type { AuthResponse, LoginInput, RegisterInput } from '../types';

export async function login(data: LoginInput): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  });
}

export async function register(data: Omit<RegisterInput, 'confirmPassword'>): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
  });
}
