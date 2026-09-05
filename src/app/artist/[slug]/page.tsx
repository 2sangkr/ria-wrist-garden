import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Work } from '@/lib/artists';
import { getArtistWithWorks } from '@/lib/data';
import ArtistGallery from './ArtistGallery';
import { ViewTracker } from '@/components/ui/ViewTracker';
import ShareButton from '@/components/ui/ShareButton';

const eyebrowFont = { fontFamily: "'Archivo Black', 'Noto Sans KR', sans-serif" };

export const dynamic = 'force-dynamic';

const ARTIST_AVATARS: Record<string, string> = {
  dhee: '/artists/dhee.jpg',
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const artist = await getArtistWithWorks(slug);
  if (!artist) return { title: '작가 갤러리' };
  const firstWork = artist.works?.[0];
  const description = `${artist.name}의 온라인 갤러리. ${artist.tags.join(', ')} 작품 ${artist.works?.length ?? 0}점을 만나보세요.`;
  return {
    title: `${artist.name} 갤러리`,
    description,
    keywords: [artist.name, ...artist.tags, '어린이 작가', '모모갤러리', '어린이 갤러리'],
    openGraph: {
      type: 'profile',
      title: `${artist.name} — 모모갤러리`,
      description,
      url: `https://mymomo.gallery/artist/${slug}`,
      images: firstWork ? [{ url: firstWork.image, alt: `${artist.name}의 작품` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artist.name} — 모모갤러리`,
      description,
      images: firstWork ? [firstWork.image] : [],
    },
    alternates: {
      canonical: `https://mymomo.gallery/artist/${slug}`,
    },
  };
}

function groupByYear(works: Work[]): { label: string; works: Work[] }[] {
  const map = new Map<string, { year: number; age?: number; works: Work[] }>();
  for (const work of works) {
    const year = work.created_at.slice(0, 4);
    if (!map.has(year)) map.set(year, { year: Number(year), age: work.age, works: [] });
    map.get(year)!.works.push(work);
  }
  return Array.from(map.values())
    .sort((a, b) => b.year - a.year)
    .map(({ year, age, works }) => ({
      label: age !== undefined ? `${age}살 · ${year}` : `${year}`,
      works,
    }));
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = await getArtistWithWorks(slug);
  if (!artist) notFound();

  const works = [...(artist.works ?? [])].sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  );
  const groups = groupByYear(works);

  const activeSinceYear = works.length > 0
    ? Math.min(...works.map((w) => Number(w.created_at.slice(0, 4))))
    : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `${artist.name} 갤러리`,
    url: `https://mymomo.gallery/artist/${artist.slug}`,
    mainEntity: {
      '@type': 'Person',
      name: artist.name,
      description: artist.bio,
      knowsAbout: artist.tags,
      url: `https://mymomo.gallery/artist/${artist.slug}`,
    },
    hasPart: works.map((w) => ({
      '@type': 'VisualArtwork',
      name: w.title,
      image: w.image,
      url: `https://mymomo.gallery/artist/${artist.slug}/${w.slug}`,
      artMedium: w.materials.join(', '),
      creator: { '@type': 'Person', name: artist.name },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <ViewTracker path={`/artist/${artist.slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 작가 히어로 */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-6">
        <Link href="/" className="text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
          &larr; 모모갤러리
        </Link>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-8 pb-14 sm:pb-20 border-b-2 border-gray-900">
        <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-14">
          <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-5 min-w-0">
            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400" style={eyebrowFont}>ARTIST</span>
            <h1 className="text-[48px] sm:text-[64px] md:text-[80px] font-black text-gray-900 leading-none tracking-tight">
              {artist.name}
            </h1>
            <div className="flex gap-2 flex-wrap">
              {artist.tags.map((tag) => (
                <span key={tag} className="text-[12px] font-bold border-[1.5px] border-gray-900 px-3 py-1">{tag}</span>
              ))}
            </div>
            {artist.bio && (
              <p className="text-[16px] sm:text-[19px] font-medium text-gray-700 leading-relaxed max-w-[440px]">
                {artist.bio}
              </p>
            )}

            <div className="flex gap-8 sm:gap-10 mt-2 pt-6 border-t border-gray-200">
              <div className="flex flex-col gap-1">
                <span className="text-[24px] sm:text-[28px] font-black text-gray-900">{works.length}</span>
                <span className="text-[10px] font-bold tracking-[0.12em] text-gray-400" style={eyebrowFont}>작품 수</span>
              </div>
              {activeSinceYear && (
                <div className="flex flex-col gap-1">
                  <span className="text-[24px] sm:text-[28px] font-black text-gray-900">{activeSinceYear}&ndash;</span>
                  <span className="text-[10px] font-bold tracking-[0.12em] text-gray-400" style={eyebrowFont}>활동 기간</span>
                </div>
              )}
            </div>

            <div className="mt-4">
              <ShareButton />
            </div>
          </div>

          <div
            className="relative flex-1 max-w-full md:max-w-[420px] aspect-[4/5] shrink-0 overflow-hidden bg-gray-100"
          >
            {ARTIST_AVATARS[artist.slug] ? (
              <img src={ARTIST_AVATARS[artist.slug]} alt={artist.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: artist.profileColor }}>
                <span className="text-[64px] font-black text-white/70 select-none">{artist.name[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 갤러리 */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-14 sm:pt-20">
        {groups.length > 0 && (
          <div className="flex items-end justify-between border-b-2 border-gray-900 pb-5 mb-10 sm:mb-14">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400" style={eyebrowFont}>WORKS</span>
              <h2 className="mt-1.5 text-[26px] sm:text-[36px] md:text-[42px] font-black text-gray-900">작품 ({works.length})</h2>
            </div>
          </div>
        )}

        {groups.length > 0 ? (
          <ArtistGallery artist={artist} groups={groups} allWorks={works} />
        ) : (
          <p className="pb-20 text-[14px] text-gray-400">작품이 곧 올라옵니다.</p>
        )}
      </div>
    </div>
  );
}
