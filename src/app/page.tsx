import Link from 'next/link';
import Image from 'next/image';
import type { Artist } from '@/lib/artists';
import { getAllArtistsWithWorks } from '@/lib/data';
import { ViewTracker } from '@/components/ui/ViewTracker';

export const dynamic = 'force-dynamic';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScpB6jkb5a05_y_p4GsIPSOLZSXWDApX61UBZ44oSTse3oPPg/viewform?usp=header';

const EMPTY_SLOTS: Artist[] = [
  { id: 'empty-1', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: 'empty-2', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
  { id: 'empty-3', slug: '', name: '', tags: [], bio: '', profileColor: '', isEmpty: true },
];

const ARTIST_AVATARS: Record<string, string> = {
  dhee: '/artists/dhee.jpg',
};

const eyebrowFont = { fontFamily: "'Archivo Black', 'Noto Sans KR', sans-serif" };

export default async function HomePage() {
  const realArtists = await getAllArtistsWithWorks();
  const ARTISTS = [...realArtists, ...EMPTY_SLOTS];

  return (
    <div className="min-h-screen bg-white">
      <ViewTracker path="/" />

      {/* ══ 히어로 ══ */}
      <section className="relative w-full h-[420px] sm:h-[520px] md:h-[620px] overflow-hidden bg-gray-900">
        <Image
          src="/images/home-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(15,15,15,0.62) 0%, rgba(15,15,15,0.3) 42%, rgba(15,15,15,0) 62%)' }}
        />
        <div className="relative h-full flex items-center px-5 sm:px-8 md:px-14">
          <div className="max-w-[500px] flex flex-col gap-3 sm:gap-4 md:gap-5">
            <span className="text-[10px] sm:text-[12px] font-bold tracking-[0.2em] text-white" style={eyebrowFont}>
              CHILDREN&#39;S ART PLATFORM
            </span>
            <h1 className="text-[30px] sm:text-[42px] md:text-[52px] font-black text-white leading-[1.18] tracking-tight">
              아이의 상상은,<br />예술이 된다.
            </h1>
            <p className="text-[12px] sm:text-[14px] md:text-[15px] text-white/90 leading-[1.85] max-w-[420px]">
              그림, 핸드메이드 공예, 레고, 종이접기……<br />
              흩어지는 스케치북 대신 디지털 갤러리에 소중히 간직하세요.<br />
              오늘의 낙서가 내일의 멋진 전시회가 됩니다.
            </p>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit bg-white text-gray-900 text-[12px] sm:text-[13px] md:text-[14px] font-black px-5 sm:px-6 py-3 sm:py-3.5 mt-1 hover:opacity-85 transition-opacity"
            >
              작가로 등록하고 나만의 갤러리 시작
            </a>
          </div>
        </div>
      </section>

      {/* ══ 인용구 ══ */}
      <section className="py-14 sm:py-20 md:py-24 px-5 text-center border-b-2 border-gray-900">
        <p className="text-[24px] sm:text-[34px] md:text-[42px] font-black text-gray-900 tracking-tight">
          &ldquo;모든 아이들은 예술가다&rdquo;
        </p>
        <p className="mt-3 text-[13px] sm:text-[16px] md:text-[18px] font-black text-gray-900" style={eyebrowFont}>
          &ldquo;Every child is an artist&rdquo;
        </p>
        <p className="mt-4 text-[11px] sm:text-[13px] font-bold text-gray-500 tracking-wide">
          — 파블로 피카소, 화가 —
        </p>
      </section>

      {/* ══ 소개 ══ */}
      <section className="max-w-[700px] mx-auto px-5 sm:px-8 py-14 sm:py-16 md:py-20 border-b-2 border-gray-900 text-center">
        <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400" style={eyebrowFont}>ABOUT</span>

        <div className="mt-6 space-y-4 text-[15px] sm:text-[18px] md:text-[19px] text-gray-600 leading-[1.75]">
          <p>모모갤러리는 어린 작가들의 공간이에요.</p>
          <p>
            그림이든, 핸드메이드든, 레고든—<br />
            무엇이든 여기서 작품이 됩니다.
          </p>
          <p>
            작가로 등록하면 나만의 갤러리 페이지가 생겨요.<br />
            내 작품을 올리고, 친구들에게 링크를 보내보세요.
          </p>
          <p>
            친구가 내 페이지를 보고 &ldquo;나도 올리고 싶다&rdquo;고 한다면—<br />
            그 친구도 이곳의 작가가 될 수 있어요.
          </p>
          <p>모모갤러리는 지금도 새로운 작가를 기다리고 있어요.</p>
        </div>

        <div className="mt-8">
          <h3 className="text-[15px] font-black text-gray-900 mb-3">작가가 되고 싶다면</h3>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[13px] font-bold text-white bg-gray-900 px-6 py-3 hover:opacity-85 transition-opacity"
          >
            나도 작가 되기 →
          </a>
        </div>
      </section>

      {/* ══ 작가 그리드 ══ */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14 sm:py-20 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b-2 border-gray-900 pb-5 mb-10 sm:mb-14">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400" style={eyebrowFont}>ARTISTS</span>
            <h2 className="mt-1.5 text-[26px] sm:text-[36px] md:text-[42px] font-black text-gray-900">등록 작가</h2>
          </div>
          <span className="text-[12px] sm:text-[13px] text-gray-500 font-medium">
            현재 {realArtists.length}명의 작가가 활동 중입니다
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-7 md:gap-8">
          {ARTISTS.map((artist) => {
            if (artist.isEmpty) {
              return (
                <a
                  key={artist.id}
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center gap-3 aspect-[4/5] border-[1.5px] border-dashed border-gray-300 hover:border-gray-900 transition-colors"
                >
                  <span className="text-[36px] font-light leading-none text-gray-300 group-hover:text-gray-900 transition-colors">+</span>
                  <span className="text-[12px] font-bold text-gray-400">작가 모집 중</span>
                </a>
              );
            }

            const thumb = ARTIST_AVATARS[artist.slug] ?? artist.works?.[0]?.image;

            return (
              <Link key={artist.id} href={`/artist/${artist.slug}`} className="group flex flex-col">
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={artist.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: artist.profileColor }}>
                      <span className="text-[40px] font-black text-white/70 select-none">{artist.name[0]}</span>
                    </div>
                  )}
                </div>
                <h3 className="mt-4 text-[18px] sm:text-[22px] font-black text-gray-900">{artist.name}</h3>
                <p className="mt-1 text-[11px] sm:text-[12px] text-gray-500 font-medium">{artist.tags.join(' ')}</p>
                <span className="mt-3 self-start text-[11px] font-bold border-2 border-gray-900 px-3 py-1.5 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  둘러보기
                </span>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
