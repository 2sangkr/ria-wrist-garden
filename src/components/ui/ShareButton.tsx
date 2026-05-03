'use client';

import { useState } from 'react';

type Props = {
  title?: string;
  text?: string;
  className?: string;
};

export default function ShareButton({ title, text, className = '' }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {}
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 text-[12px] text-gray-400 border border-gray-200 px-3 py-1.5 rounded-full hover:border-gray-400 hover:text-gray-700 transition-colors ${className}`}
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>링크 복사됨</span>
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          <span>공유</span>
        </>
      )}
    </button>
  );
}
