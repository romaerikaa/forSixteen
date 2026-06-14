create table if not exists letters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  text text not null,
  open_date date,
  created_at timestamp with time zone default now() not null
);

create table if not exists gallery_memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  caption text,
  image_url text not null,
  created_at timestamp with time zone default now() not null
);

alter table letters enable row level security;
alter table gallery_memories enable row level security;

create policy "Users can read their own letters"
on letters for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own letters"
on letters for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can read their own gallery memories"
on gallery_memories for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own gallery memories"
on gallery_memories for insert
to authenticated
with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

create policy "Users can upload gallery photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'gallery'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Gallery photos are publicly readable"
on storage.objects for select
to public
using (bucket_id = 'gallery');
