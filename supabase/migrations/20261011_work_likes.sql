begin;
create table public.work_likes (
 work_id integer not null references public.works(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(), primary key(work_id,user_id)
);
alter table public.work_likes enable row level security;
revoke all on public.work_likes from anon,authenticated;
grant select on public.work_likes to authenticated;
grant all on public.work_likes to service_role;
create policy own_like_read on public.work_likes for select to authenticated using(user_id=auth.uid());
create function public.set_work_like(target_work integer,desired_liked boolean) returns jsonb
language plpgsql security definer set search_path='' as $$
declare actor uuid:=auth.uid(); total bigint;
begin
 if actor is null then raise exception 'Login required'; end if;
 perform 1 from public.works where id=target_work and deleted_at is null for update;
 if not found then raise exception 'Work unavailable'; end if;
 if desired_liked then
  insert into public.work_likes(work_id,user_id) values(target_work,actor) on conflict do nothing;
 else
  delete from public.work_likes where work_id=target_work and user_id=actor;
 end if;
 select count(*) into total from public.work_likes where work_id=target_work;
 return jsonb_build_object('count',total,'liked',desired_liked);
end;
$$;
revoke all on function public.set_work_like(integer,boolean) from public;
grant execute on function public.set_work_like(integer,boolean) to authenticated;
commit;
