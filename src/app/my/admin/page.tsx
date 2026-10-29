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
 const tab = (await searchParams).tab;
 const completed = tab === 'completed';
 const artistList = tab === 'artists';
 const query = ctx.client.from('artist_applications').select('id,name,bio,login_email,contact_email,referral,status,created_at,reviewed_at,artist_id');
 const [{data: applications,error},{data:artists,error: artistError}] = await Promise.all([
 artistList ? query.eq('status','approved').order('reviewed_at',{ascending:true}) : completed ? query.in('status',['approved','rejected']).order('reviewed_at',{ascending:false}) : query.eq('status','pending').order('created_at'),
 ctx.client.from('artists').select('id,name,slug').eq('is_empty',false).order('sort_order')
 ]);
 return <div className="max-w-2xl mx-auto px-5 py-12 space-y-6"><h1 className="text-3xl font-bold">작가 신청 관리</h1>
 <nav aria-label="신청 상태" className="flex gap-2 sm:gap-6 border-b"><a href="/my/admin" aria-current={!completed && !artistList ? 'page' : undefined} className={'inline-flex min-h-12 items-center px-3 py-3 border-b-2 ' + (!completed && !artistList ? 'border-gray-900 font-bold' : 'border-transparent text-gray-500')}>대기 중</a><a href="/my/admin?tab=completed" aria-current={completed ? 'page' : undefined} className={'inline-flex min-h-12 items-center px-3 py-3 border-b-2 ' + (completed ? 'border-gray-900 font-bold' : 'border-transparent text-gray-500')}>처리 완료</a><a href="/my/admin?tab=artists" aria-current={artistList ? 'page' : undefined} className={'inline-flex min-h-12 items-center px-3 py-3 border-b-2 ' + (artistList ? 'border-gray-900 font-bold' : 'border-transparent text-gray-500')}>등록 작가</a></nav>
 {!completed && !artistList && <p className="text-sm text-gray-500">기존 작가를 선택하면 신청자의 로그인 계정에 연결됩니다. 신청자 본인인지 확인한 후 처리하세요.</p>}
 {error || artistError ? <p role="alert">신청 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</p> : artistList ? <>
 <p className="text-sm text-gray-500">가입일은 기록된 최초 승인일입니다. 이전 방식으로 등록했거나 신청 기록이 없는 정보는 미확인으로 표시합니다.</p>
 <div className="overflow-x-auto"><table className="w-full table-fixed text-left text-sm"><caption className="sr-only">등록 작가별 가입일과 연락 이메일</caption><thead className="border-b"><tr><th scope="col" className="w-1/4 py-3 pr-2">작가명</th><th scope="col" className="w-1/4 py-3 pr-2">가입일</th><th scope="col" className="w-1/2 py-3">연락 이메일</th></tr></thead><tbody>{artists?.map(artist => {
 const records = applications?.filter(a => a.artist_id === artist.id) ?? [];
 const firstApproval = records.find(a => a.reviewed_at)?.reviewed_at;
 // Legacy artist contact confirmed by the operator; this does not link login accounts.
 const contactRecords = records.length || artist.slug !== 'evan' ? records : (applications?.filter(a => a.artist_id === artists?.find(v => v.slug === 'artist-832f5f27-6d37-4481-ba2e-d85eb15c2e8a')?.id) ?? []);
 const emails = [...new Set(contactRecords.map(a => a.contact_email).filter(Boolean))];
 return <tr key={artist.id} className="border-b align-top"><th scope="row" className="py-4 pr-2 font-medium break-words"><Link className="underline underline-offset-4" href={'/artist/' + artist.slug}>{artist.name}</Link></th><td className="py-4 pr-2">{firstApproval ? new Date(firstApproval).toLocaleDateString('ko-KR', {timeZone:'Asia/Seoul'}) : '미확인'}</td><td className="py-4 break-all">{emails.length ? emails.map(email => <div key={email}>{email}</div>) : '미확인'}</td></tr>;
 })}</tbody></table>{!artists?.length && <p className="py-4">등록된 작가가 없습니다.</p>}</div></> : !applications?.length ? <p>{completed ? '처리 완료된 신청이 없습니다.' : '대기 중인 신청이 없습니다.'}</p> : applications.map(a => {
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
