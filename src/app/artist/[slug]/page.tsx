import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ARTISTS, Work } from '@/lib/artists';
import ShareButton from '@/components/ui/ShareButton';

type Props = { params: Promise<{ slug: string }> };

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
  const artist = ARTISTS.find((a) => a.slug === slug);
  if (!artist) notFound();

  const works = artist.works ?? [];
  const groups = groupByYear(works);

  return (
    <div className="min-h-screen bg-white">

      {/* 작가 정보 */}
      <div className="px-6 sm:px-10 pt-10 pb-8">
        <div className="mt-2 flex items-center gap-5">
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

        <div className="mt-5 flex items-center gap-3">
          {works.length > 0 && (
            <p className="text-[12px] text-gray-300 tracking-widest uppercase">
              {works.length} works
            </p>
          )}
          <ShareButton title={`${artist.name} 갤러리`} text={`${artist.name}의 작품을 감상해보세요`} />
        </div>
      </div>

      {/* 갤러리 — 나이별 그룹 */}
      {groups.length > 0 ? (
        <div className="px-5 sm:px-8 pb-20 space-y-12">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[13px] font-semibold text-gray-500">{group.label}</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {group.works.map((work) => (
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
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="px-10 text-[14px] text-gray-400">작품이 곧 올라옵니다.</p>
      )}

    </div>
  );
}
