const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

type FetchOptions = RequestInit & { skipAuth?: boolean };

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { skipAuth = false, ...fetchOptions } = options;
  const token = localStorage.getItem('barberscheduler_token');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(!skipAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...fetchOptions.headers,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('barberscheduler_token');
    localStorage.removeItem('barberscheduler_user');
    window.location.href = '/login';
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || 'Não foi possível concluir a operação. Tente novamente.');
  }

  return response.json();
}
