import Link from 'next/link';
import { ARTISTS } from '@/lib/artists';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── 상단 바 ── */}
      <div className="relative flex items-start justify-between px-8 pt-8 pb-0">

        {/* 좌측 상단: 크레파스 4줄 */}
        <CrayonLines />

        {/* 우측 상단: 꿈꾸는 2Sang */}
        <div className="text-right shrink-0 pl-8">
          <p className="text-[11px] tracking-[0.3em] text-gray-400 uppercase mb-1">dreaming</p>
          <h1
            className="text-[28px] md:text-[36px] font-bold text-gray-800 leading-tight"
            style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
          >
            꿈꾸는 2Sang
          </h1>
        </div>
      </div>

      {/* ── 가운데 메인 텍스트 ── */}
      <div className="flex-1 flex items-center justify-center px-8 py-16 md:py-24">
        <div className="text-center">
          <p
            className="text-[22px] md:text-[36px] lg:text-[44px] font-bold text-gray-800 leading-relaxed"
            style={{ fontFamily: "'Noto Sans KR', sans-serif", wordBreak: 'keep-all' }}
          >
            청소년 작가님들의
            <br />
            작품을 기다립니다.
          </p>
          <p className="mt-5 text-[14px] md:text-[16px] text-gray-400" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            당신의 작품이 여기에 전시됩니다
          </p>
        </div>
      </div>

      {/* ── 하단 작가 그리드 ── */}
      <div className="px-8 pb-16">
        <div className="max-w-2xl mx-auto grid grid-cols-4 gap-6 md:gap-10">
          {ARTISTS.map((artist) => (
            <Link
              key={artist.id}
              href={`/artist/${artist.slug}`}
              className="group flex flex-col items-center gap-3"
            >
              {/* 동그란 얼굴 */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-md transition-transform duration-200 group-hover:scale-110 group-hover:shadow-lg flex items-center justify-center"
                style={{ background: artist.profileColor }}
              >
                {/* 실제 사진이 없으면 이니셜 */}
                <span
                  className="text-[20px] md:text-[24px] font-bold text-white/80 select-none"
                  style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
                >
                  {artist.name[0]}
                </span>
              </div>
              {/* 이름 */}
              <span
                className="text-[12px] md:text-[13px] text-gray-600 group-hover:text-gray-900 transition-colors"
                style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
              >
                {artist.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

/* 크레파스 4줄 SVG 컴포넌트 */
function CrayonLines() {
  const lines = [
    { color: '#e8312a', y: 12,  roughness: [0,3,-2,4,-1,2,0] },
    { color: '#f5c518', y: 36,  roughness: [2,-1,3,0,-3,2,-1] },
    { color: '#1a6fce', y: 60,  roughness: [-1,2,0,3,-2,1,3] },
    { color: '#2db35d', y: 84,  roughness: [1,-3,2,-1,3,0,-2] },
  ];

  return (
    <svg
      width="220"
      height="100"
      viewBox="0 0 220 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-label="크레파스 장식 선"
    >
      {lines.map((line, li) => {
        /* 8개 포인트로 울퉁불퉁한 크레파스 선 생성 */
        const pts = line.roughness.map((dy, i) => ({
          x: i * 30 + 5,
          y: line.y + dy,
        }));

        /* SVG path 문자열 */
        const d = pts.reduce((acc, p, i) => {
          if (i === 0) return `M ${p.x} ${p.y}`;
          const prev = pts[i - 1];
          const cx = (prev.x + p.x) / 2;
          return acc + ` Q ${cx} ${prev.y} ${p.x} ${p.y}`;
        }, '');

        return (
          <path
            key={li}
            d={d}
            stroke={line.color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.88"
          />
        );
      })}
    </svg>
  );
}
