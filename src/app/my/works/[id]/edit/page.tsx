import { notFound } from 'next/navigation';
import { accountContext } from '@/lib/account-auth';
import WorkEditor from '@/components/account/WorkEditor';
export const dynamic = 'force-dynamic';
export default async function EditWorkPage({ params }: { params: Promise<{id:string}> }) {
 const ctx = (await accountContext(true))!;
 const { id } = await params;
 const { data: work } = await ctx.client.from('works').select('*').eq('id',id).is('deleted_at',null).single();
 if (!work) notFound();
 const { data: allowed } = await ctx.client.rpc('can_manage_artist',{target_artist:work.artist_id});
 if (!allowed) notFound();
 return <div className="max-w-xl mx-auto px-5 py-12 space-y-6"><h1 className="text-3xl font-bold">작품 수정</h1><WorkEditor artistId={work.artist_id} work={work}/></div>;
}
