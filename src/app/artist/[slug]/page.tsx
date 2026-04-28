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
      <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-12">

        {/* 뒤로가기 */}
        <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
          ← 홈
        </Link>

        {/* 작가 프로필 */}
        <div className="mt-10 mb-14">
          <div
            className="w-[72px] h-[72px] flex items-center justify-center mb-5"
            style={{
              background: artist.profileColor,
              borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
            }}
          >
            <span className="text-[26px] font-bold text-white/80 select-none">{artist.name[0]}</span>
          </div>
          <h1 className="text-[24px] font-bold text-gray-900 mb-1">{artist.name}</h1>
          <p className="text-[13px] text-gray-400">{artist.bio}</p>
        </div>

        {/* 작품 목록 */}
        {artist.works && artist.works.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {artist.works.map((work) => (
              <Link key={work.slug} href={`/artist/${slug}/${work.slug}`} className="group block">
                <div className="aspect-square rounded-xl overflow-hidden relative bg-gray-100 mb-3">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 720px) 50vw, 360px"
                  />
                </div>
                <p className="text-[13px] font-medium text-gray-800">{work.title}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-[14px] text-gray-400">작품이 곧 올라옵니다.</p>
        )}

      </div>
    </div>
  );
}
