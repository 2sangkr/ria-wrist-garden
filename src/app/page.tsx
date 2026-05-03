'use client';

import Link from 'next/link';
import { ARTISTS } from '@/lib/artists';

const BLOB_SHAPES = [
  '60% 40% 55% 45% / 50% 60% 40% 50%',
  '45% 55% 40% 60% / 60% 40% 55% 45%',
  '55% 45% 65% 35% / 40% 60% 50% 50%',
  '40% 60% 50% 50% / 55% 45% 60% 40%',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

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

      {/* ══ 메인 카피 ══ */}
      <section className="py-8 text-center px-4">
        <p
          className="text-[22px] sm:text-[28px] text-gray-800"
          style={{ fontFamily: "'Jua', sans-serif" }}
        >
          손으로 만든 게 제일 힙해요
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
