alter table public.artists add column if not exists registered_at timestamptz;
alter table public.artists alter column registered_at set default now();
alter table public.works add column if not exists uploaded_at timestamptz;
alter table public.works alter column uploaded_at set default now();
