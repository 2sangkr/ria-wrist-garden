'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      const data = await res.json();
      setError(data.error ?? '오류가 발생했어요');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-[320px]">
        <h1
          className="text-[22px] font-bold text-gray-900 mb-1 text-center"
          style={{ fontFamily: "'Jua', sans-serif" }}
        >
          <span style={{ display: 'inline-block', background: '#e8312a', color: 'white', padding: '0 5px 1px', borderRadius: '4px', transform: 'rotate(-1.5deg)' }}>모</span>든 아이의{' '}
          <span style={{ display: 'inline-block', background: '#1a6fce', color: 'white', padding: '0 5px 1px', borderRadius: '4px', transform: 'rotate(1deg)' }}>모</span>든 예술
        </h1>
        <p className="text-[12px] text-gray-400 mb-8 text-center tracking-widest uppercase">admin</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-[12px] text-gray-500 mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-gray-400"
              autoFocus
            />
          </div>
          {error && <p className="text-[12px] text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white text-[13px] font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {loading ? '확인 중…' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
