import Link from 'next/link';
import { accountContext } from '@/lib/account-auth';
import { logout } from './actions';
export const dynamic = 'force-dynamic';
export const metadata = { title: '내 작품', robots: { index: false, follow: false } };
export default async function MyPage() {
 const ctx = (await accountContext(true))!;
 const [{ data: memberships, error }, { data: applications }, { data: admin }] = await Promise.all([
 ctx.client.from('artist_memberships').select('artist_id').eq('user_id',ctx.user.id),
 ctx.client.from('artist_applications').select('id,name,status').eq('user_id',ctx.user.id).order('created_at',{ascending:false}),
 ctx.client.rpc('is_gallery_admin')
 ]);
 const ids = (memberships ?? []).map(m => m.artist_id);
 const pending = applications?.some(a => a.status === 'pending');
 const { data: artists } = admin ? await ctx.client.from('artists').select('id,name,slug').order('sort_order')
 : ids.length ? await ctx.client.from('artists').select('id,name,slug').in('id',ids) : { data: [] };
 return <div className="max-w-xl mx-auto px-5 py-12 space-y-6"><h1 className="text-3xl font-bold">내 작품</h1>
 <p className="text-sm text-gray-500 break-all">로그인 계정: {ctx.user.email}</p>
 {error && <p role="alert">계정 연결 정보를 불러오지 못했어요. 운영자에게 문의해 주세요.</p>}
 {artists?.map(a => <section key={a.id} className="border rounded-xl p-5 space-y-4">
 <h2 className="text-xl font-bold">{a.name}</h2>
 <div className="flex flex-wrap gap-3"><Link className="bg-gray-900 text-white rounded-lg px-4 py-3 font-bold" href={'/my/artists/' + a.slug + '/new'}>새 작품 등록</Link>
 <Link className="border rounded-lg px-4 py-3" href={'/artist/' + a.slug}>작품 보기 · 수정 · 삭제</Link></div>
 <p className="text-sm text-gray-500">갤러리에서 작품을 선택하고 ‘작품 상세 보기’를 누르면 수정·삭제할 수 있어요.</p>
 </section>)}
 {!error && !artists?.length && <p>아직 연결된 작가가 없습니다. 기존 작가라면 로그인 계정 연결을 운영자에게 요청해 주세요.</p>}
 {applications?.map(a => <p key={a.id}>{a.name}: {a.status === 'pending' ? '승인 대기 중' : a.status === 'approved' ? '승인 완료' : '신청이 승인되지 않았어요. 운영자에게 문의해 주세요.'}</p>)}
 <p className="text-sm text-gray-500">한 계정으로 여러 작가를 관리할 수 있습니다. 작가마다 운영자의 승인이 필요합니다.</p>
 <div className="flex flex-wrap gap-5">{pending ? <span role="status" className="text-gray-500">작가 신청을 검토 중입니다</span> : <Link href="/my/apply">{ids.length ? '다른 작가 추가 신청' : '작가 등록 신청'}</Link>}<Link href="/my/trash">휴지통</Link>{admin && <Link href="/my/admin">신청 관리</Link>}</div>
 <form action={logout}><button className="text-gray-500">로그아웃</button></form></div>;
}
