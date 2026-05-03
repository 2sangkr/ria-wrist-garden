'use client';

import Link from 'next/link';
import { useState } from 'react';
import ShareButton from '@/components/ui/ShareButton';

const NAV_LINKS = [
  { href: '/',      label: '홈' },
  { href: '/works', label: '작품 보기' },
  { href: '/about', label: '소개' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3">
            <CrayonLines />
            <span className="text-[17px] font-bold text-gray-900 tracking-tight whitespace-nowrap" style={{ fontFamily: "'Jua', sans-serif" }}>
              <span style={{ display: 'inline-block', background: '#e8312a', color: 'white', padding: '0 5px 1px', borderRadius: '4px', transform: 'rotate(-1.5deg)', fontSize: '1.05em' }}>모</span>든 아이의{' '}
              <span style={{ display: 'inline-block', background: '#1a6fce', color: 'white', padding: '0 5px 1px', borderRadius: '4px', transform: 'rotate(1deg)', fontSize: '1.05em' }}>모</span>든 예술
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                {l.label}
              </Link>
            ))}
            <ShareButton title="모든 아이의 모든 예술" text="아이들의 작품 갤러리를 구경해보세요" />
          </nav>

          <div className="sm:hidden flex items-center gap-2">
            <ShareButton title="모든 아이의 모든 예술" text="아이들의 작품 갤러리를 구경해보세요" className="text-[11px] px-2.5 py-1" />
            <button className="p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
              <span className={`block w-5 h-[1.5px] bg-gray-800 transition-all origin-center mb-[5px] ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-gray-800 transition-all mb-[5px] ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-gray-800 transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden py-3 border-t border-gray-100">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="block py-3 text-[14px] text-gray-700 hover:text-gray-900"
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

function CrayonLines() {
  const lines = [
    { color: '#e8312a', offsets: [0, 2, -1, 3, -2, 1, 2, -1] },
    { color: '#f5c518', offsets: [1, -2, 2, -1, 3, -1, 0, 2] },
    { color: '#1a6fce', offsets: [-1, 3, 0, -2, 1, 2, -1, 3] },
    { color: '#2db35d', offsets: [2, -1, 3, 1, -2, 0, 3, -1] },
  ];
  return (
    <svg width="44" height="34" viewBox="0 0 72 52" fill="none" aria-hidden="true">
      {lines.map((line, li) => {
        const baseY = 7 + li * 13;
        const pts = line.offsets.map((dy, i) => ({ x: i * 10 + 2, y: baseY + dy }));
        const d = pts.reduce((acc, p, i) => {
          if (i === 0) return `M${p.x},${p.y}`;
          const prev = pts[i - 1];
          return acc + ` Q${(prev.x + p.x) / 2},${prev.y} ${p.x},${p.y}`;
        }, '');
        return <path key={li} d={d} stroke={line.color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />;
      })}
    </svg>
  );
}
