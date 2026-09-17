/**
 * Production storage layer for Crystal Studio portfolio.
 *
 * Dual-write: localStorage is always used (offline / zero-config).
 * When VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are present,
 * data is also persisted to Supabase for durability.
 *
 * Drop this file in place of (or merge with) the existing src/lib/storage.ts
 * in both the TanStack sandbox and the GitHub Vite + React Router repo.
 */

import type {
  Inquiry,
  AgentRun,
  ChatMessage,
  ActivityEvent,
  Note,
  InquiryStatus,
} from './backend-types';

// Re-export types so consumers can import from one place
export type { Inquiry, AgentRun, ChatMessage, ActivityEvent, Note, InquiryStatus };

// ---------- Keys (kept compatible with prior localStorage data) ----------
export const KEYS = {
  inquiries: 'studio_inquiries_v1',
  agentRuns: 'studio_agent_runs_v1',
  chat: 'studio_chat_v1',
  activity: 'studio_activity_v1',
  notes: 'studio_notes_v1',
  views: 'studio_views_v1',
  scores: 'studio_scores_v1',
  pipeline: 'studio_pipeline_v1',
} as const;

function uid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function nowISO(): string {
  return new Date().toISOString();
}

export function readJson<T>(key: string, fallback: T): T {
  try {
    if (typeof localStorage === 'undefined') return fallback;
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota / private mode — silent
  }
}

function getSupabaseEnv() {
  const url =
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
    (typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
    '';
  const anon =
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
    (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) ||
    '';
  const service =
    (typeof process !== 'undefined' &&
      (process.env?.SUPABASE_SERVICE_ROLE_KEY || process.env?.SUPABASE_SERVICE_KEY)) ||
    '';
  return { url: String(url).trim(), anon: String(anon).trim(), service: String(service).trim() };
}

export function isBackendEnabled(): boolean {
  const { url, anon } = getSupabaseEnv();
  return Boolean(url && anon);
}

async function sb(
  path: string,
  opts: { method?: string; body?: unknown; useServiceRole?: boolean } = {}
): Promise<{ data: any; error: string | null }> {
  const { url, anon, service } = getSupabaseEnv();
  if (!url || !anon) return { data: null, error: 'backend_disabled' };

  const key = opts.useServiceRole && service ? service : anon;
  try {
    const res = await fetch(`${url}/rest/v1/${path}`, {
      method: opts.method || 'GET',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      return { data: null, error: text || `http_${res.status}` };
    }
    const data = await res.json().catch(() => null);
    return { data, error: null };
  } catch (e: any) {
    return { data: null, error: e?.message || 'network_error' };
  }
}

export function listInquiriesLocal(): Inquiry[] {
  const raw = readJson<any[]>(KEYS.inquiries, []);
  return raw.map((item) => ({
    id: item.id || uid(),
    created_at: item.created_at || item.createdAt || nowISO(),
    updated_at: item.updated_at || item.updatedAt,
    name: item.name || '',
    email: item.email || '',
    message: item.message || '',
    source: item.source || 'contact',
    status: (item.status as InquiryStatus) || 'new',
    meta: item.meta || {},
    client_ip: item.client_ip ?? null,
    user_agent: item.user_agent ?? null,
  }));
}

export async function listInquiries(): Promise<Inquiry[]> {
  const local = listInquiriesLocal();
  if (!isBackendEnabled()) return local;
  const { data, error } = await sb('inquiries?select=*&order=created_at.desc&limit=200');
  if (error || !Array.isArray(data)) return local;
  const remoteIds = new Set(data.map((r: Inquiry) => r.id));
  const unsynced = local.filter((i) => !remoteIds.has(i.id));
  return [...data, ...unsynced].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function createInquiry(input: {
  name: string;
  email: string;
  message: string;
  source?: string;
  status?: InquiryStatus;
  meta?: Record<string, unknown>;
  client_ip?: string | null;
  user_agent?: string | null;
}): Promise<Inquiry> {
  const record: Inquiry = {
    id: uid(),
    created_at: nowISO(),
    updated_at: nowISO(),
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    source: input.source || 'contact',
    status: input.status || 'new',
    meta: input.meta || {},
    client_ip: input.client_ip ?? null,
    user_agent: input.user_agent ?? null,
  };
  const local = listInquiriesLocal();
  local.unshift(record);
  writeJson(KEYS.inquiries, local.slice(0, 200));
  if (isBackendEnabled()) {
    sb('inquiries', { method: 'POST', body: record }).catch(() => {});
  }
  logActivity('inquiry_created', `New inquiry from ${record.name}`, { id: record.id });
  return record;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<void> {
  const local = listInquiriesLocal();
  const idx = local.findIndex((i) => i.id === id);
  if (idx >= 0) {
    local[idx] = { ...local[idx], status, updated_at: nowISO() };
    writeJson(KEYS.inquiries, local);
  }
  if (isBackendEnabled()) {
    sb(`inquiries?id=eq.${id}`, {
      method: 'PATCH',
      body: { status, updated_at: nowISO() },
      useServiceRole: true,
    }).catch(() => {});
  }
  logActivity('status_change', `Inquiry ${id.slice(0, 8)} → ${status}`, { id, status });
}

export function listAgentRunsLocal(): AgentRun[] {
  return readJson<AgentRun[]>(KEYS.agentRuns, []);
}

export async function listAgentRuns(): Promise<AgentRun[]> {
  const local = listAgentRunsLocal();
  if (!isBackendEnabled()) return local;
  const { data, error } = await sb('agent_runs?select=*&order=created_at.desc&limit=100');
  if (error || !Array.isArray(data)) return local;
  const remoteIds = new Set(data.map((r: AgentRun) => r.id));
  const unsynced = local.filter((r) => !remoteIds.has(r.id));
  return [...data, ...unsynced].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function saveAgentRun(
  input: Omit<AgentRun, 'id' | 'created_at'> & { id?: string }
): Promise<AgentRun> {
  const record: AgentRun = {
    id: input.id || uid(),
    created_at: nowISO(),
    agent_id: input.agent_id,
    prompt: input.prompt,
    specialist_output: input.specialist_output ?? null,
    critic_output: input.critic_output ?? null,
    tokens_used: input.tokens_used ?? 0,
    status: input.status || 'completed',
    error_message: input.error_message ?? null,
    meta: input.meta || {},
  };
  const local = listAgentRunsLocal();
  local.unshift(record);
  writeJson(KEYS.agentRuns, local.slice(0, 100));
  if (isBackendEnabled()) {
    sb('agent_runs', { method: 'POST', body: record }).catch(() => {});
  }
  logActivity('agent_run', `Agent ${record.agent_id} completed`, {
    id: record.id,
    agent_id: record.agent_id,
  });
  return record;
}

export async function appendChatMessage(
  sessionId: string,
  role: ChatMessage['role'],
  content: string,
  meta?: Record<string, unknown>
): Promise<ChatMessage> {
  const record: ChatMessage = {
    id: uid(),
    created_at: nowISO(),
    session_id: sessionId,
    role,
    content,
    meta: meta || {},
  };
  const all = readJson<ChatMessage[]>(KEYS.chat, []);
  all.push(record);
  writeJson(KEYS.chat, all.slice(-300));
  if (isBackendEnabled()) {
    sb('chat_messages', { method: 'POST', body: record }).catch(() => {});
  }
  return record;
}

export function logActivity(
  event_type: string,
  message: string,
  payload?: Record<string, unknown>
): void {
  const event: ActivityEvent = {
    id: uid(),
    created_at: nowISO(),
    event_type,
    message,
    payload: payload || {},
  };
  const local = readJson<ActivityEvent[]>(KEYS.activity, []);
  local.unshift(event);
  writeJson(KEYS.activity, local.slice(0, 200));
  if (isBackendEnabled()) {
    sb('activity', { method: 'POST', body: event }).catch(() => {});
  }
}

export function listActivityLocal(): ActivityEvent[] {
  return readJson<ActivityEvent[]>(KEYS.activity, []);
}

export async function listActivity(): Promise<ActivityEvent[]> {
  const local = listActivityLocal();
  if (!isBackendEnabled()) return local;
  const { data, error } = await sb('activity?select=*&order=created_at.desc&limit=100');
  if (error || !Array.isArray(data)) return local;
  return data;
}

export function listNotesLocal(): Note[] {
  return readJson<Note[]>(KEYS.notes, []);
}

export async function saveNote(
  note: Partial<Note> & { title: string; body: string }
): Promise<Note> {
  const record: Note = {
    id: note.id || uid(),
    created_at: note.created_at || nowISO(),
    updated_at: nowISO(),
    title: note.title,
    body: note.body,
    tags: note.tags || [],
  };
  const local = listNotesLocal();
  const idx = local.findIndex((n) => n.id === record.id);
  if (idx >= 0) local[idx] = record;
  else local.unshift(record);
  writeJson(KEYS.notes, local);
  if (isBackendEnabled()) {
    sb('notes', { method: 'POST', body: record, useServiceRole: true }).catch(() => {});
  }
  return record;
}

export async function rateOk(key: string, max: number, windowMs: number): Promise<boolean> {
  const storeKey = `rl_${key}`;
  const now = Date.now();
  const hits = readJson<number[]>(storeKey, []).filter((t) => now - t < windowMs);
  if (hits.length >= max) return false;
  hits.push(now);
  writeJson(storeKey, hits);
  return true;
}

export function trackView(path: string): void {
  const views = readJson<Record<string, number>>(KEYS.views, {});
  views[path] = (views[path] || 0) + 1;
  writeJson(KEYS.views, views);
}

export function getViews(): Record<string, number> {
  return readJson(KEYS.views, {});
}
