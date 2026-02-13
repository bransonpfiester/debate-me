-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  avatar_color text not null default '#2a5cff',
  elo_rating integer not null default 1500,
  wins integer not null default 0,
  losses integer not null default 0,
  streak integer not null default 0,
  best_streak integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Debates table
create table public.debates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  topic text not null,
  category text not null,
  status text not null default 'active' check (status in ('active', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Rounds table
create table public.rounds (
  id uuid default uuid_generate_v4() primary key,
  debate_id uuid references public.debates(id) on delete cascade not null,
  round_number integer not null check (round_number between 1 and 3),
  user_argument text not null,
  ai_argument text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Votes table
create table public.votes (
  id uuid default uuid_generate_v4() primary key,
  debate_id uuid references public.debates(id) on delete cascade not null,
  voter_id uuid references public.profiles(id) on delete cascade,
  vote_for text not null check (vote_for in ('human', 'ai')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(debate_id, voter_id)
);

-- Badges table
create table public.badges (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_type text not null,
  earned_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Comments table
create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  debate_id uuid references public.debates(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.debates enable row level security;
alter table public.rounds enable row level security;
alter table public.votes enable row level security;
alter table public.badges enable row level security;
alter table public.comments enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Debates policies
create policy "Debates are viewable by everyone"
  on public.debates for select
  using (true);

create policy "Users can create debates"
  on public.debates for insert
  with check (auth.uid() = user_id);

create policy "Users can update own debates"
  on public.debates for update
  using (auth.uid() = user_id);

-- Rounds policies
create policy "Rounds are viewable by everyone"
  on public.rounds for select
  using (true);

create policy "Users can create rounds for their debates"
  on public.rounds for insert
  with check (
    exists (
      select 1 from public.debates
      where id = debate_id and user_id = auth.uid()
    )
  );

-- Votes policies
create policy "Votes are viewable by everyone"
  on public.votes for select
  using (true);

create policy "Authenticated users can vote"
  on public.votes for insert
  with check (auth.uid() = voter_id);

-- Badges policies
create policy "Badges are viewable by everyone"
  on public.badges for select
  using (true);

-- Comments policies
create policy "Comments are viewable by everyone"
  on public.comments for select
  using (true);

create policy "Authenticated users can comment"
  on public.comments for insert
  with check (auth.uid() = user_id);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_color)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    '#' || lpad(to_hex(floor(random() * 16777215)::int), 6, '0')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_profiles_updated_at before update on public.profiles
  for each row execute procedure update_updated_at_column();

create trigger update_debates_updated_at before update on public.debates
  for each row execute procedure update_updated_at_column();
