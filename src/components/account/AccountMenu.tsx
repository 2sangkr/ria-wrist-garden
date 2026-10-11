'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';

export default function AccountMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    let active = true;
    const client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const refresh = () => { void client.auth.getUser().then(({ data }) => {
      if (active) { setUser(data.user); setReady(true); }
    }); };
    refresh(); setOpen(false);
    const { data: { subscription } } = client.auth.onAuthStateChange(() => {
      // Run outside the auth callback's lock.
      queueMicrotask(refresh);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, [pathname]);
  if (!ready) return <span className="inline-block w-10 h-10 rounded-full bg-gray-100 animate-pulse" aria-label="로그인 상태 확인 중" />;
  if (!user) return <Link href="/login" className="text-sm font-bold">로그인</Link>;
  const name = String(user.user_metadata.full_name || user.user_metadata.name || user.email || '계정');
  const rawAvatar = user.user_metadata.avatar_url || user.user_metadata.picture;
  let avatar: string | undefined;
  try { const url = new URL(String(rawAvatar)); if (url.protocol === 'https:' && (url.hostname === 'googleusercontent.com' || url.hostname.endsWith('.googleusercontent.com'))) avatar = url.href; } catch { /* Use an initial when no profile photo is available. */ }
  async function signOut() {
    setBusy(true); setError('');
    const client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { error } = await client.auth.signOut();
    if (error) { setError('로그아웃하지 못했어요. 다시 시도해 주세요.'); setBusy(false); return; }
    setUser(null); setOpen(false); setBusy(false); router.replace('/'); router.refresh();
  }
  return <div className="relative flex items-center gap-4">
    <Link href="/my" className="hidden sm:block text-sm font-bold">내 작품</Link>
    <button onClick={() => setOpen(!open)} aria-label={`로그인 계정: ${user.email ?? name}`} aria-expanded={open} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-900 text-white font-bold flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {avatar ? <img src={avatar} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" /> : name[0]}
    </button>
    <button onClick={signOut} disabled={busy} className="hidden sm:block text-sm text-gray-600">{busy ? '로그아웃 중…' : '로그아웃'}</button>
    {open && <div className="absolute right-0 top-12 w-72 max-w-[85vw] rounded-xl border bg-white shadow-lg p-4 space-y-3 text-gray-900">
      <p className="font-bold truncate">{name}</p><p className="text-sm break-all text-gray-600">{user.email}</p>
      <Link href="/my" className="block font-bold">내 작품 관리</Link>
      <button onClick={signOut} disabled={busy} className="text-sm">{busy ? '로그아웃 중…' : '로그아웃'}</button>
    </div>}
    {error && <p role="alert" className="absolute right-0 top-12 w-72 bg-white p-3 border text-sm">{error}</p>}
  </div>;
}
