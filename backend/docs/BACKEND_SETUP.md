# Backend Setup — Dual-Write (localStorage + Supabase)

Most efficient production path for the Crystal Studio / Sourav Sarker portfolio.

## Why this design

- **Zero downtime / zero breakage**: localStorage continues to work for every visitor even if Supabase keys are missing.
- **Durable when you want it**: inquiries, agent runs, chat, activity and notes survive browser clears and appear on any device once keys are added.
- **No stack change**: works with Vite + React Router (and TanStack if used).
- **Auth stays OFF** until you explicitly enable it for `/console`.
- **Free-tier friendly**: Supabase free tier is more than enough for a portfolio + lead pipeline.

## 1. Create Supabase project (5 min)

1. Go to https://supabase.com → New project.
2. Choose a region close to your audience.
3. Copy:
   - Project URL → `VITE_SUPABASE_URL` / `SUPABASE_URL`
   - `anon` `public` key → `VITE_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server only, never expose to browser)

## 2. Run the schema

Open Supabase → SQL Editor → paste and run `backend/sql/001_schema.sql`.

This creates: `inquiries`, `agent_runs`, `chat_messages`, `activity`, `notes`, `rate_limits` + RLS policies.

## 3. Environment variables

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Add the same in Vercel Project Settings → Environment Variables.

## 4. Wire the code

- `src/lib/storage.ts` — dual-write (already in this repo)
- `src/lib/backend-types.ts`
- `src/lib/ai-backend-hook.ts`

Import from `@/lib/storage` (or relative path) in Contact form, Agent Desk, Console, and AI handler.

## Verification

1. Without keys → localStorage only (same as before).
2. With keys → new inquiry appears in Supabase Table Editor → `inquiries`.
3. Agent run appears in `agent_runs`.

## Cost & security

- Service role key: server only.
- Public anon key: safe for browser (RLS limits to INSERT).
- Free Supabase tier is sufficient for portfolio traffic.
