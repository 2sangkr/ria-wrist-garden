import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ARTISTS } from '@/lib/artists';

type Props = { params: Promise<{ slug: string }> };

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);
  if (!artist) notFound();

  const works = artist.works ?? [];

  return (
    <div className="min-h-screen bg-white">

      {/* 헤더 */}
      <div className="px-6 sm:px-10 pt-10 pb-8">
        <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
          ← 홈
        </Link>

        <div className="mt-8 flex items-center gap-5">
          <div
            className="w-14 h-14 flex items-center justify-center shrink-0"
            style={{
              background: artist.profileColor,
              borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
            }}
          >
            <span className="text-[20px] font-bold text-white/80 select-none">{artist.name[0]}</span>
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
          <p className="mt-6 text-[12px] text-gray-300 tracking-widest uppercase">
            {works.length} works
          </p>
        )}
      </div>

      {/* 갤러리 */}
      {works.length > 0 ? (
        <div className="px-5 sm:px-8 pb-20">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {works.map((work) => (
              <Link
                key={work.slug}
                href={`/artist/${slug}/${work.slug}`}
                className="group block"
              >
                <div className="aspect-square rounded-xl overflow-hidden relative bg-gray-100 mb-3">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
                <p className="text-[13px] font-medium text-gray-900 leading-snug">{work.title}</p>
                <p className="text-[11px] text-gray-300 mt-0.5">{work.created_at}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="px-10 text-[14px] text-gray-400">작품이 곧 올라옵니다.</p>
      )}

    </div>
  );
}
