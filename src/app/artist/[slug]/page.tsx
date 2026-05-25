import { notFound } from 'next/navigation';
import type { Work } from '@/lib/artists';
import { getArtistWithWorks } from '@/lib/data';
import ArtistGallery from './ArtistGallery';

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
    .sort((a, b) => a.year - b.year)
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
    a.created_at.localeCompare(b.created_at)
  );
  const groups = groupByYear(works);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1100px] mx-auto">

      {/* 작가 정보 */}
      <div className="px-6 sm:px-10 pt-10 pb-8">
        <div className="mt-2 flex items-center gap-5">
          <div
            className="w-14 h-14 flex items-center justify-center shrink-0 overflow-hidden"
            style={{
              background: artist.profileColor,
              borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
            }}
          >
            {ARTIST_AVATARS[artist.slug] ? (
              <img src={ARTIST_AVATARS[artist.slug]} alt={artist.name} className="w-[130%] h-[130%] object-cover object-center" style={{ marginTop: '-6px' }} />
            ) : (
              <span className="text-[20px] font-bold text-white/80 select-none">{artist.name[0]}</span>
            )}
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-gray-900 leading-tight">{artist.name}</h1>
            <p className="text-[13px] text-gray-400 mt-0.5">{artist.bio}</p>
            <div className="flex gap-2 mt-1.5">
              {artist.tags.map((tag) => (
                <span key={tag} className="text-[11px] text-gray-300">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {works.length > 0 && (
          <div className="mt-5">
            <p className="text-[12px] text-gray-300 tracking-widest uppercase">
              {works.length} works
            </p>
          </div>
        )}
      </div>

      {/* 갤러리 */}
      {groups.length > 0 ? (
        <ArtistGallery artist={artist} groups={groups} allWorks={works} />
      ) : (
        <p className="px-10 text-[14px] text-gray-400">작품이 곧 올라옵니다.</p>
      )}

      </div>
    </div>
  );
}
