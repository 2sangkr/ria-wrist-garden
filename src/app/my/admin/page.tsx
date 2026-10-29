import Link from 'next/link';
import { notFound } from 'next/navigation';
import { accountContext } from '@/lib/account-auth';
import ActionForm from '@/components/account/ActionForm';
import { reviewApplication } from '../actions';
export const dynamic = 'force-dynamic';
export const metadata = { title: '작가 신청 관리', robots: { index: false, follow: false } };
const formatDate = (value: string | null) => value ? new Date(value).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) : '—';
export default async function ApplicationAdmin({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
 const ctx = (await accountContext(true))!;
 const { data: admin } = await ctx.client.rpc('is_gallery_admin');
 if (!admin) notFound();
 const completed = (await searchParams).tab === 'completed';
 const query = ctx.client.from('artist_applications').select('id,name,bio,login_email,contact_email,referral,status,created_at,reviewed_at,artist_id');
 const [{data: applications,error},{data:artists,error: artistError}] = await Promise.all([
 completed ? query.in('status',['approved','rejected']).order('reviewed_at',{ascending:false}) : query.eq('status','pending').order('created_at'),
 ctx.client.from('artists').select('id,name,slug').order('sort_order')
 ]);
 return <div className="max-w-2xl mx-auto px-5 py-12 space-y-6"><h1 className="text-3xl font-bold">작가 신청 관리</h1>
 <nav aria-label="신청 상태" className="flex gap-6 border-b"><Link href="/my/admin" aria-current={!completed ? 'page' : undefined} className={'py-3 border-b-2 ' + (!completed ? 'border-gray-900 font-bold' : 'border-transparent text-gray-500')}>대기 중</Link><Link href="/my/admin?tab=completed" aria-current={completed ? 'page' : undefined} className={'py-3 border-b-2 ' + (completed ? 'border-gray-900 font-bold' : 'border-transparent text-gray-500')}>처리 완료</Link></nav>
 {!completed && <p className="text-sm text-gray-500">기존 작가를 선택하면 신청자의 로그인 계정에 연결됩니다. 신청자 본인인지 확인한 후 처리하세요.</p>}
 {error || artistError ? <p role="alert">신청 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</p> : !applications?.length ? <p>{completed ? '처리 완료된 신청이 없습니다.' : '대기 중인 신청이 없습니다.'}</p> : applications.map(a => {
 const artist = artists?.find(v => v.id === a.artist_id);
 return <section key={a.id} className="border rounded-xl p-5 space-y-4 min-w-0">
 <div className="flex items-center justify-between gap-3"><h2 className="font-bold text-lg break-words">{a.name}</h2>{completed && <span className="text-sm shrink-0">{a.status === 'approved' ? '승인 완료' : '거절'}</span>}</div>
 <dl className="space-y-2 text-sm"><div><dt className="text-gray-500">연락 이메일</dt><dd className="break-all">{a.contact_email}</dd></div><div><dt className="text-gray-500">로그인 이메일</dt><dd className="break-all">{a.login_email}</dd></div><div><dt className="text-gray-500">신청일 · 한국 시간</dt><dd>{formatDate(a.created_at)}</dd></div>{completed && <div><dt className="text-gray-500">처리일 · 한국 시간</dt><dd>{formatDate(a.reviewed_at)}</dd></div>}</dl>
 <details><summary className="cursor-pointer text-sm py-2">신청 내용 보기</summary><p className="mt-3 whitespace-pre-wrap break-words">{a.bio}</p><p className="mt-3 text-sm text-gray-500">유입 경로: {a.referral || '미입력'}</p></details>
 {completed ? artist && <Link className="inline-block border rounded-lg px-4 py-3 text-sm" href={'/artist/' + artist.slug}>{artist.name} 갤러리 →</Link> : <>
 <ActionForm action={reviewApplication} label="승인" confirm="신청자의 계정에 선택한 작가의 작품 관리 권한을 부여할까요?"><input type="hidden" name="application_id" value={a.id}/><input type="hidden" name="approve" value="true"/><label>작가 연결<select name="existing_artist" className="block border p-3 w-full"><option value="">새 작가 만들기</option>{artists?.map(v => <option key={v.id} value={v.id}>{v.name} (기존 작가)</option>)}</select></label></ActionForm>
 <ActionForm action={reviewApplication} label="거절" confirm="이 신청을 거절할까요?"><input type="hidden" name="application_id" value={a.id}/><input type="hidden" name="approve" value="false"/></ActionForm></>}
 </section>;
 })}</div>;
}
