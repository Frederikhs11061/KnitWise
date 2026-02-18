-- Kør denne fil i Supabase: SQL Editor → New query → indsæt og Run.

-- Profil (udfyldes ved signup, synkroniseres med auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ønskeliste (hjertemarkering per bruger)
create table if not exists public.wishlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pattern_slug text not null,
  created_at timestamptz default now(),
  unique(user_id, pattern_slug)
);

-- Anmeldelser/kommentarer på opskrifter
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pattern_slug text not null,
  rating smallint not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, pattern_slug)
);

-- Gemte leveringsadresser
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null default 'Hjemme',
  street text not null,
  postal_code text not null,
  city text not null,
  country text not null default 'DK',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Købshistorik (udfyldes ved checkout success når bruger er logget ind)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  stripe_session_id text,
  order_number text not null,
  email text not null,
  total integer not null,
  status text not null default 'completed',
  items jsonb not null default '[]',
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.wishlist enable row level security;
alter table public.reviews enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;

-- Policies: bruger kan kun læse/skrive egne data
create policy "profiles own" on public.profiles for all using (auth.uid() = id);
-- Alle kan læse profilnavne (til visning ved reviews)
create policy "profiles read all" on public.profiles for select using (true);
create policy "wishlist own" on public.wishlist for all using (auth.uid() = user_id);
create policy "reviews own" on public.reviews for all using (auth.uid() = user_id);
create policy "addresses own" on public.addresses for all using (auth.uid() = user_id);
create policy "orders own" on public.orders for all using (auth.uid() = user_id);

-- Alle kan læse reviews (til visning på opskriftsside)
create policy "reviews read all" on public.reviews for select using (true);

-- Trigger: opret profil ved ny bruger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
