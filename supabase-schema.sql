create extension if not exists "pgcrypto";

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'activity-images',
  'activity-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$ begin
  create type public.user_role as enum ('parent', 'vendor', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.record_status as enum ('active', 'pending', 'approved', 'rejected', 'blocked', 'draft', 'cancelled');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.booking_status as enum ('draft', 'pending_payment', 'confirmed', 'cancelled_by_user', 'cancelled_by_vendor', 'cancelled_by_admin', 'refunded', 'failed');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.user_role not null default 'parent',
  status public.record_status not null default 'active',
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  birth_date date,
  age int check (age between 0 and 18),
  gender text,
  interests text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  email text primary key,
  status public.record_status not null default 'active',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

insert into public.admin_users (email, status)
values ('esinaykanat@gmail.com', 'active')
on conflict (email) do update set status = excluded.status;

create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  status public.record_status not null default 'pending',
  city text not null default 'İstanbul',
  district text not null default 'Belirlenecek',
  address text,
  logo_url text,
  commission_rate numeric(5, 4) not null default 0.1200,
  plan_code text not null default 'FREE',
  created_at timestamptz not null default now()
);

alter table public.vendors add column if not exists logo_url text;

create table if not exists public.vendor_users (
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'owner',
  primary key (vendor_id, user_id)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  status public.record_status not null default 'active'
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text not null,
  min_age int not null check (min_age >= 0),
  max_age int not null check (max_age <= 18 and max_age >= min_age),
  activity_type text not null,
  participation_type text not null default 'group' check (participation_type in ('group', 'private')),
  district text not null,
  address text,
  location_query text,
  lat numeric(10, 7),
  lng numeric(10, 7),
  status public.record_status not null default 'pending',
  cancellation_policy text not null default 'Etkinlikten 24 saat öncesine kadar ücretsiz iptal.',
  image_url text,
  gallery_image_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.activities add column if not exists address text;
alter table public.activities add column if not exists location_query text;
alter table public.activities add column if not exists lat numeric(10, 7);
alter table public.activities add column if not exists lng numeric(10, 7);
alter table public.activities add column if not exists image_url text;
alter table public.activities add column if not exists gallery_image_urls text[] not null default '{}';
alter table public.activities add column if not exists participation_type text not null default 'group';
alter table public.activities drop constraint if exists activities_participation_type_check;
alter table public.activities add constraint activities_participation_type_check check (participation_type in ('group', 'private'));

create table if not exists public.activity_sessions (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid not null references public.activities(id) on delete cascade,
  start_at timestamptz not null,
  end_at timestamptz not null,
  capacity int not null check (capacity > 0),
  reserved_count int not null default 0 check (reserved_count >= 0),
  price numeric(12, 2) not null check (price >= 0),
  status public.record_status not null default 'active',
  check (reserved_count <= capacity)
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  session_id uuid not null references public.activity_sessions(id) on delete restrict,
  status public.booking_status not null default 'draft',
  participant_count int not null default 1,
  total_amount numeric(12, 2) not null,
  created_at timestamptz not null default now()
);

create table if not exists public.booking_participants (
  booking_id uuid not null references public.bookings(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  notes text,
  primary key (booking_id, child_id)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  provider text not null,
  amount numeric(12, 2) not null,
  status text not null default 'pending',
  transaction_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  rate numeric(5, 4) not null,
  amount numeric(12, 2) not null,
  status text not null default 'pending'
);

create table if not exists public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  activity_id uuid not null references public.activities(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, activity_id)
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  email text not null,
  role text not null,
  type text not null default 'Destek',
  subject text not null,
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'answered')),
  reply text,
  created_at timestamptz not null default now(),
  answered_at timestamptz
);

create table if not exists public.subscription_plans (
  code text primary key,
  name text not null,
  price numeric(12, 2) not null default 0,
  is_active boolean not null default false
);

create or replace function public.sync_session_reserved_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.activity_sessions s
  set reserved_count = coalesce((
    select sum(b.participant_count)
    from public.bookings b
    where b.session_id = s.id
      and b.status in ('confirmed', 'pending_payment')
  ), 0)
  where s.id = coalesce(new.session_id, old.session_id);

  return coalesce(new, old);
end;
$$;

drop trigger if exists sync_booking_session_reserved on public.bookings;
create trigger sync_booking_session_reserved
after insert or update or delete on public.bookings
for each row execute function public.sync_session_reserved_count();

update public.activity_sessions s
set reserved_count = coalesce((
  select sum(b.participant_count)
  from public.bookings b
  where b.session_id = s.id
    and b.status in ('confirmed', 'pending_payment')
), 0);

insert into public.subscription_plans (code, name, price, is_active)
values
  ('FREE', 'Free', 0, true),
  ('BASIC', 'Basic', 0, false),
  ('PRO', 'Pro', 0, false)
on conflict (code) do update set name = excluded.name, price = excluded.price, is_active = excluded.is_active;

insert into public.categories (name, slug)
values
  ('Oyun grubu', 'oyun-grubu'),
  ('Sanat atölyesi', 'sanat-atolyesi'),
  ('Spor', 'spor'),
  ('Müzik', 'muzik'),
  ('Dans', 'dans'),
  ('Drama', 'drama'),
  ('Müze/gezi', 'muze-gezi'),
  ('Bilim/STEM', 'bilim-stem'),
  ('Doğa', 'doga'),
  ('Ebeveyn-çocuk', 'ebeveyn-cocuk'),
  ('Tatil kampı', 'tatil-kampi'),
  ('Düzenli kurs', 'duzenli-kurs')
on conflict (slug) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.email = coalesce(auth.jwt() ->> 'email', '')
      and au.status = 'active'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_vendor_id uuid;
  vendor_display_name text;
begin
  insert into public.profiles (id, email, full_name, role, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    case
      when new.email = 'esinaykanat@gmail.com' then 'admin'::public.user_role
      when new.raw_user_meta_data ->> 'role' = 'vendor' then 'vendor'::public.user_role
      else 'parent'::public.user_role
    end,
    case when new.raw_user_meta_data ->> 'role' = 'vendor' then 'pending'::public.record_status else 'active'::public.record_status end
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = excluded.full_name,
    role = excluded.role,
    status = excluded.status;

  if new.raw_user_meta_data ->> 'role' = 'vendor' and new.email <> 'esinaykanat@gmail.com' then
    vendor_display_name := coalesce(
      nullif(new.raw_user_meta_data ->> 'vendor_name', ''),
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      split_part(new.email, '@', 1)
    );

    insert into public.vendors (name, slug, status, city, district, commission_rate, plan_code)
    values (
      vendor_display_name,
      lower(regexp_replace(vendor_display_name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(new.id::text, 1, 8),
      'pending',
      'İstanbul',
      'Belirlenecek',
      0.12,
      'FREE'
    )
    on conflict (slug) do update set name = excluded.name
    returning id into new_vendor_id;

    insert into public.vendor_users (vendor_id, user_id, role)
    values (new_vendor_id, new.id, 'owner')
    on conflict (vendor_id, user_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.vendors (name, slug, status, city, district, commission_rate, plan_code)
select
  coalesce(nullif(p.full_name, ''), split_part(p.email, '@', 1)),
  lower(regexp_replace(coalesce(nullif(p.full_name, ''), split_part(p.email, '@', 1)), '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(p.id::text, 1, 8),
  'pending',
  'İstanbul',
  'Belirlenecek',
  0.12,
  'FREE'
from public.profiles p
where p.role = 'vendor'
  and not exists (select 1 from public.vendor_users vu where vu.user_id = p.id)
on conflict (slug) do nothing;

insert into public.vendor_users (vendor_id, user_id, role)
select
  v.id,
  p.id,
  'owner'
from public.profiles p
join public.vendors v on v.slug = lower(regexp_replace(coalesce(nullif(p.full_name, ''), split_part(p.email, '@', 1)), '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(p.id::text, 1, 8)
where p.role = 'vendor'
on conflict (vendor_id, user_id) do nothing;

alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.admin_users enable row level security;
alter table public.vendors enable row level security;
alter table public.vendor_users enable row level security;
alter table public.categories enable row level security;
alter table public.activities enable row level security;
alter table public.activity_sessions enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_participants enable row level security;
alter table public.payments enable row level security;
alter table public.commissions enable row level security;
alter table public.favorites enable row level security;
alter table public.support_tickets enable row level security;
alter table public.subscription_plans enable row level security;

drop policy if exists "profiles self or admin" on public.profiles;
create policy "profiles self or admin" on public.profiles
for select using (id = auth.uid() or public.is_admin());

drop policy if exists "admin users admin access" on public.admin_users;
create policy "admin users admin access" on public.admin_users
for all using (public.is_admin())
with check (public.is_admin());

drop policy if exists "profiles booking vendor read" on public.profiles;
create policy "profiles booking vendor read" on public.profiles
for select using (exists (
  select 1
  from public.bookings b
  join public.activity_sessions s on s.id = b.session_id
  join public.activities a on a.id = s.activity_id
  join public.vendor_users vu on vu.vendor_id = a.vendor_id
  where b.user_id = profiles.id and vu.user_id = auth.uid()
));

drop policy if exists "profiles self insert" on public.profiles;
create policy "profiles self insert" on public.profiles
for insert with check (id = auth.uid() and (role <> 'admin' or email = 'esinaykanat@gmail.com'));

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
for update using (id = auth.uid() or public.is_admin())
with check (public.is_admin() or (id = auth.uid() and (role <> 'admin' or email = 'esinaykanat@gmail.com')));

drop policy if exists "children owner access" on public.children;
create policy "children owner access" on public.children
for all using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "children booking vendor read" on public.children;
create policy "children booking vendor read" on public.children
for select using (exists (
  select 1
  from public.booking_participants bp
  join public.bookings b on b.id = bp.booking_id
  join public.activity_sessions s on s.id = b.session_id
  join public.activities a on a.id = s.activity_id
  join public.vendor_users vu on vu.vendor_id = a.vendor_id
  where bp.child_id = children.id and vu.user_id = auth.uid()
));

drop policy if exists "public approved vendors" on public.vendors;
create policy "public approved vendors" on public.vendors
for select using (status = 'approved' or public.is_admin() or exists (
  select 1 from public.vendor_users vu where vu.vendor_id = vendors.id and vu.user_id = auth.uid()
));

drop policy if exists "vendors owner insert" on public.vendors;
create policy "vendors owner insert" on public.vendors
for insert with check (auth.uid() is not null);

drop policy if exists "vendors owner update" on public.vendors;
create policy "vendors owner update" on public.vendors
for update using (public.is_admin() or exists (
  select 1 from public.vendor_users vu where vu.vendor_id = vendors.id and vu.user_id = auth.uid()
));

drop policy if exists "vendor users self or admin" on public.vendor_users;
create policy "vendor users self or admin" on public.vendor_users
for all using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "categories readable" on public.categories;
create policy "categories readable" on public.categories
for select using (status = 'active' or public.is_admin());

drop policy if exists "activities public approved" on public.activities;
create policy "activities public approved" on public.activities
for select using (status = 'approved' or public.is_admin() or exists (
  select 1 from public.vendor_users vu where vu.vendor_id = activities.vendor_id and vu.user_id = auth.uid()
));

drop policy if exists "activities vendor create" on public.activities;
create policy "activities vendor create" on public.activities
for insert with check (public.is_admin() or exists (
  select 1 from public.vendor_users vu where vu.vendor_id = activities.vendor_id and vu.user_id = auth.uid()
));

drop policy if exists "activities vendor update" on public.activities;
create policy "activities vendor update" on public.activities
for update using (public.is_admin() or exists (
  select 1 from public.vendor_users vu where vu.vendor_id = activities.vendor_id and vu.user_id = auth.uid()
));

drop policy if exists "activities vendor delete" on public.activities;
create policy "activities vendor delete" on public.activities
for delete using (public.is_admin() or exists (
  select 1 from public.vendor_users vu where vu.vendor_id = activities.vendor_id and vu.user_id = auth.uid()
));

drop policy if exists "sessions readable" on public.activity_sessions;
create policy "sessions readable" on public.activity_sessions
for select using (true);

drop policy if exists "sessions vendor write" on public.activity_sessions;
create policy "sessions vendor write" on public.activity_sessions
for all using (public.is_admin() or exists (
  select 1
  from public.activities a
  join public.vendor_users vu on vu.vendor_id = a.vendor_id
  where a.id = activity_sessions.activity_id and vu.user_id = auth.uid()
))
with check (public.is_admin() or exists (
  select 1
  from public.activities a
  join public.vendor_users vu on vu.vendor_id = a.vendor_id
  where a.id = activity_sessions.activity_id and vu.user_id = auth.uid()
));

drop policy if exists "bookings owner vendor admin" on public.bookings;
create policy "bookings owner vendor admin" on public.bookings
for select using (user_id = auth.uid() or public.is_admin() or exists (
  select 1
  from public.activity_sessions s
  join public.activities a on a.id = s.activity_id
  join public.vendor_users vu on vu.vendor_id = a.vendor_id
  where s.id = bookings.session_id and vu.user_id = auth.uid()
));

drop policy if exists "bookings parent create" on public.bookings;
create policy "bookings parent create" on public.bookings
for insert with check (user_id = auth.uid());

drop policy if exists "bookings owner cancel" on public.bookings;
create policy "bookings owner cancel" on public.bookings
for update using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "booking participants owner access" on public.booking_participants;
create policy "booking participants owner access" on public.booking_participants
for all using (public.is_admin() or exists (
  select 1 from public.bookings b where b.id = booking_participants.booking_id and b.user_id = auth.uid()
))
with check (public.is_admin() or exists (
  select 1 from public.bookings b where b.id = booking_participants.booking_id and b.user_id = auth.uid()
));

drop policy if exists "booking participants vendor read" on public.booking_participants;
create policy "booking participants vendor read" on public.booking_participants
for select using (exists (
  select 1
  from public.bookings b
  join public.activity_sessions s on s.id = b.session_id
  join public.activities a on a.id = s.activity_id
  join public.vendor_users vu on vu.vendor_id = a.vendor_id
  where b.id = booking_participants.booking_id and vu.user_id = auth.uid()
));

drop policy if exists "favorites owner access" on public.favorites;
create policy "favorites owner access" on public.favorites
for all using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "favorites vendor admin read" on public.favorites;
create policy "favorites vendor admin read" on public.favorites
for select using (public.is_admin() or exists (
  select 1
  from public.activities a
  join public.vendor_users vu on vu.vendor_id = a.vendor_id
  where a.id = favorites.activity_id and vu.user_id = auth.uid()
));

drop policy if exists "support tickets owner admin read" on public.support_tickets;
create policy "support tickets owner admin read" on public.support_tickets
for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "support tickets owner create" on public.support_tickets;
create policy "support tickets owner create" on public.support_tickets
for insert with check (user_id = auth.uid());

drop policy if exists "support tickets admin answer" on public.support_tickets;
create policy "support tickets admin answer" on public.support_tickets
for update using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admin payments" on public.payments;
create policy "admin payments" on public.payments
for all using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admin commissions" on public.commissions;
create policy "admin commissions" on public.commissions
for all using (public.is_admin())
with check (public.is_admin());

drop policy if exists "plans readable" on public.subscription_plans;
create policy "plans readable" on public.subscription_plans
for select using (true);

drop policy if exists "activity images public read" on storage.objects;
create policy "activity images public read" on storage.objects
for select using (bucket_id = 'activity-images');

drop policy if exists "activity images authenticated upload" on storage.objects;
create policy "activity images authenticated upload" on storage.objects
for insert to authenticated
with check (bucket_id = 'activity-images');

drop policy if exists "activity images authenticated update" on storage.objects;
create policy "activity images authenticated update" on storage.objects
for update to authenticated
using (bucket_id = 'activity-images')
with check (bucket_id = 'activity-images');

drop policy if exists "activity images authenticated delete" on storage.objects;
create policy "activity images authenticated delete" on storage.objects
for delete to authenticated
using (bucket_id = 'activity-images');
