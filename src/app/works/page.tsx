import Image from 'next/image';
import Link from 'next/link';
import { ARTISTS, formatPrice } from '@/lib/artists';

export default function WorksPage() {
  const allWorks = ARTISTS.flatMap((artist) =>
    (artist.works ?? []).map((work) => ({ work, artist }))
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[720px] mx-auto px-5 sm:px-8 py-12">

        {/* 뒤로가기 */}
        <Link href="/" className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors">
          ← 홈
        </Link>

        <div className="mt-10 mb-12">
          <p className="text-[12px] tracking-[0.25em] text-gray-400 uppercase mb-2">works</p>
          <h1
            className="text-[28px] sm:text-[34px] text-gray-900"
            style={{ fontFamily: "'Nanum Brush Script', cursive" }}
          >
            작가들의 작품
          </h1>
        </div>

        {allWorks.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {allWorks.map(({ work, artist }) => (
              <Link
                key={`${artist.slug}-${work.slug}`}
                href={`/artist/${artist.slug}/${work.slug}`}
                className="group block"
              >
                {/* 이미지 */}
                <div className="aspect-square rounded-xl overflow-hidden relative bg-gray-100 mb-3">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 720px) 50vw, 360px"
                  />
                </div>

                {/* 정보 */}
                <p className="text-[13px] font-medium text-gray-900 leading-snug">{work.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{artist.name}</p>
                <p className="text-[12px] text-gray-700 mt-1">{formatPrice(work.price)}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-[14px] text-gray-400 py-16 text-center">
            작품이 곧 올라옵니다.
          </p>
        )}

      </div>
    </div>
  );
}
