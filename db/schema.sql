-- Anonymous Life Game / Weekend MVP schema
-- Apply this in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.choices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  worldline_note text,
  created_at timestamptz not null default now()
);

-- Prototype policy: anonymous insert/read is allowed.
-- Before public release, replace this with authenticated Row Level Security.
alter table public.choices enable row level security;

create policy "Allow anonymous read choices"
  on public.choices for select
  to anon
  using (true);

create policy "Allow anonymous insert choices"
  on public.choices for insert
  to anon
  with check (true);
