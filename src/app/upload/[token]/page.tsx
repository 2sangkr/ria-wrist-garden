import { slugFromToken } from '@/lib/uploadToken';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import UploadForm from './UploadForm';

export default async function UploadPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const slug = slugFromToken(token);
  if (!slug) notFound();

  const { data: artist } = await supabase.from('artists').select('name, profile_color').eq('slug', slug).single();
  if (!artist) notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold"
            style={{ background: artist.profile_color }}
          >
            {artist.name[0]}
          </div>
          <h1 className="text-xl font-bold text-gray-900">{artist.name}</h1>
          <p className="text-sm text-gray-400 mt-1">작품 업로드</p>
          <a
            href={`/api/card/${token}`}
            download={`${artist.name}-명함.png`}
            className="inline-block mt-3 text-xs text-sky-500 hover:text-sky-700 border border-sky-200 hover:border-sky-400 px-4 py-1.5 rounded-full transition-colors"
          >
            명함 파일 받기 ↓
          </a>
        </div>
        <UploadForm token={token} artistName={artist.name} artistSlug={slug} />
      </div>
    </div>
  );
}
