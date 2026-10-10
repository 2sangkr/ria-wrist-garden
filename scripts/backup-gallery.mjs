import nextEnv from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
nextEnv.loadEnvConfig(process.cwd());
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const root = resolve('private-backups', new Date().toISOString().replaceAll(':','-'));
await mkdir(root, { recursive: true });
const manifest = { created_at: new Date().toISOString(), tables: {}, files: [] };
for (const table of ['artists','works']) {
  const { data, error } = await client.from(table).select('*').order('id');
  if (error) throw new Error('Table backup failed: ' + table);
  await writeFile(resolve(root, table + '.json'), JSON.stringify(data, null, 2));
  manifest.tables[table] = data.length;
}
async function walk(prefix = '') {
  let offset = 0;
  while (true) {
    const { data, error } = await client.storage.from('works').list(prefix, { limit: 100, offset, sortBy: { column:'name', order:'asc' } });
    if (error) throw new Error('Storage listing failed');
    for (const item of data) {
      if (item.name === '.' || item.name === '..' || /[\\/]/.test(item.name)) throw new Error('Invalid storage path');
      const path = prefix ? prefix + '/' + item.name : item.name;
      if (!item.id) { await walk(path); continue; }
      const { data: blob, error: downloadError } = await client.storage.from('works').download(path);
      if (downloadError) throw new Error('Storage download failed');
      const bytes = Buffer.from(await blob.arrayBuffer());
      const destination = resolve(root, 'storage', path);
      if (!destination.startsWith(root + '\\') && !destination.startsWith(root + '/')) throw new Error('Unsafe path');
      await mkdir(resolve(destination, '..'), { recursive:true });
      await writeFile(destination, bytes);
      manifest.files.push({ path, size:bytes.length, sha256:createHash('sha256').update(bytes).digest('hex') });
    }
    if (data.length < 100) break;
    offset += data.length;
  }
}
await walk();
await writeFile(resolve(root, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify({ backup: root, tables:manifest.tables, storage_files:manifest.files.length }));
