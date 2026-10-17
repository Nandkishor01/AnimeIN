-- Supabase Migration: 20261017000000_init_awards_schema.sql
-- AnimeIndian Community Awards & Voting Platform Schema

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- 1. AWARDS SEASONS
create table if not exists public.awards_seasons (
  id text primary key,
  name text not null,
  year integer not null unique,
  status text not null check (status in ('draft', 'active', 'closed', 'archived')),
  voting_starts_at timestamptz not null,
  voting_ends_at timestamptz not null,
  results_published_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. AWARDS CATEGORIES
create table if not exists public.awards_categories (
  id text primary key,
  season_id text not null references public.awards_seasons(id) on delete cascade,
  name text not null,
  slug text not null,
  description text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (season_id, slug)
);

-- 3. AWARDS NOMINEES
create table if not exists public.awards_nominees (
  id text primary key,
  category_id text not null references public.awards_categories(id) on delete cascade,
  title text not null,
  subtitle text not null,
  description text not null,
  image_url text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 4. AWARDS VOTES
create table if not exists public.awards_votes (
  id uuid primary key default gen_random_uuid(),
  season_id text not null references public.awards_seasons(id) on delete cascade,
  category_id text not null references public.awards_categories(id) on delete cascade,
  nominee_id text not null references public.awards_nominees(id) on delete cascade,
  user_id text not null,
  ip_hash text,
  created_at timestamptz not null default now(),
  -- Guaranteed database constraint: One eligible vote per user per category per awards season
  constraint unique_user_vote_per_category_season unique (season_id, category_id, user_id)
);

-- 5. AWARDS ADMINS
create table if not exists public.awards_admins (
  user_id text primary key,
  discord_username text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- Indexes for high performance and fast lookups
create index if not exists idx_awards_categories_season on public.awards_categories(season_id, display_order);
create index if not exists idx_awards_nominees_category on public.awards_nominees(category_id, display_order);
create index if not exists idx_awards_votes_lookup on public.awards_votes(season_id, category_id, nominee_id);
create index if not exists idx_awards_votes_user on public.awards_votes(season_id, user_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.awards_seasons enable row level security;
alter table public.awards_categories enable row level security;
alter table public.awards_nominees enable row level security;
alter table public.awards_votes enable row level security;
alter table public.awards_admins enable row level security;

-- Public can read seasons, categories, and nominees
create policy "Public can view awards seasons"
  on public.awards_seasons for select
  using (status in ('active', 'closed', 'archived'));

create policy "Public can view categories"
  on public.awards_categories for select
  using (true);

create policy "Public can view nominees"
  on public.awards_nominees for select
  using (true);

-- Authenticated voters can read ONLY their own votes
create policy "Users can view own votes"
  on public.awards_votes for select
  using (auth.uid()::text = user_id);

-- Authenticated voters can insert their vote if season is active and within voting window
create policy "Users can cast votes during active season"
  on public.awards_votes for insert
  with check (
    auth.uid()::text = user_id
    and exists (
      select 1 from public.awards_seasons s
      where s.id = season_id
      and s.status = 'active'
      and now() >= s.voting_starts_at
      and now() <= s.voting_ends_at
    )
  );

-- Admins policy
create policy "Admins can view and manage admins"
  on public.awards_admins for all
  using (auth.uid()::text in (select user_id from public.awards_admins));

-- Aggregated results function: Exposes vote tallies ONLY after publication time or to admins
create or replace function public.get_awards_results(p_season_id text)
returns table (
  category_id text,
  category_name text,
  category_order integer,
  nominee_id text,
  nominee_title text,
  nominee_subtitle text,
  nominee_image text,
  vote_count bigint,
  rank bigint
)
language plpgsql
security definer
as $$
declare
  v_results_published_at timestamptz;
  v_is_admin boolean;
begin
  -- Check season and publication status
  select results_published_at into v_results_published_at
  from public.awards_seasons
  where id = p_season_id;

  if v_results_published_at is null then
    raise exception 'Season not found: %', p_season_id;
  end if;

  select exists(
    select 1 from public.awards_admins where user_id = auth.uid()::text
  ) into v_is_admin;

  if now() < v_results_published_at and not coalesce(v_is_admin, false) then
    raise exception 'Results for season % are sealed until %', p_season_id, v_results_published_at;
  end if;

  return query
  with vote_counts as (
    select
      n.category_id,
      n.id as nominee_id,
      count(v.id) as votes
    from public.awards_nominees n
    left join public.awards_votes v on v.nominee_id = n.id and v.season_id = p_season_id
    group by n.category_id, n.id
  )
  select
    c.id as category_id,
    c.name as category_name,
    c.display_order as category_order,
    n.id as nominee_id,
    n.title as nominee_title,
    n.subtitle as nominee_subtitle,
    n.image_url as nominee_image,
    coalesce(vc.votes, 0) as vote_count,
    dense_rank() over (partition by c.id order by coalesce(vc.votes, 0) desc) as rank
  from public.awards_categories c
  join public.awards_nominees n on n.category_id = c.id
  left join vote_counts vc on vc.nominee_id = n.id
  where c.season_id = p_season_id
  order by c.display_order asc, rank asc;
end;
$$;
