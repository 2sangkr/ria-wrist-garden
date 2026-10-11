'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function LikeButton({ workId }: { workId: string }) {
 const [count,setCount]=useState(0), [liked,setLiked]=useState(false), [busy,setBusy]=useState(false), [error,setError]=useState('');
 const pending=useRef(false);
 const router=useRouter();
 useEffect(()=>{
  let active=true;
  setCount(0);setLiked(false);setError('');
  fetch('/api/likes?work_id='+encodeURIComponent(workId),{cache:'no-store'})
   .then(async r=>{const d=await r.json();if(!r.ok)throw Error(d.error);if(active){setCount(d.count);setLiked(d.liked);}})
   .catch(()=>{if(active)setError('좋아요를 불러오지 못했어요.');});
  return ()=>{active=false;};
 },[workId]);
 async function toggle(){
  if(pending.current)return;
  pending.current=true;setBusy(true);setError('');
  try {
   const r=await fetch('/api/likes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({work_id:workId,liked:!liked})});
   if(r.status===401){router.push('/login');return;}
   const d=await r.json();if(!r.ok)throw Error(d.error || '좋아요를 저장하지 못했어요.');
   setCount(d.count);setLiked(d.liked);
  }catch(e){setError(e instanceof Error?e.message:'좋아요를 저장하지 못했어요.');}
  finally{pending.current=false;setBusy(false);}
 }
 return <div className="relative"><button type="button" onClick={toggle} disabled={busy} aria-pressed={liked} aria-label={liked?'좋아요 취소':'좋아요'} className="flex min-h-11 min-w-11 items-center justify-center gap-1 text-rose-500 disabled:opacity-50">
  <svg width="22" height="22" viewBox="0 0 24 24" fill={liked?'currentColor':'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
  {count>0&&<span className="text-[13px] font-medium">{count}</span>}
 </button>{error&&<p role="alert" className="absolute right-0 top-full z-10 w-48 rounded-lg border bg-white p-2 text-xs text-gray-600">{error}</p>}</div>;
}
