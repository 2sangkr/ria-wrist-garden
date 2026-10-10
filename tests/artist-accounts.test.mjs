import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';
import ts from 'typescript';

test('only existing artists retain registration links after account activation', async () => {
  const source = await readFile(new URL('../src/lib/account-settings.ts', import.meta.url), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
  const settings = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
  const previous = process.env.ARTIST_ACCOUNTS_ENABLED;
  try {
    process.env.ARTIST_ACCOUNTS_ENABLED = 'true';
    for (const slug of ['dhee', 'james', 'emma', 'evan']) assert.equal(settings.legacyUploadAllowed(slug), true);
    assert.equal(settings.legacyUploadAllowed('new-artist'), false);
    process.env.ARTIST_ACCOUNTS_ENABLED = 'false';
    assert.equal(settings.legacyUploadAllowed('new-artist'), true);
  } finally {
    if (previous === undefined) delete process.env.ARTIST_ACCOUNTS_ENABLED;
    else process.env.ARTIST_ACCOUNTS_ENABLED = previous;
  }
});

test('input validation and image content checks', async () => {
  const source = await readFile(new URL('../src/lib/work-validation.ts', import.meta.url), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
  const { workFields, checkedImage } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
  const form = new FormData(); form.set('title','test'); form.set('created_at','2026-10-10'); form.set('age','12');
  assert.equal(workFields(form).age,12);
  form.set('created_at','2026-02-30'); assert.throws(() => workFields(form));
  form.set('created_at','2026-10-10'); form.set('age','NaN'); assert.throws(() => workFields(form));
  await assert.rejects(() => checkedImage(new File(['<svg/>'],'fake.png',{type:'image/png'})));
  await assert.rejects(() => checkedImage(new File([new Uint8Array(10*1024*1024+1)],'large.jpg')));
  assert.equal((await checkedImage(new File([new Uint8Array([255,216,255,224])],'photo.jpg'))).ext,'jpg');
});

test('migration, row-level authorization, approval, and recovery', async t => {
  const db = new PGlite();
  const a='00000000-0000-4000-8000-000000000001', b='00000000-0000-4000-8000-000000000002', admin='00000000-0000-4000-8000-000000000003';
  try {
    await db.exec(`
      create role anon; create role authenticated;
      create schema auth; create schema storage;
      create table auth.users(id uuid primary key,email text);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid; $$;
      grant usage on schema public,auth,storage to anon,authenticated;
      grant execute on function auth.uid() to anon,authenticated;
      create function storage.foldername(name text) returns text[] language sql immutable as $$ select string_to_array(name,'/'); $$;
      create table storage.objects(id uuid default gen_random_uuid() primary key,bucket_id text,name text);
      alter table storage.objects enable row level security;
      grant select,insert,delete on storage.objects to authenticated;
      create table public.artists(id text primary key,slug text unique,name text,tags text[],bio text,profile_color text,is_empty boolean,sort_order int);
      create table public.works(id serial primary key,artist_id text references public.artists(id),slug text,title text,image text,materials text[],created_at date,age int);
      insert into auth.users values ('${a}','a@example.test'),('${b}','b@example.test'),('${admin}','admin@example.test');
      insert into artists values ('1','a','A','{}','','',false,1),('2','b','B','{}','','',false,2);
      insert into works(artist_id,slug,title,image,materials,created_at) values('1','one','A work','/a.png','{}','2026-10-10'),('2','two','B work','/b.png','{}','2026-10-10');
    `);
    await db.exec(await readFile(new URL('../supabase/migrations/20261010_artist_accounts.sql',import.meta.url),'utf8'));
    await db.exec(`insert into artist_memberships values('1','${a}'),('2','${b}'); insert into gallery_admins values('${admin}');`);
    const role = async (name,uid='') => {
      await db.exec('reset role');
      await db.query("select set_config('request.jwt.claim.sub',$1,false)",[uid]);
      await db.exec('set role ' + name);
    };
    await t.test('anonymous can read but cannot insert',async () => {
      await role('anon'); assert.equal((await db.query('select * from works')).rows.length,2);
      await assert.rejects(() => db.exec("insert into works(artist_id,title) values('1','intruder')"));
    });
    await t.test('own edits succeed and foreign edits affect no rows',async () => {
      await role('authenticated',a);
      assert.equal((await db.exec("update works set title='updated' where id=1 returning id"))[0].rows.length,1);
      assert.equal((await db.exec("update works set title='stolen' where id=2 returning id"))[0].rows.length,0);
      await assert.rejects(() => db.exec("insert into works(artist_id,title) values('2','intruder')"));
      await assert.rejects(() => db.exec("update works set artist_id='2' where id=1"));
      await assert.rejects(() => db.exec("delete from works where id=1"));
    });
    await t.test('soft deletion is hidden publicly and recoverable by owner',async () => {
      await role('authenticated',a); await db.exec('update works set deleted_at=now() where id=1');
      assert.equal((await db.query('select * from works where id=1')).rows.length,1);
      await role('anon'); assert.equal((await db.query('select * from works where id=1')).rows.length,0);
      await role('authenticated',b); assert.equal((await db.query('select * from works where id=1')).rows.length,0);
      await role('authenticated',a); await db.exec('update works set deleted_at=null where id=1');
      await role('anon'); assert.equal((await db.query('select * from works where id=1')).rows.length,1);
    });
    await t.test('Storage denies uploads and deletes for other artists',async () => {
      await role('authenticated',a);
      await db.exec("insert into storage.objects(bucket_id,name) values('works','1/photo.jpg')");
      await assert.rejects(() => db.exec("insert into storage.objects(bucket_id,name) values('works','2/photo.jpg')"));
      await assert.rejects(() => db.exec("insert into storage.objects(bucket_id,name) values('other','1/photo.jpg')"));
      await role('authenticated',b);
      assert.equal((await db.exec("delete from storage.objects where name='1/photo.jpg' returning id"))[0].rows.length,0);
      await role('authenticated',a);
      assert.equal((await db.exec("delete from storage.objects where name='1/photo.jpg' returning id"))[0].rows.length,1);
    });
    let applicationId;
    await t.test('applications cannot self-approve or impersonate another user',async () => {
      await role('authenticated',a);
      await assert.rejects(() => db.exec(`insert into artist_applications(user_id,name,bio,contact_email) values('${b}','fake','fake','fake@example.test')`));
      const result=await db.query("insert into artist_applications(user_id,name,bio,contact_email) values($1,'new artist','drawing','contact@example.test') returning id,login_email",[a]);
      applicationId=result.rows[0].id; assert.equal(result.rows[0].login_email,'a@example.test');
      await assert.rejects(() => db.exec("update artist_applications set status='approved'"));
      await assert.rejects(() => db.exec(`insert into gallery_admins values('${a}')`));
      await assert.rejects(() => db.query('select review_artist_application($1,true,null)',[applicationId]));
      await role('authenticated',b); assert.equal((await db.query('select * from artist_applications')).rows.length,0);
    });
    await t.test('administrator approves atomically and duplicate review is rejected',async () => {
      await role('authenticated',admin);
      await db.query('select review_artist_application($1,true,null)',[applicationId]);
      const result=await db.query('select status,artist_id from artist_applications where id=$1',[applicationId]);
      assert.equal(result.rows[0].status,'approved');
      const newArtist=result.rows[0].artist_id;
      await assert.rejects(() => db.query('select review_artist_application($1,true,null)',[applicationId]));
      await role('authenticated',a);
      assert.equal((await db.query('select can_manage_artist($1) as allowed',[newArtist])).rows[0].allowed,true);
      await role('authenticated',b);
      assert.equal((await db.query('select can_manage_artist($1) as allowed',[newArtist])).rows[0].allowed,false);
    });
    await t.test('administrator can explicitly link an existing artist',async () => {
      await role('authenticated',b);
      const result=await db.query("insert into artist_applications(user_id,name,bio,contact_email) values($1,'existing','drawing','b@example.test') returning id",[b]);
      await role('authenticated',admin);
      await db.query("select review_artist_application($1,true,'1')",[result.rows[0].id]);
      await role('authenticated',b);
      assert.equal((await db.query("select can_manage_artist('1') as allowed")).rows[0].allowed,true);
    });
  } finally { await db.close(); }
});

