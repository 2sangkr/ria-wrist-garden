'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ARTISTS } from '@/lib/artists';

const BLOB_SHAPES = [
  '60% 40% 55% 45% / 50% 60% 40% 50%',
  '45% 55% 40% 60% / 60% 40% 55% 45%',
  '55% 45% 65% 35% / 40% 60% 50% 50%',
  '40% 60% 50% 50% / 55% 45% 60% 40%',
  '65% 35% 45% 55% / 45% 55% 40% 60%',
  '50% 50% 60% 40% / 35% 65% 45% 55%',
  '35% 65% 55% 45% / 60% 40% 65% 35%',
  '55% 45% 40% 60% / 50% 50% 55% 45%',
];

const NAV_LINKS = [
  { href: '/',       label: '홈' },
  { href: '/works',  label: '작품 보기' },
  { href: '/about',  label: '꿈꾸는 2Sang' },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>

      {/* ══════════ 헤더 ══════════ */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

          {/* 로고 + 아이콘 행 */}
          <div className="flex items-center justify-between py-3">
            {/* 로고 */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <CrayonLines />
              <div className="leading-tight">
                <div className="text-[10px] sm:text-[11px] tracking-[0.25em] text-gray-400 uppercase">dreaming</div>
                <div className="text-[18px] sm:text-[22px] font-bold text-gray-800 leading-none">꿈꾸는 2Sang</div>
              </div>
            </Link>

            {/* 우측: 아이콘 + 햄버거 */}
            <div className="flex items-center gap-3 sm:gap-4 text-gray-600">
              <Link href="/account/login" aria-label="로그인" className="hover:text-gray-900 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </Link>
              <Link href="/cart" aria-label="장바구니" className="hover:text-gray-900 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </Link>
              {/* 모바일 햄버거 */}
              <button
                className="sm:hidden flex flex-col gap-[5px] p-1"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="메뉴 열기"
              >
                <span className={`block w-5 h-[1.5px] bg-gray-700 transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                <span className={`block w-5 h-[1.5px] bg-gray-700 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-[1.5px] bg-gray-700 transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
              </button>
            </div>
          </div>

          {/* PC 네비 — 가로 스크롤 가능 */}
          <nav className="hidden sm:flex justify-center gap-4 md:gap-8 border-t border-gray-100 overflow-x-auto scrollbar-hide">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-[12px] md:text-[13px] font-medium text-gray-600 border-b-2 border-transparent hover:border-gray-800 hover:text-gray-900 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 모바일 드롭다운 메뉴 */}
          {menuOpen && (
            <div className="sm:hidden border-t border-gray-100 py-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-2 py-3 text-[13px] font-medium text-gray-700 border-b border-gray-50 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ══════════ 배너 ══════════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-5 pb-2">
        <div
          className="w-full rounded-2xl overflow-hidden relative flex items-center"
          style={{
            background: 'linear-gradient(135deg, #ffe0ec 0%, #fff0f5 50%, #ffd6e8 100%)',
            minHeight: '160px',
          }}
        >
          <div className="absolute top-3 right-5 text-[60px] sm:text-[80px] opacity-10 select-none">🌸</div>
          <div className="absolute bottom-3 right-28 text-[36px] sm:text-[50px] opacity-10 select-none">✿</div>

          <div className="px-6 sm:px-10 py-6 sm:py-8 relative z-10">
            <p className="text-[11px] sm:text-[12px] tracking-[0.2em] text-pink-400 uppercase mb-1 sm:mb-2">Spring 2026</p>
            <h2 className="text-[18px] sm:text-[22px] md:text-[28px] font-bold text-gray-800 leading-snug mb-3">
              봄에 만나는<br />
              <span className="text-pink-500">청소년 작가</span> 베스트 작품
            </h2>
            <Link
              href="/shop"
              className="inline-block bg-white text-gray-800 text-[11px] sm:text-[12px] font-medium px-4 sm:px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              작품 둘러보기 →
            </Link>
          </div>

          {/* PC에서만 보이는 미니 카드 */}
          <div className="hidden md:flex gap-3 absolute right-10 top-1/2 -translate-y-1/2">
            {[
              { bg: 'linear-gradient(135deg,#fcd5ce,#f8a5a0)', label: '팔찌' },
              { bg: 'linear-gradient(135deg,#d5e8fc,#a0c8f8)', label: '일러스트' },
            ].map((item) => (
              <div
                key={item.label}
                className="w-[90px] h-[110px] rounded-xl shadow-md flex items-end justify-center pb-3"
                style={{ background: item.bg }}
              >
                <span className="text-[11px] text-white/80 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 메인 텍스트 ══════════ */}
      <section className="py-8 sm:py-10 text-center px-4">
        <p
          className="text-[26px] sm:text-[36px] md:text-[44px] text-gray-800 leading-snug"
          style={{ fontFamily: "'Nanum Brush Script', cursive" }}
        >
          청소년 작가님들의 작품을 기다립니다.
        </p>
      </section>

      {/* ══════════ 크리에이터 그리드 ══════════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-16">
        <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-800 mb-6 sm:mb-8 text-center">
          크리에이터의 샵을 둘러보세요!
        </h3>

        {/* 모바일: 2열 / 태블릿+: 4열 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-6 md:gap-8">
          {ARTISTS.map((artist, idx) => (
            <div key={artist.id} className="flex flex-col items-center gap-2 sm:gap-2 text-center">

              {/* 블롭 아바타 */}
              <Link href={`/artist/${artist.slug}`} className="group">
                <div
                  className="w-[100px] h-[100px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl flex items-center justify-center mx-auto"
                  style={{
                    background: artist.profileColor,
                    borderRadius: BLOB_SHAPES[idx % BLOB_SHAPES.length],
                  }}
                >
                  <span className="text-[36px] sm:text-[32px] md:text-[38px] font-bold text-white/75 select-none">
                    {artist.name[0]}
                  </span>
                </div>
              </Link>

              {/* 이름 */}
              <p className="text-[13px] sm:text-[12px] font-medium text-gray-700 leading-snug">
                {artist.name}
                {artist.age && <span className="text-gray-400 text-[11px] ml-1">{artist.age}세</span>}
              </p>

              {/* 소개 — 모바일에서도 표시, 작게 */}
              <p className="text-[11px] text-gray-400 leading-snug px-1 hidden sm:block">{artist.bio}</p>
              <p className="text-[11px] text-gray-400 leading-snug px-1 sm:hidden">
                {artist.bio.length > 10 ? artist.bio.slice(0, 10) + '…' : artist.bio}
              </p>

              {/* 둘러보기 버튼 */}
              <Link
                href={`/artist/${artist.slug}`}
                className="text-[11px] sm:text-[11px] border border-gray-300 text-gray-600 px-3 sm:px-3 py-1.5 rounded hover:bg-gray-50 hover:border-gray-500 transition-colors"
              >
                둘러보기
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* ── 크레파스 SVG ── */
function CrayonLines() {
  const lines = [
    { color: '#e8312a', offsets: [0, 2, -1, 3, -2, 1, 2, -1] },
    { color: '#f5c518', offsets: [1, -2, 2, -1, 3, -1, 0, 2] },
    { color: '#1a6fce', offsets: [-1, 3, 0, -2, 1, 2, -1, 3] },
    { color: '#2db35d', offsets: [2, -1, 3, 1, -2, 0, 3, -1] },
  ];
  return (
    <svg width="56" height="44" viewBox="0 0 72 52" fill="none" aria-hidden="true">
      {lines.map((line, li) => {
        const baseY = 7 + li * 13;
        const pts = line.offsets.map((dy, i) => ({ x: i * 10 + 2, y: baseY + dy }));
        const d = pts.reduce((acc, p, i) => {
          if (i === 0) return `M${p.x},${p.y}`;
          const prev = pts[i - 1];
          return acc + ` Q${(prev.x + p.x) / 2},${prev.y} ${p.x},${p.y}`;
        }, '');
        return (
          <path key={li} d={d} stroke={line.color} strokeWidth="8"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        );
      })}
    </svg>
  );
}
