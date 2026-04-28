import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ARTISTS, Artist, formatPrice } from '@/lib/artists';

type Props = { params: Promise<{ slug: string; workSlug: string }> };

export default async function WorkDetailPage({ params }: Props) {
  const { slug, workSlug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);
  if (!artist?.works) notFound();

  const work = artist.works.find((w) => w.slug === workSlug);
  if (!work) notFound();

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>

      {/* 뒤로가기 */}
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 pt-6 pb-2">
        <Link href={`/artist/${slug}`} className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
          ← {artist.name} 작가 페이지로
        </Link>
      </div>

      <div className="max-w-[840px] mx-auto px-4 sm:px-6 pb-20">

        {/* 작품 이미지 */}
        <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mt-4">
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-cover"
            sizes="(max-width: 840px) 100vw, 840px"
            priority
          />
        </div>

        {/* 작가의 한 마디 */}
        <section className="py-10 sm:py-14 text-center px-2">
          <p className="text-[11px] tracking-[0.3em] text-gray-300 uppercase mb-4">작가의 한 마디</p>
          <p
            className="text-[28px] sm:text-[36px] text-gray-800 leading-snug"
            style={{ fontFamily: "'Nanum Brush Script', cursive" }}
          >
            &ldquo;{work.artistMessage}&rdquo;
          </p>
        </section>

        {/* 구분선 — 크레파스 */}
        <CrayonDivider />

        {/* 작가 + 작품 정보 */}
        <section className="mt-10 flex flex-col sm:flex-row gap-10 items-start">

          {/* 작가 아바타 카드 */}
          <ArtistCard artist={artist} slug={slug} />

          {/* 작품 상세 */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] tracking-[0.25em] text-gray-300 uppercase mb-2">Handmade Work</p>
            <h1 className="text-[22px] sm:text-[26px] font-bold text-gray-800 mb-6 leading-snug">
              {work.title}
            </h1>

            {/* 재료 이야기 */}
            <div className="bg-[#fafafa] rounded-2xl p-5 mb-8 border border-gray-100">
              <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-3">재료 이야기</p>
              <p className="text-[14px] text-gray-600 leading-[2]">{work.materialsStory}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {work.materials.map((m) => (
                  <span
                    key={m}
                    className="text-[11px] bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* 가격 + 구매 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-[30px] font-bold text-gray-800">{formatPrice(work.price)}</span>
              </div>
              <p className="text-[12px] text-gray-400 mb-6">
                {work.stock > 0
                  ? `✦ 지금 ${work.stock}개 남아있어요`
                  : '현재 모두 나간 작품이에요'}
              </p>

              {work.stock > 0 ? (
                <button className="w-full sm:w-auto bg-gray-800 text-white text-[14px] font-medium px-8 py-4 rounded-full hover:bg-gray-700 active:scale-95 transition-all">
                  이 작품 데려가기 →
                </button>
              ) : (
                <button
                  disabled
                  className="w-full sm:w-auto bg-gray-100 text-gray-400 text-[14px] font-medium px-8 py-4 rounded-full cursor-not-allowed"
                >
                  현재 품절이에요
                </button>
              )}

              <p className="text-[11px] text-gray-300 mt-4 leading-relaxed">
                직접 제작 문의 →{' '}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScC1hyx1mblspGbI2s-DUxt3P9MIBQOVYAsEAUC50JfwftWqg/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-500 transition-colors"
                >
                  작가에게 물어보기
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── 작가 아바타 카드 ── */
function ArtistCard({ artist, slug }: { artist: Artist; slug: string }) {
  const beads = [
    '#f4c2c2', '#fcd5ce', '#fbb6ce', '#f9a8d4',
    '#fcd5ce', '#f4c2c2', '#fbb6ce', '#fde8e8',
  ];

  return (
    <div className="flex flex-col items-center gap-3 shrink-0 w-full sm:w-[140px]">

      {/* 비즈 오빗 + 블롭 */}
      <div className="relative w-[120px] h-[120px]">

        {/* 공전하는 비즈들 */}
        {beads.map((color, i) => {
          const angle = (i / beads.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const r = 56;
          const x = 60 + r * Math.cos(rad);
          const y = 60 + r * Math.sin(rad);
          return (
            <div
              key={i}
              className="absolute w-[7px] h-[7px] rounded-full"
              style={{
                background: color,
                left: x - 3.5,
                top: y - 3.5,
                opacity: 0.75,
                boxShadow: `0 0 4px ${color}`,
              }}
            />
          );
        })}

        {/* 블롭 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[82px] h-[82px] flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${artist.profileColor}, ${artist.profileColor}bb)`,
            borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
            boxShadow: `0 6px 24px ${artist.profileColor}88`,
          }}
        >
          <span
            style={{
              fontFamily: "'Nanum Brush Script', cursive",
              fontSize: '34px',
              color: 'rgba(255,255,255,0.85)',
              userSelect: 'none',
            }}
          >
            {artist.name[0]}
          </span>
        </div>

        {/* 핸드메이드 스탬프 */}
        <div
          className="absolute bottom-0 right-0 text-[8px] tracking-[0.15em] text-white/80 uppercase font-bold px-2 py-0.5 rounded"
          style={{
            background: `${artist.profileColor}cc`,
            transform: 'rotate(6deg)',
          }}
        >
          handmade
        </div>
      </div>

      <div className="text-center">
        <p className="text-[14px] font-bold text-gray-800">{artist.name}</p>
        <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
          {artist.tags.join(' ')}
        </p>
      </div>

      <Link
        href={`/artist/${slug}`}
        className="text-[11px] border border-gray-200 text-gray-400 px-3 py-1.5 rounded-full hover:border-gray-400 hover:text-gray-600 transition-colors"
      >
        작가 페이지 →
      </Link>
    </div>
  );
}

/* ── 크레파스 구분선 ── */
function CrayonDivider() {
  return (
    <svg width="100%" height="12" viewBox="0 0 400 12" preserveAspectRatio="none" aria-hidden="true">
      {[
        { color: '#e8312a', y: 2 },
        { color: '#f5c518', y: 5 },
        { color: '#1a6fce', y: 8 },
        { color: '#2db35d', y: 11 },
      ].map((l) => (
        <line
          key={l.color}
          x1="0" y1={l.y} x2="400" y2={l.y}
          stroke={l.color} strokeWidth="2" strokeLinecap="round" opacity="0.5"
        />
      ))}
    </svg>
  );
}
