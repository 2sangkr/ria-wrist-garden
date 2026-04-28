import Link from 'next/link';
import { ARTISTS } from '@/lib/artists';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>

      {/* ══════════════════════════════
          헤더
      ══════════════════════════════ */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* 상단 로고 행 */}
          <div className="flex items-center justify-between py-3">
            {/* 좌측: 크레파스 선 + 로고 */}
            <Link href="/" className="flex items-center gap-3">
              <CrayonLines />
              <div className="leading-tight">
                <div className="text-[11px] tracking-[0.25em] text-gray-400 uppercase">dreaming</div>
                <div className="text-[22px] font-bold text-gray-800 leading-none">꿈꾸는 2Sang</div>
              </div>
            </Link>

            {/* 우측: 아이콘 */}
            <div className="flex items-center gap-4 text-gray-600">
              <Link href="/account/login" aria-label="로그인">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </Link>
              <button aria-label="찜목록">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.5 4 4 7-2.5 4.5-9.5 9-9.5 9z"/>
                </svg>
              </button>
              <Link href="/cart" aria-label="장바구니">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* 네비게이션 */}
          <nav className="flex justify-center gap-8 border-t border-gray-100">
            {[
              { href: '/shop', label: '전체상품' },
              { href: '/shop/new', label: '신상품' },
              { href: '/shop/best', label: '베스트' },
              { href: '/shop/summer', label: '여름시리즈' },
              { href: '/shop/classic', label: '클래식' },
              { href: '/shop/nature', label: '자연시리즈' },
              { href: '/shop/custom', label: '주문제작' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-[13px] font-medium text-gray-700 border-b-2 border-transparent hover:border-gray-800 hover:text-gray-900 transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════
          프로모션 배너
      ══════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-5 pt-6 pb-2">
        <div
          className="w-full rounded-xl overflow-hidden relative flex items-center"
          style={{
            background: 'linear-gradient(135deg, #ffe0ec 0%, #fff0f5 50%, #ffd6e8 100%)',
            minHeight: '200px',
          }}
        >
          {/* 배경 장식 */}
          <div className="absolute top-4 right-8 text-[80px] opacity-10 select-none">🌸</div>
          <div className="absolute bottom-4 right-32 text-[50px] opacity-10 select-none">✿</div>

          <div className="px-10 py-8 relative z-10">
            <p className="text-[12px] tracking-[0.2em] text-pink-400 uppercase mb-2">Spring 2026</p>
            <h2 className="text-[22px] md:text-[28px] font-bold text-gray-800 leading-snug mb-3">
              봄에 만나는<br />
              <span className="text-pink-500">청소년 작가</span> 베스트 작품
            </h2>
            <Link
              href="/shop"
              className="inline-block mt-1 bg-white text-gray-800 text-[12px] font-medium px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              작품 둘러보기 →
            </Link>
          </div>

          {/* 우측 미니 상품 카드 */}
          <div className="hidden md:flex gap-3 absolute right-10 top-1/2 -translate-y-1/2">
            {[
              { bg: 'linear-gradient(135deg,#fcd5ce,#f8a5a0)', label: '팔찌' },
              { bg: 'linear-gradient(135deg,#d5e8fc,#a0c8f8)', label: '일러스트' },
            ].map((item) => (
              <div
                key={item.label}
                className="w-[100px] h-[120px] rounded-lg shadow-md flex items-end justify-center pb-3"
                style={{ background: item.bg }}
              >
                <span className="text-[11px] text-white/80 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          메인 텍스트
      ══════════════════════════════ */}
      <section className="py-10 text-center px-5">
        <p
          className="text-[32px] md:text-[44px] text-gray-800"
          style={{ fontFamily: "'Nanum Brush Script', cursive" }}
        >
          청소년 작가님들의 작품을 기다립니다.
        </p>
      </section>

      {/* ══════════════════════════════
          크리에이터 그리드
      ══════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-5 pb-16">
        <h3 className="text-[15px] font-bold text-gray-800 mb-6 text-center">
          크리에이터의 샵을 둘러보세요!
        </h3>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
          {ARTISTS.map((artist) => (
            <div key={artist.id} className="flex flex-col items-center gap-2 text-center">
              {/* 동그란 프로필 */}
              <Link href={`/artist/${artist.slug}`} className="group">
                <div
                  className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden border-2 border-gray-100 shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-md flex items-center justify-center mx-auto"
                  style={{ background: artist.profileColor }}
                >
                  <span className="text-[28px] md:text-[32px] font-bold text-white/70 select-none">
                    {artist.name[0]}
                  </span>
                </div>
              </Link>

              {/* 이름 */}
              <p className="text-[11px] md:text-[12px] text-gray-600 leading-snug">
                {artist.name}
                {artist.age && <span className="text-gray-400 ml-1">{artist.age}세</span>}
              </p>
              <p className="text-[10px] text-gray-400 leading-snug px-1">{artist.bio}</p>

              {/* 둘러보기 버튼 */}
              <Link
                href={`/artist/${artist.slug}`}
                className="mt-1 text-[11px] border border-gray-300 text-gray-600 px-3 py-1 rounded hover:bg-gray-50 hover:border-gray-400 transition-colors"
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

/* ── 크레파스 4줄 SVG ── */
function CrayonLines() {
  const lines = [
    { color: '#e8312a', offsets: [0, 2, -1, 3, -2, 1, 2, -1] },
    { color: '#f5c518', offsets: [1, -2, 2, -1, 3, -1, 0, 2] },
    { color: '#1a6fce', offsets: [-1, 3, 0, -2, 1, 2, -1, 3] },
    { color: '#2db35d', offsets: [2, -1, 3, 1, -2, 0, 3, -1] },
  ];

  return (
    <svg width="72" height="52" viewBox="0 0 72 52" fill="none" aria-hidden="true">
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
