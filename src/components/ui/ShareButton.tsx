'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window { Kakao: any; }
}

const KAKAO_JS_KEY = 'a074a4f8e957124e912520036470fe39';

type Props = { className?: string };

export default function ShareButton({ className = '' }: Props) {
  const [copied, setCopied] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) window.Kakao.init(KAKAO_JS_KEY);
        setKakaoReady(true);
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  async function handleShare() {
    const url = window.location.href;
    const pageTitle = document.title;
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '';

    if (kakaoReady && window.Kakao?.Share) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: pageTitle,
          description: '모든 아이의 모든 예술',
          imageUrl: ogImage,
          link: { mobileWebUrl: url, webUrl: url },
        },
        buttons: [{ title: '보러 가기', link: { mobileWebUrl: url, webUrl: url } }],
      });
      return;
    }

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
