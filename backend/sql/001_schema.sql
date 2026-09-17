-- Crystal Studio / Sourav Sarker portfolio backend
-- Run once in Supabase SQL Editor (or via migration tool).
-- Free tier is enough for portfolio traffic.

create extension if not exists "pgcrypto";
create extension if not exists "vector";

create table if not exists public.inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  message       text not null,
  source        text default 'contact',
  status        text not null default 'new'
                check (status in ('new','contacted','qualified','won','lost')),
  meta          jsonb default '{}'::jsonb,
  client_ip     text,
  user_agent    text
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

create table if not exists public.agent_runs (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  agent_id          text not null,
  prompt            text not null,
  specialist_output text,
  critic_output     text,
  tokens_used       int default 0,
  status            text not null default 'completed'
                    check (status in ('pending','running','completed','failed')),
  error_message     text,
  meta              jsonb default '{}'::jsonb
);

create index if not exists agent_runs_created_at_idx on public.agent_runs (created_at desc);
create index if not exists agent_runs_agent_id_idx on public.agent_runs (agent_id);

create table if not exists public.chat_messages (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  session_id    text not null,
  role          text not null check (role in ('user','assistant','system')),
  content       text not null,
  meta          jsonb default '{}'::jsonb
);

create index if not exists chat_messages_session_idx on public.chat_messages (session_id, created_at);

create table if not exists public.activity (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  event_type    text not null,
  message       text not null,
  payload       jsonb default '{}'::jsonb
);

create index if not exists activity_created_at_idx on public.activity (created_at desc);

create table if not exists public.notes (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  title         text not null default '',
  body          text not null default '',
  tags          text[] default '{}'
);

create table if not exists public.rate_limits (
  key           text primary key,
  count         int not null default 0,
  window_start  timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists inquiries_updated_at on public.inquiries;
create trigger inquiries_updated_at
  before update on public.inquiries
  for each row execute function public.set_updated_at();

drop trigger if exists notes_updated_at on public.notes;
create trigger notes_updated_at
  before update on public.notes
  for each row execute function public.set_updated_at();

alter table public.inquiries enable row level security;
alter table public.agent_runs enable row level security;
alter table public.chat_messages enable row level security;
alter table public.activity enable row level security;
alter table public.notes enable row level security;
alter table public.rate_limits enable row level security;

create policy "Public can insert inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

create policy "Public can insert chat messages"
  on public.chat_messages for insert
  to anon, authenticated
  with check (true);

create policy "Public can insert agent runs"
  on public.agent_runs for insert
  to anon, authenticated
  with check (true);
