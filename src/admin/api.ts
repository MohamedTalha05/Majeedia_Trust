// Tiny client for the admin API. The session token lives in sessionStorage (cleared when the tab closes).
const KEY = 'mt-admin-token';

export const session = {
  get: () => {
    try {
      return sessionStorage.getItem(KEY) ?? '';
    } catch {
      return '';
    }
  },
  set: (token: string) => {
    try {
      if (token) sessionStorage.setItem(KEY, token);
      else sessionStorage.removeItem(KEY);
    } catch {
      /* storage unavailable: the session simply won't survive a reload */
    }
  },
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors: Record<string, string> = {},
  ) {
    super(message);
  }
}

export async function request<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = session.get();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (init.body && !(init.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  const res = await fetch(`/api${path}`, { ...init, headers });
  if (res.status === 204) return undefined as T;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) session.set('');
    throw new ApiError(body.error ?? 'Request failed', res.status, body.errors);
  }
  return body as T;
}

export async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const { url } = await request<{ url: string }>('/admin/upload', { method: 'POST', body: form });
  return url;
}
