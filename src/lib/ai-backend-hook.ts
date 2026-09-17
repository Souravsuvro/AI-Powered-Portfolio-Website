/**
 * Drop-in helper to call after a successful Agent Desk or studio AI run.
 * Keeps the existing runStudioAgent / complete() logic untouched.
 *
 * Usage (after specialist + optional critic finish):
 *
 *   import { persistAgentRun } from '@/lib/ai-backend-hook';
 *   await persistAgentRun({ agentId, prompt, specialist, critic, tokens });
 */

import { saveAgentRun, logActivity } from './storage';

export async function persistAgentRun(opts: {
  agentId: string;
  prompt: string;
  specialist?: string | null;
  critic?: string | null;
  tokens?: number;
  status?: 'completed' | 'failed';
  error?: string | null;
  meta?: Record<string, unknown>;
}) {
  try {
    await saveAgentRun({
      agent_id: opts.agentId,
      prompt: opts.prompt,
      specialist_output: opts.specialist ?? null,
      critic_output: opts.critic ?? null,
      tokens_used: opts.tokens ?? 0,
      status: opts.status ?? 'completed',
      error_message: opts.error ?? null,
      meta: opts.meta || {},
    });
  } catch {
    // never break the AI response path
    logActivity('agent_run_error', `Failed to persist agent run for ${opts.agentId}`);
  }
}
