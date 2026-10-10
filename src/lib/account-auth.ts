import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { accountsEnabled } from './account-settings';

export async function accountClient() {
  const jar = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: values => { try { values.forEach(({ name, value, options }) => jar.set(name, value, options)); } catch { /* Server Components refresh through middleware. */ } },
    },
  });
}
export async function accountContext(required = false) {
  if (!accountsEnabled()) { if (required) redirect('/login'); return null; }
  const client = await accountClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (!user || error) { if (required) redirect('/login'); return null; }
  return { client, user };
}
export async function canManageArtist(artistId: string) {
  const ctx = await accountContext();
  if (!ctx) return false;
  const { data, error } = await ctx.client.rpc('can_manage_artist', { target_artist: artistId });
  return !error && data === true;
}

