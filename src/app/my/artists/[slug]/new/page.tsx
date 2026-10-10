import { notFound } from 'next/navigation';
import { accountContext } from '@/lib/account-auth';
import WorkEditor from '@/components/account/WorkEditor';
export const dynamic = 'force-dynamic';
export default async function NewWorkPage({ params }: { params: Promise<{slug:string}> }) {
 const ctx = (await accountContext(true))!;
 const { slug } = await params;
 const { data: artist } = await ctx.client.from('artists').select('id,name').eq('slug',slug).single();
 if (!artist) notFound();
 const { data: allowed } = await ctx.client.rpc('can_manage_artist',{target_artist:artist.id});
 if (!allowed) notFound();
 return <div className="max-w-xl mx-auto px-5 py-12 space-y-6"><h1 className="text-3xl font-bold">{artist.name} 작품 올리기</h1><WorkEditor artistId={artist.id}/></div>;
}
