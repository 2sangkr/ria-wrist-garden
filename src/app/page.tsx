import Link from 'next/link';
import type { Artist } from '@/lib/artists';
import { getArtists, getWorksByTitles } from '@/lib/data';

export const dynamic = 'force-dynamic';

const EMPTY_SLOTS: Artist[] = [
  { id: 'empty-1', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: 'empty-2', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: 'empty-3', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
];

const BLOB_SHAPES = [
  '60% 40% 55% 45% / 50% 60% 40% 50%',
  '45% 55% 40% 60% / 60% 40% 55% 45%',
  '55% 45% 65% 35% / 40% 60% 50% 50%',
  '40% 60% 50% 50% / 55% 45% 60% 40%',
];

const ROTATIONS = ['-2deg', '1.5deg', '-1deg', '2deg', '1deg', '-1.5deg', '2deg', '-0.5deg'];

const ARTIST_AVATARS: Record<string, string> = {
  dhee: '/artists/dhee.jpg',
};

const SHOWCASE_TITLES = [
  '숲의 반짝임',
  'HARIBO',
  '사무라이',
  '맛있겠다',
  '추워도 오로라',
  '이모지 얼굴들',
  '네잎크로버(핑크)',
  '펜 드로잉',
];

function FrameWithPhoto({ src, rotation, idx }: { src: string; rotation: string; idx: number }) {
  const clipId = `mat-${idx}`;
  // 매트보드 영역
  const matX = 9, matY = 15, matW = 92, matH = 86;
  // 1.55배 줌인 — 중앙 기준으로 확대 후 clipPath로 크롭
  const zoom = 1.55;
  const imgW = matW * zoom;
  const imgH = matH * zoom;
  const imgX = (matX + matW / 2) - imgW / 2;
  const imgY = (matY + matH / 2) - imgH / 2;
  return (
    <div style={{ width: '110px', height: '110px', transform: `rotate(${rotation})` }}>
      <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <clipPath id={clipId}>
            <rect x={matX} y={matY} width={matW} height={matH} />
          </clipPath>
        </defs>
        <rect x="5" y="13" width="103" height="97" rx="2" fill="rgba(0,0,0,0.22)" />
        <line x1="34" y1="4" x2="76" y2="4" stroke="#b8a070" strokeWidth="1.3" />
        <circle cx="55" cy="5" r="3" fill="#9E7850" />
        <rect x="2" y="8" width="106" height="100" rx="2" fill="#7A5220" />
        <rect x="4" y="10" width="102" height="96" rx="1" fill="#D4A843" />
        <rect x="7" y="13" width="96" height="90" rx="1" fill="#8B6014" />
        <rect x={matX} y={matY} width={matW} height={matH} fill="#FAF7EE" />
        <image
          href={src}
          x={imgX}
          y={imgY}
          width={imgW}
          height={imgH}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
          imageRendering="optimizeQuality"
          style={{ imageRendering: 'smooth' }}
        />
      </svg>
    </div>
  );
}

export default async function HomePage() {
  const [realArtists, latestWorks] = await Promise.all([getArtists(), getWorksByTitles(SHOWCASE_TITLES)]);
  const ARTISTS = [...realArtists, ...EMPTY_SLOTS];
  return (
    <div className="min-h-screen bg-white">

      {/* ══ 분홍 배너 ══ */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-6 pb-2">
        <div
          className="w-full rounded-2xl overflow-hidden relative flex items-center"
          style={{
            background: 'linear-gradient(135deg, #ffe0ec 0%, #fff0f5 50%, #ffd6e8 100%)',
            minHeight: '260px',
          }}
        >
          <div className="absolute top-3 right-5 text-[70px] sm:text-[100px] opacity-10 select-none">🌸</div>
          <div className="absolute bottom-3 right-32 text-[40px] sm:text-[60px] opacity-10 select-none">✿</div>

          <div className="flex items-center justify-between w-full">
            {/* 텍스트 영역 */}
            <div className="px-7 sm:px-12 py-7 sm:py-9 relative z-10 flex-1 min-w-0">
              <p className="text-[11px] tracking-[0.25em] text-pink-400 uppercase mb-2"
                style={{ fontFamily: 'Georgia, serif' }}>Momo Gallery</p>
              <h2
                className="text-[22px] sm:text-[28px] md:text-[34px] text-gray-800 leading-snug mb-3 whitespace-nowrap"
                style={{
                  fontFamily: "'Nanum Brush Script', cursive",
                  filter: 'drop-shadow(0 0 0.8px rgba(0,0,0,0.28))',
                  WebkitTextStroke: '0.3px rgba(0,0,0,0.12)',
                }}
              >
                아이의 상상을 <span className="text-pink-500" style={{ WebkitTextStroke: '0.3px rgba(219,39,119,0.3)' }}>영원한 기록으로</span>
              </h2>
              <p className="text-[12px] sm:text-[13px] text-gray-500 leading-[1.9] mb-1 max-w-[420px]"
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                그림, 핸드메이드 공예, 레고, 종이접기……
              </p>
              <p className="text-[12px] sm:text-[13px] text-gray-500 leading-[1.9] mb-5 max-w-[420px]"
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                흩어지는 스케치북 대신<br />
                디지털 갤러리에 소중히 간직하세요.<br />
                오늘의 낙서가 내일의 멋진 전시회가 됩니다.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScpB6jkb5a05_y_p4GsIPSOLZSXWDApX61UBZ44oSTse3oPPg/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-gray-800 text-[11px] sm:text-[12px] font-medium px-4 sm:px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                작가로 등록하고 나만의 갤러리 시작
              </a>
            </div>

            {/* 4x2 실제 작품 액자 */}
            {latestWorks.length > 0 && (
              <div className="hidden md:grid grid-cols-4 gap-2 pr-8 py-6 flex-shrink-0">
                {latestWorks.map((work, i) => (
                  <FrameWithPhoto
                    key={work.id}
                    src={work.image}
                    rotation={ROTATIONS[i % ROTATIONS.length]}
                    idx={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ 메인 카피 ══ */}
      <section className="py-10 sm:py-14 text-center px-4">
        <div className="max-w-[560px] mx-auto">
          <p
            className="text-[30px] sm:text-[40px] text-gray-800 leading-tight"
            style={{ fontFamily: "'Nanum Brush Script', cursive" }}
          >
            모든 아이들은 예술가다.
          </p>
          <p
            className="text-[14px] sm:text-[17px] text-gray-400 mt-1.5 italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Every child is an artist.
          </p>
          <p className="text-[12px] text-gray-500 mt-2 tracking-[0.15em] font-medium">— 파블로 피카소 —</p>
        </div>
      </section>

      {/* ══ 작가 그리드 ══ */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 pb-24">
        <p className="text-[12px] tracking-[0.2em] text-gray-400 uppercase mb-10 text-center">creators</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
          {ARTISTS.map((artist, idx) =>
            artist.isEmpty ? (
              <div key={artist.id} className="flex flex-col items-center gap-3 text-center">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScpB6jkb5a05_y_p4GsIPSOLZSXWDApX61UBZ44oSTse3oPPg/viewform?usp=header"
                  target="_blank" rel="noopener noreferrer">
                  <div
                    className="w-[96px] h-[96px] mx-auto flex items-center justify-center transition-transform duration-200 hover:scale-105"
                    style={{ borderRadius: BLOB_SHAPES[idx % BLOB_SHAPES.length], border: '1.5px dashed #d1d5db', background: '#f9fafb' }}
                  >
                    <span className="text-[24px] text-gray-300">+</span>
                  </div>
                </a>
                <p className="text-[12px] text-gray-400">작가 모집 중</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScpB6jkb5a05_y_p4GsIPSOLZSXWDApX61UBZ44oSTse3oPPg/viewform?usp=header"
                  target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-gray-400 border border-dashed border-gray-200 px-3 py-1.5 rounded-full hover:border-gray-400 hover:text-gray-600 transition-colors">
                  나도 작가 되기
                </a>
              </div>
            ) : (
              <div key={artist.id} className="flex flex-col items-center gap-3 text-center">
                <Link href={`/artist/${artist.slug}`}>
                  <div
                    className="w-[96px] h-[96px] mx-auto flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md overflow-hidden"
                    style={{ background: artist.profileColor, borderRadius: BLOB_SHAPES[idx % BLOB_SHAPES.length] }}
                  >
                    {ARTIST_AVATARS[artist.slug] ? (
                      <img src={ARTIST_AVATARS[artist.slug]} alt={artist.name} className="w-[130%] h-[130%] object-cover object-center" style={{ marginTop: '-8px' }} />
                    ) : (
                      <span className="text-[34px] font-bold text-white/70 select-none">{artist.name[0]}</span>
                    )}
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
