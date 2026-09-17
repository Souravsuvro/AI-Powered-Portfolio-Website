/**
 * Shared backend types for dual-write storage layer.
 * Compatible with both TanStack Start sandbox and Vite + React Router GitHub port.
 */

export type InquiryStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';

export interface Inquiry {
  id: string;
  created_at: string;
  updated_at?: string;
  name: string;
  email: string;
  message: string;
  source?: string;
  status: InquiryStatus;
  meta?: Record<string, unknown>;
  client_ip?: string | null;
  user_agent?: string | null;
}

export interface AgentRun {
  id: string;
  created_at: string;
  agent_id: string;
  prompt: string;
  specialist_output?: string | null;
  critic_output?: string | null;
  tokens_used?: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error_message?: string | null;
  meta?: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  created_at: string;
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  meta?: Record<string, unknown>;
}

export interface ActivityEvent {
  id: string;
  created_at: string;
  event_type: string;
  message: string;
  payload?: Record<string, unknown>;
}

export interface Note {
  id: string;
  created_at: string;
  updated_at?: string;
  title: string;
  body: string;
  tags?: string[];
}

/** Local-only shape used by the existing console (kept for backward compat) */
export interface LocalInquiry extends Inquiry {
  // legacy fields that may exist in older localStorage entries
  [key: string]: unknown;
}
