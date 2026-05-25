import { slugFromToken } from '@/lib/uploadToken';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import UploadForm from './UploadForm';

async function getArtist(token: string) {
  const slug = slugFromToken(token);
  if (!slug) return null;
  const { data } = await supabase.from('artists').select('name, profile_color').eq('slug', slug).single();
  return data ? { ...data, slug } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  const artist = await getArtist(token);
  if (!artist) return {};
  const title = `${artist.name} 작품 올리기`;
  const description = `${artist.name} 작가님만의 갤러리 링크예요. 작품 사진을 올려보세요!`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | mymomo.gallery`,
      description,
      url: `https://mymomo.gallery/upload/${token}`,
      siteName: 'mymomo.gallery',
    },
  };
}

export default async function UploadPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const artist = await getArtist(token);
  if (!artist) notFound();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ fontFamily: "'Noto Sans KR', sans-serif", background: 'linear-gradient(160deg, #f0faf0 0%, #f9fffe 60%, #f5f5f5 100%)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* 연두색 장식 원 */}
          <div className="relative inline-block mb-4">
            <div
              className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-md"
              style={{ background: artist.profile_color }}
            >
              {artist.name[0]}
            </div>
            <div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-70"
              style={{ background: '#a8d65e' }}
            />
            <div
              className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full opacity-50"
              style={{ background: '#a8d65e' }}
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900">{artist.name}</h1>
          <p className="text-sm text-gray-400 mt-1">갤러리에 작품을 올려보세요 🌱</p>
          <a
            href={`/api/card/${token}`}
            download={`${artist.name}-명함.png`}
            className="inline-block mt-3 text-xs text-sky-500 hover:text-sky-700 border border-sky-200 hover:border-sky-400 px-4 py-1.5 rounded-full transition-colors"
          >
            명함 파일 받기 ↓
          </a>
        </div>
        <UploadForm token={token} artistName={artist.name} artistSlug={artist.slug} />
      </div>
    </div>
  );
}
