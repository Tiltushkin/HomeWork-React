import type { Student, Attend } from '../features/students/types';

const BASE = 'http://localhost:8000/api';
const USERNAME = 'admin';
const PASSWORD = '123';

function basicAuthHeader() {
  const base64 =
    typeof window !== 'undefined' && typeof window.btoa === 'function'
      ? window.btoa(`${USERNAME}:${PASSWORD}`)
      : Buffer.from(`${USERNAME}:${PASSWORD}`, 'utf-8').toString('base64');
  return { Authorization: `Basic ${base64}` };
}

async function requestJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.headers || {}),
      ...basicAuthHeader(),
    },
  });

  if (!res.ok) {
    let details = '';
    try { details = await res.text(); } catch {}
    throw new Error(`HTTP ${res.status}: ${res.statusText}${details ? ` — ${details}` : ''}`);
  }

  const text = await res.text();
  if (!text) return undefined as unknown as T;

  try { return JSON.parse(text) as T; }
  catch { return undefined as unknown as T; }
}

export async function fetchStudents(): Promise<Student[]> {
  return requestJSON<Student[]>('/students', { method: 'GET' });
}

async function resilientPut(path: string, jsonBody: unknown, rawBody: string): Promise<void> {
  const url = `${BASE}${path}`;

  const res1 = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...basicAuthHeader(),
    },
    body: JSON.stringify(jsonBody),
  });

  if (res1.ok) return;

  if ([400, 415, 422].includes(res1.status)) {
    const res2 = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/plain; charset=utf-8',
        ...basicAuthHeader(),
      },
      body: rawBody,
    });
    if (res2.ok) return;

    let details = '';
    try { details = await res2.text(); } catch {}
    throw new Error(`PUT retry failed: HTTP ${res2.status} — ${details}`);
  }

  let details = '';
  try { details = await res1.text(); } catch {}
  throw new Error(`PUT failed: HTTP ${res1.status} — ${details}`);
}

export async function putAttend(id: number, attend: Attend): Promise<void> {
  return resilientPut(`/students/${id}/attend`, { attend }, attend);
}

export async function putGrade(id: number, grade: number): Promise<void> {
  return resilientPut(`/students/${id}/grade`, { grade }, String(grade));
}