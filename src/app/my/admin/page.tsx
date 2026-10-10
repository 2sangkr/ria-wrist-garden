import { notFound } from 'next/navigation';
import { accountContext } from '@/lib/account-auth';
import ActionForm from '@/components/account/ActionForm';
import { reviewApplication } from '../actions';
export const dynamic = 'force-dynamic';
export default async function ApplicationAdmin() {
 const ctx = (await accountContext(true))!;
 const { data: admin } = await ctx.client.rpc('is_gallery_admin');
 if (!admin) notFound();
 const [{data: applications,error},{data:artists}] = await Promise.all([
 ctx.client.from('artist_applications').select('*').eq('status','pending').order('created_at'),
 ctx.client.from('artists').select('id,name').order('sort_order')
 ]);
 return <div className="max-w-2xl mx-auto px-5 py-12 space-y-6"><h1 className="text-3xl font-bold">작가 신청 관리</h1>
 <p>기존 작가를 선택하면 신청자의 로그인 계정에 연결됩니다. 신청자 본인인지 확인한 후 처리하세요.</p>
 {error ? <p role="alert">신청을 불러오지 못했어요.</p> : !applications?.length ? <p>대기 중인 신청이 없습니다.</p> : applications.map(a => <section key={a.id} className="border rounded-xl p-5 space-y-4">
 <h2 className="font-bold">{a.name}</h2><p>{a.bio}</p><p>로그인 이메일: {a.login_email}</p><p>연락 이메일: {a.contact_email}</p><p>유입 경로: {a.referral || '미입력'}</p>
 <ActionForm action={reviewApplication} label="승인" confirm="신청자의 계정에 선택한 작가의 작품 관리 권한을 부여할까요?"><input type="hidden" name="application_id" value={a.id}/><input type="hidden" name="approve" value="true"/><label>작가 연결<select name="existing_artist" className="block border p-3 w-full"><option value="">새 작가 만들기</option>{artists?.map(v => <option key={v.id} value={v.id}>{v.name} (기존 작가)</option>)}</select></label></ActionForm>
 <ActionForm action={reviewApplication} label="거절" confirm="이 신청을 거절할까요?"><input type="hidden" name="application_id" value={a.id}/><input type="hidden" name="approve" value="false"/></ActionForm>
 </section>)}</div>;
}
