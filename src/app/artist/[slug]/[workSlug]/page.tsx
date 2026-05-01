import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ARTISTS, Artist } from '@/lib/artists';

type Props = { params: Promise<{ slug: string; workSlug: string }> };

export default async function WorkDetailPage({ params }: Props) {
  const { slug, workSlug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);
  if (!artist?.works) notFound();

  const work = artist.works.find((w) => w.slug === workSlug);
  if (!work) notFound();

  const formattedDate = new Date(work.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[600px] mx-auto px-5 sm:px-8 py-12">

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
          <h1 className="text-[20px] font-bold text-gray-900">{work.title}</h1>
          <p className="text-[12px] text-gray-400 mt-1">{formattedDate}</p>
        </div>

        {/* 재료 */}
        {work.materials.length > 0 && (
          <p className="text-[12px] text-gray-400 mb-6">
            {work.materials.join(' · ')}
          </p>
        )}

        {/* 구분선 */}
        <div className="border-t border-gray-100 mb-6" />

        {/* 작가 메시지 */}
        {work.artistMessage ? (
          <p className="text-[14px] text-gray-700 leading-relaxed mb-4">
            {work.artistMessage}
          </p>
        ) : (
          <div className="flex items-center gap-2 my-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-[12px] text-gray-400 tracking-wide">작가가 소개글을 작성 중이에요</p>
          </div>
        )}

        {/* 재료 스토리 */}
        {work.materialsStory && (
          <p className="text-[13px] text-gray-500 leading-relaxed mt-2">
            {work.materialsStory}
          </p>
        )}

        {/* 작가 */}
        <div className="mt-10 flex items-center gap-4">
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
