'use client';
import { createBrowserClient } from '@supabase/ssr';
import { useState } from 'react';
export default function LoginButton({ applying = false }: { applying?: boolean }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function login() {
    setBusy(true); setError('');
    try {
      const client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      const { error } = await client.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/auth/callback' + (applying ? '?next=/my/apply' : '') } });
      if (error) throw error;
    } catch { setError('로그인을 시작하지 못했어요. 잠시 후 다시 시도해 주세요.'); setBusy(false); }
  }
  return <><button onClick={login} disabled={busy} className="w-full bg-gray-900 text-white rounded-xl p-4">{busy ? '연결 중…' : (applying ? 'Google로 로그인하고 신청하기' : 'Google로 로그인')}</button>{error && <p role="alert">{error}</p>}</>;
}

