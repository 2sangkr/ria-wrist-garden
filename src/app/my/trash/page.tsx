import { accountContext } from '@/lib/account-auth';
import ActionForm from '@/components/account/ActionForm';
import { moveWork } from '../actions';
export const dynamic = 'force-dynamic';
export default async function TrashPage() {
 const ctx = (await accountContext(true))!;
 const { data: works, error } = await ctx.client.from('works').select('id,title,image').not('deleted_at','is',null).order('deleted_at',{ascending:false});
 return <div className="max-w-xl mx-auto px-5 py-12 space-y-6"><h1 className="text-3xl font-bold">휴지통</h1><p>공개 갤러리에서 숨긴 작품입니다. 현재 자동 영구 삭제는 하지 않습니다.</p>
 {error ? <p role="alert">휴지통을 불러오지 못했어요.</p> : !works?.length ? <p>휴지통이 비어 있어요.</p> : works.map(w => <div className="border rounded-xl p-5 space-y-3" key={w.id}><img src={w.image} alt={w.title} className="max-h-40 object-contain"/><p>{w.title}</p><ActionForm action={moveWork} label="복원"><input type="hidden" name="id" value={w.id}/><input type="hidden" name="restore" value="true"/></ActionForm></div>)}</div>;
}
