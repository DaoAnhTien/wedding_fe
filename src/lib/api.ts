const baseUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export interface Wish {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}
export interface RSVPEntry extends Wish {
  status: 'attending' | 'not-attending' | 'maybe';
}
export interface Page<T> { items: T[]; total: number }

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    signal: options?.signal || AbortSignal.timeout(15000),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || 'Không thể kết nối. Vui lòng thử lại.');
  if (data === null) throw new Error('Máy chủ trả về dữ liệu không hợp lệ.');
  return data as T;
}

export const wishesApi = {
  list: (limit = 12, offset = 0, signal?: AbortSignal) =>
    api<Page<Wish>>(`/wishes?limit=${limit}&offset=${offset}`, { signal }),
  create: (data: Pick<Wish, 'name' | 'message'>) =>
    api<Wish>('/wishes', { method: 'POST', body: JSON.stringify(data) }),
  adminList: (token: string, offset = 0) =>
    api<Page<Wish>>(`/admin/wishes?limit=12&offset=${offset}`, { headers: { Authorization: `Bearer ${token}` } }),
  update: (id: number, data: Pick<Wish, 'name' | 'message'>, token: string) =>
    api<Wish>(`/wishes/${id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(data) }),
  remove: (id: number, token: string) =>
    api<{ id: number; deleted: boolean }>(`/wishes/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }),
};
