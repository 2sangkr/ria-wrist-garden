'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ARTISTS } from '@/lib/artists';

const BLOB_SHAPES = [
  '60% 40% 55% 45% / 50% 60% 40% 50%',
  '45% 55% 40% 60% / 60% 40% 55% 45%',
  '55% 45% 65% 35% / 40% 60% 50% 50%',
  '40% 60% 50% 50% / 55% 45% 60% 40%',
];

const NAV_LINKS = [
  { href: '/',      label: '홈' },
  { href: '/works', label: '작품 보기' },
  { href: '/about', label: '꿈꾸는 2Sang' },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">

      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-3">
              <CrayonLines />
              <span className="text-[17px] font-bold text-gray-900 tracking-tight">꿈꾸는 2Sang</span>
            </Link>

            <nav className="hidden sm:flex items-center gap-8">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}
                  className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>

            <button className="sm:hidden p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
              <span className={`block w-5 h-[1.5px] bg-gray-800 transition-all origin-center mb-[5px] ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-gray-800 transition-all mb-[5px] ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-gray-800 transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
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

      {/* ══ 분홍 배너 ══ */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-6 pb-2">
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
            <h2 className="text-[18px] sm:text-[22px] md:text-[26px] font-bold text-gray-800 leading-snug mb-3">
              봄에 만나는<br />
              <span className="text-pink-500">청소년 작가</span> 베스트 작품
            </h2>
            <Link
              href="/works"
              className="inline-block bg-white text-gray-800 text-[11px] sm:text-[12px] font-medium px-4 sm:px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              작품 둘러보기 →
            </Link>
          </div>

          {/* PC 미니 카드 */}
          <div className="hidden md:flex gap-3 absolute right-10 top-1/2 -translate-y-1/2">
            {[
              { bg: 'linear-gradient(135deg,#fcd5ce,#f8a5a0)', label: '책갈피' },
              { bg: 'linear-gradient(135deg,#d5e8fc,#a0c8f8)', label: '핸드메이드' },
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

      {/* ══ 2Sang 소개 카드 ══ */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-10 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* 만드는 사람 */}
          <div className="relative rounded-2xl overflow-hidden px-7 py-8"
            style={{ background: '#fff8f7' }}>
            {/* 크레파스 선 — 상단 */}
            <div className="absolute top-0 left-0 right-0 flex h-[5px]">
              <div className="flex-1 bg-[#e8312a] opacity-70" />
              <div className="flex-1 bg-[#f5c518] opacity-70" />
            </div>
            {/* 크레파스 낙서 SVG */}
            <svg className="absolute bottom-4 right-4 opacity-[0.07]"
              width="72" height="72" viewBox="0 0 72 72" fill="none">
              <path d="M8,36 Q18,10 36,8 Q54,6 64,20 Q74,34 60,54 Q46,70 28,64 Q10,58 8,36Z"
                stroke="#e8312a" strokeWidth="6" fill="none" strokeLinecap="round"/>
              <path d="M20,36 Q28,20 36,18 Q50,16 56,28 Q62,40 52,52 Q42,64 30,56 Q18,48 20,36Z"
                stroke="#f5c518" strokeWidth="5" fill="none" strokeLinecap="round"/>
            </svg>

            <p className="text-[10px] tracking-[0.3em] text-[#e8312a] uppercase mb-4 font-medium">만드는 사람</p>
            <p className="text-[18px] sm:text-[20px] font-bold text-gray-900 mb-3 leading-snug">
              작가의 꿈
            </p>
            <p className="text-[13px] text-gray-500 leading-[1.9]">
              스스로 만들고 표현하는 청소년이라면<br />
              누구나 이곳에서 작가가 됩니다.
            </p>
          </div>

          {/* 받는 사람 */}
          <div className="relative rounded-2xl overflow-hidden px-7 py-8"
            style={{ background: '#f7f9ff' }}>
            {/* 크레파스 선 — 상단 */}
            <div className="absolute top-0 left-0 right-0 flex h-[5px]">
              <div className="flex-1 bg-[#1a6fce] opacity-70" />
              <div className="flex-1 bg-[#2db35d] opacity-70" />
            </div>
            {/* 크레파스 낙서 SVG */}
            <svg className="absolute bottom-4 right-4 opacity-[0.07]"
              width="72" height="72" viewBox="0 0 72 72" fill="none">
              <path d="M8,36 Q18,10 36,8 Q54,6 64,20 Q74,34 60,54 Q46,70 28,64 Q10,58 8,36Z"
                stroke="#1a6fce" strokeWidth="6" fill="none" strokeLinecap="round"/>
              <path d="M20,36 Q28,20 36,18 Q50,16 56,28 Q62,40 52,52 Q42,64 30,56 Q18,48 20,36Z"
                stroke="#2db35d" strokeWidth="5" fill="none" strokeLinecap="round"/>
            </svg>

            <p className="text-[10px] tracking-[0.3em] text-[#1a6fce] uppercase mb-4 font-medium">받는 사람</p>
            <p className="text-[18px] sm:text-[20px] font-bold text-gray-900 mb-3 leading-snug">
              보내는 사람의 기쁨
            </p>
            <p className="text-[13px] text-gray-500 leading-[1.9]">
              진심이 담긴 핸드메이드 작품을<br />
              선물하거나 간직할 수 있어요.
            </p>
          </div>

        </div>

        {/* 2Sang 설명 한 줄 */}
        <p className="text-center text-[11px] text-gray-300 mt-3 tracking-wide">
          2Sang — 두 가지 상상이 만나는 곳
        </p>
      </section>

      {/* ══ 브러시 텍스트 ══ */}
      <section className="py-8 text-center px-4">
        <p
          className="text-[22px] sm:text-[28px] text-gray-700"
          style={{ fontFamily: "'Nanum Brush Script', cursive" }}
        >
          청소년 작가님들의 작품을 기다립니다.
        </p>
      </section>

      {/* ══ 작가 그리드 ══ */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 pb-24">
        <p className="text-[12px] tracking-[0.2em] text-gray-400 uppercase mb-10 text-center">creators</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
          {ARTISTS.map((artist, idx) =>
            artist.isEmpty ? (
              <div key={artist.id} className="flex flex-col items-center gap-3 text-center">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScC1hyx1mblspGbI2s-DUxt3P9MIBQOVYAsEAUC50JfwftWqg/viewform?usp=header"
                  target="_blank" rel="noopener noreferrer">
                  <div
                    className="w-[96px] h-[96px] mx-auto flex items-center justify-center transition-transform duration-200 hover:scale-105"
                    style={{ borderRadius: BLOB_SHAPES[idx % BLOB_SHAPES.length], border: '1.5px dashed #d1d5db', background: '#f9fafb' }}
                  >
                    <span className="text-[24px] text-gray-300">+</span>
                  </div>
                </a>
                <p className="text-[12px] text-gray-400">모집 중</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScC1hyx1mblspGbI2s-DUxt3P9MIBQOVYAsEAUC50JfwftWqg/viewform?usp=header"
                  target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-gray-400 border border-dashed border-gray-200 px-3 py-1.5 rounded-full hover:border-gray-400 hover:text-gray-600 transition-colors">
                  참여하기
                </a>
              </div>
            ) : (
              <div key={artist.id} className="flex flex-col items-center gap-3 text-center">
                <Link href={`/artist/${artist.slug}`}>
                  <div
                    className="w-[96px] h-[96px] mx-auto flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                    style={{ background: artist.profileColor, borderRadius: BLOB_SHAPES[idx % BLOB_SHAPES.length] }}
                  >
                    <span className="text-[34px] font-bold text-white/70 select-none">{artist.name[0]}</span>
                  </div>
                </Link>
                <div>
                  <p className="text-[13px] font-medium text-gray-900">{artist.name}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{artist.tags.join(' ')}</p>
                </div>
                <Link href={`/artist/${artist.slug}`}
                  className="text-[11px] text-gray-500 border border-gray-200 px-3 py-1.5 rounded-full hover:border-gray-500 hover:text-gray-800 transition-colors">
                  둘러보기
                </Link>
              </div>
            )
          )}
        </div>
      </section>

    </div>
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
