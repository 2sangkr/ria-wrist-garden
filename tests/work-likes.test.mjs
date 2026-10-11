import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';
test('account likes persist, deduplicate, cancel, and restrict access',async()=>{
 const db=new PGlite();
 const a='00000000-0000-4000-8000-000000000001',b='00000000-0000-4000-8000-000000000002';
 try{
  await db.exec(`create role anon;create role authenticated;create role service_role;create schema auth;
   create table auth.users(id uuid primary key);create table public.works(id integer primary key,deleted_at timestamptz);
   create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
   grant usage on schema auth,public to anon,authenticated;
   insert into auth.users values('${a}'),('${b}');insert into works values(1,null),(2,now());`);
  await db.exec(await readFile(new URL('../supabase/migrations/20261011_work_likes.sql',import.meta.url),'utf8'));
  const role=async(uid)=>{await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[uid]);await db.exec('set role authenticated');};
  const like=async(value)=>(await db.query('select set_work_like(1,$1) as result',[value])).rows[0].result;
  await role(a);assert.deepEqual(await like(true),{count:1,liked:true});assert.deepEqual(await like(true),{count:1,liked:true});
  await db.exec('reset role');assert.equal((await db.query('select count(*)::int as n from work_likes')).rows[0].n,1);
  await role(b);assert.equal((await db.query('select * from work_likes')).rows.length,0);assert.deepEqual(await like(true),{count:2,liked:true});
  await assert.rejects(()=>db.exec(`insert into work_likes(work_id,user_id) values(1,'${a}')`));
  await role(a);assert.deepEqual(await like(false),{count:1,liked:false});assert.deepEqual(await like(false),{count:1,liked:false});
  await assert.rejects(()=>db.query('select set_work_like(2,true)'));
  await db.exec('reset role;set role anon');await assert.rejects(()=>db.query('select set_work_like(1,true)'));await assert.rejects(()=>db.query('select * from work_likes'));
 }finally{await db.close();}
});
