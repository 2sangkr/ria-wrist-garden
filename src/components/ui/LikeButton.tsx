'use client';

import { useEffect, useState } from 'react';

export default function LikeButton({ workId }: { workId: string }) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!workId) return;
    let vid = localStorage.getItem('vid') ?? '';
    if (!vid) { vid = crypto.randomUUID(); localStorage.setItem('vid', vid); }
    fetch(`/api/likes?work_id=${workId}&visitor_id=${vid}`)
      .then(r => r.json())
      .then(d => { setCount(d.count ?? 0); setLiked(d.liked ?? false); })
      .catch(() => {});
  }, [workId]);

  async function toggle() {
    if (!workId) return;
    let vid = localStorage.getItem('vid') ?? '';
    if (!vid) { vid = crypto.randomUUID(); localStorage.setItem('vid', vid); }
    const prev = { count, liked };
    setCount(liked ? count - 1 : count + 1);
    setLiked(!liked);
    try {
      const r = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ work_id: workId, visitor_id: vid }),
      });
      const d = await r.json();
      setCount(d.count ?? (prev.liked ? prev.count - 1 : prev.count + 1));
      setLiked(d.liked ?? !prev.liked);
    } catch {
      setCount(prev.count);
      setLiked(prev.liked);
    }
  }

  return (
    <button onClick={toggle} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', padding: 0 }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill={liked ? '#f43f5e' : 'white'} stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {count > 0 && <span style={{ fontSize: '13px', fontWeight: 500, color: '#f43f5e' }}>{count}</span>}
    </button>
  );
}
