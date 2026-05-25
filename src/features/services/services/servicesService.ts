import { apiFetch } from '../../../lib/api';
import type { Service } from '../types';

export async function getServices(): Promise<Service[]> {
  return apiFetch<Service[]>('/services?active=true');
}
