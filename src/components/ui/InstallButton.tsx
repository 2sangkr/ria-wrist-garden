'use client';

import { useEffect, useRef, useState } from 'react';

interface InstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallButton() {
  const prompt = useRef<InstallPrompt | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)');
    const sync = () => setInstalled(standalone.matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    sync();
    setIos(/iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
    const capture = (event: Event) => {
      event.preventDefault();
      prompt.current = event as InstallPrompt;
    };
    const complete = () => { prompt.current = null; setInstalled(true); dialog.current?.close(); };
    standalone.addEventListener('change', sync);
    window.addEventListener('beforeinstallprompt', capture);
    window.addEventListener('appinstalled', complete);
    return () => {
      standalone.removeEventListener('change', sync);
      window.removeEventListener('beforeinstallprompt', capture);
      window.removeEventListener('appinstalled', complete);
    };
  }, []);

  async function install() {
    const pending = prompt.current;
    if (pending) {
      prompt.current = null;
      try {
        await pending.prompt();
        await pending.userChoice;
        return;
      } catch { /* Offer browser instructions when the prompt is unavailable. */ }
    }
    dialog.current?.showModal();
  }

  if (installed) return null;

  return <>
    <button onClick={install} aria-label="홈 화면에 추가" className="inline-flex shrink-0 items-center gap-1 min-h-11 rounded-lg px-1 sm:px-2 text-[12px] sm:text-[13px] font-bold text-gray-900 hover:bg-gray-50">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5" /></svg>
      <span className="sm:hidden">홈에 추가</span><span className="hidden sm:inline">홈 화면에 추가</span>
    </button>
    <dialog ref={dialog} aria-labelledby="install-title" className="w-[calc(100%-32px)] max-w-sm rounded-xl p-6 text-gray-900 backdrop:bg-black/40" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <h2 id="install-title" className="text-lg font-bold">홈 화면에 추가</h2>
      <p className="mt-3 text-sm leading-7">{ios
        ? 'Safari에서 공유 버튼을 누른 뒤 ‘홈 화면에 추가’를 선택해 주세요.'
        : '브라우저 메뉴에서 ‘홈 화면에 추가’ 또는 ‘앱 설치’를 선택해 주세요. 앱 안에서 열었다면 Chrome이나 Safari로 열어 주세요.'}</p>
      <form method="dialog" className="mt-5 text-right"><button className="min-h-11 rounded-lg bg-gray-900 px-5 text-sm font-bold text-white">확인</button></form>
    </dialog>
  </>;
}
