-- Apply only after database + Storage backup, and inspect existing artist/works policies.
begin;
alter table public.works add column if not exists deleted_at timestamptz;
alter table public.works add column if not exists description text not null default '';
create table public.gallery_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
create table public.artist_memberships (
  artist_id text not null references public.artists(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  primary key(artist_id,user_id)
);
create table public.artist_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check(length(name) between 1 and 80),
  bio text not null check(length(bio) between 1 and 2000),
  login_email text not null default '',
  contact_email text not null check(length(contact_email) between 3 and 254),
  referral text not null default '' check(length(referral) <= 200),
  status text not null default 'pending' check(status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  artist_id text references public.artists(id)
);
create function public.set_application_login_email() returns trigger
language plpgsql security definer set search_path='' as $$
begin
  select coalesce(email,'') into new.login_email from auth.users where id=new.user_id;
  return new;
end;
$$;
revoke all on function public.set_application_login_email() from public;
create trigger application_login_email before insert on public.artist_applications
for each row execute function public.set_application_login_email();
create unique index one_pending_application on public.artist_applications(user_id) where status = 'pending';
alter table public.gallery_admins enable row level security;
alter table public.artist_memberships enable row level security;
alter table public.artist_applications enable row level security;
create function public.is_gallery_admin() returns boolean
language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.gallery_admins where user_id = auth.uid());
$$;
create function public.can_manage_artist(target_artist text) returns boolean
language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and (
 public.is_gallery_admin() or exists(
 select 1 from public.artist_memberships where artist_id = target_artist and user_id = auth.uid()));
$$;
revoke all on function public.is_gallery_admin() from public;
revoke all on function public.can_manage_artist(text) from public;
grant execute on function public.is_gallery_admin() to anon, authenticated;
grant execute on function public.can_manage_artist(text) to anon, authenticated;
revoke all on public.gallery_admins, public.artist_memberships, public.artist_applications from anon, authenticated;
grant select on public.gallery_admins, public.artist_memberships, public.artist_applications to authenticated;
grant insert(user_id,name,bio,contact_email,referral) on public.artist_applications to authenticated;
create policy admin_self_read on public.gallery_admins for select to authenticated using(user_id = auth.uid());
create policy memberships_read on public.artist_memberships for select to authenticated using(user_id = auth.uid() or public.is_gallery_admin());
create policy applications_read on public.artist_applications for select to authenticated using(user_id = auth.uid() or public.is_gallery_admin());
create policy applications_insert on public.artist_applications for insert to authenticated with check(user_id = auth.uid() and status = 'pending' and reviewed_at is null and reviewed_by is null and artist_id is null);

-- Replace policies only on the gallery tables. Existing permissive policies must not bypass new checks.
do $$ declare p record; begin
 for p in select schemaname,tablename,policyname from pg_policies where schemaname='public' and tablename in ('artists','works') loop
 execute format('drop policy %I on %I.%I',p.policyname,p.schemaname,p.tablename);
 end loop;
end $$;
alter table public.artists enable row level security;
alter table public.works enable row level security;
revoke all on public.artists, public.works from anon, authenticated;
grant select on public.artists, public.works to anon, authenticated;
grant insert(artist_id,slug,title,image,materials,created_at,age,description) on public.works to authenticated;
grant update(title,image,materials,created_at,age,description,deleted_at) on public.works to authenticated;
grant usage on sequence public.works_id_seq to authenticated;
create policy artists_public_read on public.artists for select to anon, authenticated using(true);
create policy works_read on public.works for select to anon, authenticated using(deleted_at is null or public.can_manage_artist(artist_id));
create policy works_insert on public.works for insert to authenticated with check(public.can_manage_artist(artist_id) and deleted_at is null);
create policy works_update on public.works for update to authenticated using(public.can_manage_artist(artist_id)) with check(public.can_manage_artist(artist_id));
-- No hard DELETE grants or policy for artists.

-- New image keys use artist_id/random-file-name. Existing files remain readable.
create policy gallery_images_insert on storage.objects for insert to authenticated with check(
 bucket_id='works' and public.can_manage_artist((storage.foldername(name))[1])
);
create policy gallery_images_remove on storage.objects for delete to authenticated using(
 bucket_id='works' and public.can_manage_artist((storage.foldername(name))[1])
);
create policy gallery_images_manage_read on storage.objects for select to authenticated using(
 bucket_id='works' and public.can_manage_artist((storage.foldername(name))[1])
);

create function public.review_artist_application(application_id uuid, approve boolean, existing_artist text default null)
returns void language plpgsql security definer set search_path='' as $$
declare application public.artist_applications; new_id text; new_slug text;
begin
 if not public.is_gallery_admin() then raise exception 'Forbidden'; end if;
 select * into application from public.artist_applications where id=application_id and status='pending' for update;
 if not found then raise exception 'No pending application'; end if;
 if approve then
   if existing_artist is not null then
     if not exists(select 1 from public.artists where id=existing_artist) then raise exception 'Unknown artist'; end if;
     new_id := existing_artist;
   else
     new_id := gen_random_uuid()::text;
     new_slug := 'artist-' || new_id;
     insert into public.artists(id,slug,name,tags,bio,profile_color,is_empty,sort_order)
     values(new_id,new_slug,application.name,array[]::text[],application.bio,'#b9d7c5',false,
       (select coalesce(max(sort_order),0)+1 from public.artists));
   end if;
   insert into public.artist_memberships(artist_id,user_id) values(new_id,application.user_id) on conflict do nothing;
 end if;
 update public.artist_applications set status=case when approve then 'approved' else 'rejected' end,
 reviewed_at=now(), reviewed_by=auth.uid(),artist_id=new_id where id=application_id;
end;
$$;
revoke all on function public.review_artist_application(uuid,boolean,text) from public;
grant execute on function public.review_artist_application(uuid,boolean,text) to authenticated;
commit;
