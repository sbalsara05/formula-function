-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Teams
create table if not exists teams (
  id text primary key,
  name text not null,
  short_name text not null,
  country text not null,
  series text[] not null,
  founded integer not null,
  current boolean not null default true,
  entity_color text not null,
  livery_hex text not null,
  bio text not null,
  updated_at timestamptz default now()
);

-- Team stats
create table if not exists team_stats (
  team_id text primary key references teams(id) on delete cascade,
  constructors_titles integer not null default 0,
  drivers_titles integer not null default 0,
  wins integer not null default 0,
  podiums integer not null default 0,
  seasons integer not null default 0,
  first_season integer not null,
  updated_at timestamptz default now()
);

-- Per-year constructor standings (from Jolpica)
create table if not exists constructors_standings (
  id serial primary key,
  constructor_id text not null,
  season integer not null,
  position integer not null,
  points float not null,
  wins integer not null default 0,
  unique(constructor_id, season)
);

-- Drivers
create table if not exists drivers (
  id text primary key,
  name text not null,
  short_name text not null,
  initials text not null,
  nationality text not null,
  dob date not null,
  dod date,
  status text not null check (status in ('active', 'retired', 'deceased')),
  series text[] not null,
  peak_era_team_id text,
  entity_color text not null,
  bio text not null,
  quote text,
  quote_context text,
  updated_at timestamptz default now()
);

-- Driver stats per series
create table if not exists driver_stats (
  driver_id text not null references drivers(id) on delete cascade,
  series text not null check (series in ('f1', 'f2', 'f3')),
  titles integer not null default 0,
  wins integer not null default 0,
  poles integer not null default 0,
  podiums integer not null default 0,
  career_span text not null,
  races_entered integer not null default 0,
  fastest_laps integer,
  points_scored float,
  updated_at timestamptz default now(),
  primary key (driver_id, series)
);

-- Per-year driver standings (from Jolpica)
create table if not exists drivers_standings (
  id serial primary key,
  driver_id text not null,
  season integer not null,
  position integer not null,
  points float not null,
  wins integer not null default 0,
  constructor_id text,
  unique(driver_id, season)
);

-- Race sessions
create table if not exists sessions (
  id text primary key,
  season integer not null,
  round integer not null,
  event_name text not null,
  circuit_id text not null,
  session_type text not null check (session_type in ('race', 'qualifying', 'practice', 'sprint')),
  date date not null,
  openf1_session_key integer
);

-- Lap times
create table if not exists lap_times (
  id serial primary key,
  session_id text not null references sessions(id) on delete cascade,
  driver_id text not null,
  lap_number integer not null,
  time_ms integer,
  sector1_ms integer,
  sector2_ms integer,
  sector3_ms integer,
  team_id text,
  created_at timestamptz default now()
);

-- Venues
create table if not exists venues (
  id text primary key,
  name text not null,
  sub_label text,
  country text not null,
  layout_version text not null,
  length_km float not null,
  corners integer not null,
  elevation_delta_m integer not null,
  f1_since integer not null,
  entity_color text not null,
  entity_color_hex text not null,
  quote text,
  quote_attribution text,
  updated_at timestamptz default now()
);

-- RLS: enable on all tables (service key bypasses these)
alter table teams enable row level security;
alter table team_stats enable row level security;
alter table drivers enable row level security;
alter table driver_stats enable row level security;
alter table sessions enable row level security;
alter table lap_times enable row level security;
alter table venues enable row level security;
alter table constructors_standings enable row level security;
alter table drivers_standings enable row level security;

-- Public read policy (anon key can read)
create policy "Public read teams" on teams for select using (true);
create policy "Public read team_stats" on team_stats for select using (true);
create policy "Public read drivers" on drivers for select using (true);
create policy "Public read driver_stats" on driver_stats for select using (true);
create policy "Public read sessions" on sessions for select using (true);
create policy "Public read venues" on venues for select using (true);
create policy "Public read constructors_standings" on constructors_standings for select using (true);
create policy "Public read drivers_standings" on drivers_standings for select using (true);
