import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Artist } from '@/lib/artists';
import { workDateLabel } from '@/lib/artists';
import { getArtistWithWorks } from '@/lib/data';
import LikeButton from '@/components/ui/LikeButton';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string; workSlug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug, workSlug } = await params;
  const artist = await getArtistWithWorks(slug);
  const work = artist?.works?.find((w) => w.slug === workSlug);
  if (!work || !artist) return { title: '작품' };
  const description = `${artist.name}의 작품 "${work.title}". ${work.materials.join(', ')} — 모모갤러리`;
  return {
    title: work.title,
    description,
    keywords: [work.title, artist.name, ...work.materials, '어린이 미술', '모모갤러리'],
    openGraph: {
      type: 'article',
      title: `${work.title} — ${artist.name}`,
      description,
      url: `https://mymomo.gallery/artist/${slug}/${workSlug}`,
      images: [{ url: work.image, alt: `${artist.name}의 작품 — ${work.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${work.title} — ${artist.name}`,
      description,
      images: [work.image],
    },
    alternates: {
      canonical: `https://mymomo.gallery/artist/${slug}/${workSlug}`,
    },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug, workSlug } = await params;
  const artist = await getArtistWithWorks(slug);
  if (!artist?.works) notFound();

  const work = artist.works.find((w) => w.slug === workSlug);
  if (!work) notFound();

  const formattedDate = workDateLabel(work);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: work.title,
    image: work.image,
    url: `https://mymomo.gallery/artist/${slug}/${workSlug}`,
    artMedium: work.materials.join(', '),
    dateCreated: work.created_at,
    creator: {
      '@type': 'Person',
      name: artist.name,
      url: `https://mymomo.gallery/artist/${slug}`,
    },
    isPartOf: {
      '@type': 'ProfilePage',
      url: `https://mymomo.gallery/artist/${slug}`,
    },
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[600px] mx-auto px-5 sm:px-8 py-8">

        {/* 뒤로가기 */}
        <Link href={`/artist/${slug}`} className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
          ← {artist.name}
        </Link>

        {/* 이미지 */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mt-8">
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-cover"
            sizes="(max-width: 600px) 100vw, 600px"
            priority
          />
        </div>

        {/* 제목 + 날짜 */}
        <div className="mt-7 mb-2">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-[20px] font-bold text-gray-900">{work.title}</h1>
            <LikeButton workId={String(work.id ?? '')} />
          </div>
          <p className="text-[12px] text-gray-400 mt-1">{formattedDate}</p>
        </div>

        {/* 재료 */}
        {work.materials.length > 0 && (
          <p className="text-[12px] text-gray-400 mb-6">
            {work.materials.join(' · ')}
          </p>
        )}

        {/* 작가 */}
        <div className="mt-6 flex items-center gap-4">
          <ArtistBlob artist={artist} />
          <div>
            <p className="text-[13px] font-medium text-gray-800">{artist.name}</p>
            <p className="text-[11px] text-gray-400">{artist.tags.join(' ')}</p>
          </div>
          <Link href={`/artist/${slug}`}
            className="ml-auto text-[11px] text-gray-400 hover:text-gray-700 transition-colors">
            작가 페이지 →
          </Link>
        </div>

      </div>
    </div>
  );
}

function ArtistBlob({ artist }: { artist: Artist }) {
  return (
    <div
      className="w-[44px] h-[44px] flex items-center justify-center shrink-0"
      style={{
        background: artist.profileColor,
        borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
      }}
    >
      <span className="text-[16px] font-bold text-white/80 select-none">{artist.name[0]}</span>
    </div>
  );
}
