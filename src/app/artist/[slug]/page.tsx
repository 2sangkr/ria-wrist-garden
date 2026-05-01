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
        <div className="px-3 sm:px-6 pb-20">
          <div className="columns-2 sm:columns-3 gap-2 sm:gap-3">
            {works.map((work, i) => (
              <Link
                key={work.slug}
                href={`/artist/${slug}/${work.slug}`}
                className="group block break-inside-avoid mb-2 sm:mb-3"
              >
                <div className="relative overflow-hidden bg-gray-50">
                  <Image
                    src={work.image}
                    alt={work.title}
                    width={0}
                    height={0}
                    sizes="(max-width: 640px) 50vw, 33vw"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    className="transition-opacity duration-400 group-hover:opacity-85"
                  />
                  <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full px-3 py-2.5 bg-gradient-to-t from-black/50 to-transparent">
                      <p className="text-white text-[12px] font-medium leading-tight">{work.title}</p>
                      <p className="text-white/70 text-[11px] mt-0.5">{work.created_at}</p>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-300 mt-1.5 pl-0.5 tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </p>
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
