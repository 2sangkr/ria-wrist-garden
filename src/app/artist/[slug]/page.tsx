import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ARTISTS } from '@/lib/artists';

type Props = { params: Promise<{ slug: string }> };

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);
  if (!artist) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 */}
      <div className="px-8 pt-8 pb-6 border-b border-gray-100">
        <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
          ← 홈으로
        </Link>
      </div>

      {/* 작가 프로필 */}
      <div className="max-w-3xl mx-auto px-8 py-12">
        <div className="flex items-center gap-6 mb-12">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-md shrink-0"
            style={{ background: artist.profileColor }}
          >
            <span className="text-[28px] font-bold text-white/80" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              {artist.name[0]}
            </span>
          </div>
          <div>
            <h1 className="text-[24px] font-bold text-gray-800" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              {artist.name}
            </h1>
            <p className="text-[12px] text-gray-400 mt-1 tracking-wide">{artist.tags.join(' ')}</p>
            <p className="text-[14px] text-gray-500 mt-1" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              {artist.bio}
            </p>
          </div>
        </div>

        {/* 작품 목록 */}
        <div>
          <h2 className="text-[16px] font-bold text-gray-700 mb-6" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            작품 목록
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {artist.works?.map((work) => (
              <Link key={work.slug} href={`/artist/${slug}/${work.slug}`} className="group block">
                <div className="aspect-square rounded-xl overflow-hidden relative bg-gray-100">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" />
                </div>
                <p className="text-[12px] text-gray-600 mt-2 font-medium">{work.title}</p>
              </Link>
            ))}
            {(!artist.works || artist.works.length === 0) && (
              <div
                className="aspect-square rounded-xl flex items-center justify-center text-[13px] text-gray-400 col-span-2 md:col-span-3"
                style={{ background: artist.profileColor + '33' }}
              >
                작품이 등록되면 여기에 표시됩니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
