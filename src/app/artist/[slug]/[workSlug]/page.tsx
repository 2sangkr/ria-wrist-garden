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

        {/* 제목 + 가격 */}
        <div className="flex items-baseline justify-between mt-7 mb-5">
          <h1 className="text-[20px] font-bold text-gray-900">{work.title}</h1>
          <span className="text-[20px] font-bold text-gray-900">{formatPrice(work.price)}</span>
        </div>

        {/* 작업 중 */}
        <div className="flex items-center gap-2 my-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <p className="text-[12px] text-gray-400 tracking-wide">작가가 소개글을 작성 중이에요</p>
        </div>

        {/* 구분선 */}
        <div className="mb-8 border-t border-gray-100" />

        {/* 재고 + 구매 */}
        <p className="text-[12px] text-gray-400 mb-4">
          {work.stock > 0 ? `${work.stock}개 남았어요` : '품절'}
        </p>

        {work.stock > 0 ? (
          <button className="w-full bg-gray-900 text-white text-[14px] font-medium py-4 rounded-full hover:bg-gray-700 transition-colors">
            이 작품 데려가기
          </button>
        ) : (
          <button disabled className="w-full bg-gray-100 text-gray-400 text-[14px] py-4 rounded-full cursor-not-allowed">
            품절
          </button>
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
