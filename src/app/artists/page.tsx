import Link from 'next/link';
import { ARTISTS } from '@/lib/artists';

const BLOB_SHAPES = [
  '60% 40% 55% 45% / 50% 60% 40% 50%',
  '45% 55% 40% 60% / 60% 40% 55% 45%',
  '55% 45% 65% 35% / 40% 60% 50% 50%',
  '40% 60% 50% 50% / 55% 45% 60% 40%',
  '65% 35% 45% 55% / 45% 55% 40% 60%',
  '50% 50% 60% 40% / 35% 65% 45% 55%',
  '35% 65% 55% 45% / 60% 40% 65% 35%',
  '55% 45% 40% 60% / 50% 50% 55% 45%',
];

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-[24px] sm:text-[28px] font-bold text-gray-800 mb-2">작가들</h1>
        <p className="text-[13px] text-gray-400 mb-10">꿈꾸는 2Sang과 함께하는 청소년 작가들을 만나보세요.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {ARTISTS.map((artist, idx) => (
            <Link key={artist.id} href={`/artist/${artist.slug}`} className="group flex flex-col items-center gap-3 text-center">
              <div
                className="w-[110px] h-[110px] shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl flex items-center justify-center"
                style={{
                  background: artist.profileColor,
                  borderRadius: BLOB_SHAPES[idx % BLOB_SHAPES.length],
                }}
              >
                <span className="text-[40px] font-bold text-white/75 select-none">{artist.name[0]}</span>
              </div>
              <div>
                <p className="text-[14px] font-medium text-gray-800">{artist.name}</p>
                <p className="text-[12px] text-gray-400 mt-1">{artist.bio}</p>
              </div>
              <span className="text-[11px] border border-gray-300 text-gray-500 px-3 py-1 rounded group-hover:bg-gray-50 group-hover:border-gray-500 transition-colors">
                둘러보기
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
