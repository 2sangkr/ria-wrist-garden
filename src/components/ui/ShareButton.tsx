'use client';

import { useState } from 'react';

type Props = { className?: string; variant?: 'outlined' | 'plain' };

export default function ShareButton({ className = '', variant = 'outlined' }: Props) {
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
      aria-label={copied ? '초대 링크 복사됨' : '갤러리 초대'}
      className={`inline-flex shrink-0 items-center gap-2 text-[13px] font-bold text-gray-900 transition-colors ${variant === 'plain' ? 'min-h-11 rounded-lg px-2 hover:bg-gray-50' : 'border-2 border-gray-900 px-5 py-2.5 hover:bg-gray-900 hover:text-white'} ${className}`}
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>{variant === 'plain' ? '복사됨' : '초대 링크 복사됨'}</span>
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M2 7l10 7 10-7"/>
          </svg>
          <span>{variant === 'plain' ? '초대' : '갤러리 초대'}</span>
        </>
      )}
    </button>
  );
}
