'use client';

import Link from 'next/link';
import { useState } from 'react';
import ShareButton from '@/components/ui/ShareButton';

const NAV_LINKS = [
  { href: '/',       label: '홈' },
  { href: '/about',  label: '소개' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-900">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 shrink-0 bg-gray-900 text-white flex items-center justify-center font-black text-[17px]"
              style={{ letterSpacing: '-0.02em' }}
            >
              <span style={{ display: 'block', transform: 'translateY(-1px)' }}>my</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[17px] font-black text-gray-900 tracking-tight whitespace-nowrap">모모갤러리</span>
              <span
                className="text-[9px] font-bold text-gray-500 whitespace-nowrap"
                style={{ fontFamily: "'Archivo Black', 'Noto Sans KR', sans-serif", letterSpacing: '0.08em' }}
              >
                모든 아이의 모든 예술
              </span>
            </div>
          </Link>

          <nav className="hidden sm:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-[14px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
                {l.label}
              </Link>
            ))}
            <ShareButton />
          </nav>

          <div className="sm:hidden flex items-center gap-2">
            <ShareButton className="text-[11px] px-3 py-1.5" />
            <button className="p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
              <span className={`block w-5 h-[2px] bg-gray-900 transition-all origin-center mb-[5px] ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-5 h-[2px] bg-gray-900 transition-all mb-[5px] ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[2px] bg-gray-900 transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden py-3 border-t border-gray-100">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="block py-3 text-[14px] font-bold text-gray-700 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
