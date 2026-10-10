import Link from 'next/link';
import { canManageArtist } from '@/lib/account-auth';
export default async function ArtistControls({ artistId, slug }: { artistId: string; slug: string }) {
 if (!await canManageArtist(artistId)) return null;
 return <div className="flex flex-wrap gap-4 mt-6"><Link className="bg-gray-900 text-white rounded-xl px-5 py-3" href={'/my/artists/' + slug + '/new'}>작품 올리기</Link><Link className="p-3" href="/my/trash">휴지통</Link></div>;
}
