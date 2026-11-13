'use client';

import { useEffect, useRef, useState } from 'react';

interface InstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallButton() {
  const prompt = useRef<InstallPrompt | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [showTip, setShowTip] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)');
    const sync = () => setInstalled(standalone.matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    sync();
    setShowTip(true);
    setIos(/iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
    const capture = (event: Event) => {
      event.preventDefault();
      prompt.current = event as InstallPrompt;
      setCanInstall(true);
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
    setShowTip(false);
    const pending = prompt.current;
    if (pending) {
      prompt.current = null;
      setCanInstall(false);
      dialog.current?.close();
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
    <div className="relative">
    <button onClick={install} aria-label="홈 화면에 추가하기" className="inline-flex shrink-0 items-center gap-1 min-h-11 rounded-lg px-1 sm:px-2 text-[12px] sm:text-[13px] font-bold text-gray-900 hover:bg-gray-50">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5" /></svg>
      <span>홈</span>
    </button>
    {showTip && <div className="absolute right-0 top-full mt-2 flex w-max max-w-[240px] items-center rounded-lg bg-gray-900 text-white shadow-lg">
      <span aria-hidden="true" className="absolute right-4 -top-1.5 h-3 w-3 rotate-45 bg-gray-900" />
      <button onClick={install} className="relative min-h-11 px-3 text-[13px] font-bold">홈 화면에 추가하기</button>
      <button onClick={() => setShowTip(false)} aria-label="홈 화면 추가 안내 닫기" className="relative min-h-11 min-w-11 text-lg">×</button>
    </div>}
    </div>
    <dialog ref={dialog} aria-labelledby="install-title" className="w-[calc(100%-32px)] max-w-sm rounded-xl p-6 text-gray-900 backdrop:bg-black/40" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <h2 id="install-title" className="text-lg font-bold">홈 화면에 추가하기</h2>
      <p className="mt-3 text-sm leading-7">{ios
        ? 'Safari에서 공유 버튼을 누른 뒤 ‘홈 화면에 추가’를 선택해 주세요.'
        : '네이버 등 앱 안에서 보고 있다면 메뉴의 ‘다른 브라우저로 열기’로 Chrome에서 열어 주세요. Chrome 메뉴에서 ‘홈 화면에 추가’ 또는 ‘앱 설치’를 선택해 주세요.'}</p>
      <div className="mt-5 flex justify-end gap-2">
        {canInstall && <button onClick={install} className="min-h-11 rounded-lg bg-gray-900 px-5 text-sm font-bold text-white">홈 화면에 추가하기</button>}
      <form method="dialog"><button className="min-h-11 rounded-lg bg-gray-100 px-5 text-sm font-bold text-gray-900">닫기</button></form>
      </div>
    </dialog>
  </>;
}
