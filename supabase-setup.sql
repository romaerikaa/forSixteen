create table if not exists letters (
  id uuid primary key default gen_random_uuid(),
  account_name text not null,
  title text not null,
  text text not null,
  open_date date,
  created_at timestamp with time zone default now() not null
);

create table if not exists gallery_memories (
  id uuid primary key default gen_random_uuid(),
  account_name text not null,
  title text not null,
  caption text,
  image_url text not null,
  created_at timestamp with time zone default now() not null
);

alter table letters add column if not exists account_name text;
alter table gallery_memories add column if not exists account_name text;

alter table letters enable row level security;
alter table gallery_memories enable row level security;

drop policy if exists "Anyone can read letters" on letters;
drop policy if exists "Anyone can save letters" on letters;
drop policy if exists "Anyone can read gallery memories" on gallery_memories;
drop policy if exists "Anyone can save gallery memories" on gallery_memories;

create policy "Anyone can read letters"
on letters for select
to anon
using (true);

create policy "Anyone can save letters"
on letters for insert
to anon
with check (true);

create policy "Anyone can read gallery memories"
on gallery_memories for select
to anon
using (true);

create policy "Anyone can save gallery memories"
on gallery_memories for insert
to anon
with check (true);

grant usage on schema public to anon;
grant select, insert on letters to anon;
grant select, insert on gallery_memories to anon;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "Users can upload gallery photos" on storage.objects;
drop policy if exists "Gallery photos are publicly readable" on storage.objects;

create policy "Anyone can upload gallery photos"
on storage.objects for insert
to anon
with check (bucket_id = 'gallery');

create policy "Gallery photos are publicly readable"
on storage.objects for select
to public
using (bucket_id = 'gallery');
