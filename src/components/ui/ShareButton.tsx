'use client';

import { useState } from 'react';

type Props = { className?: string };

export default function ShareButton({ className = '' }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    const pageTitle = document.title;

    if (navigator.share) {
      try { await navigator.share({ title: pageTitle, url }); } catch {}
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide text-amber-800 bg-yellow-200/50 px-4 py-1.5 rounded-lg hover:bg-yellow-200/70 transition-colors ${className}`}
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>초대 링크 복사됨</span>
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M2 7l10 7 10-7"/>
          </svg>
          <span>내 전시 초대</span>
        </>
      )}
    </button>
  );
}
