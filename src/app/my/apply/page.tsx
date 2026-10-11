import { accountContext } from '@/lib/account-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ActionForm from '@/components/account/ActionForm';
import { applyArtist } from '../actions';
export const dynamic = 'force-dynamic';
export default async function ApplyPage() {
 const ctx = await accountContext();
 if (!ctx) redirect('/login?next=/my/apply');
 const [{ data: memberships, error: membershipError }, { data: pending, error: applicationError }] = await Promise.all([
 ctx.client.from('artist_memberships').select('artist_id').eq('user_id', ctx.user.id),
 ctx.client.from('artist_applications').select('id').eq('user_id', ctx.user.id).eq('status', 'pending')
 ]);
 if (membershipError || applicationError) return <div className="max-w-xl mx-auto px-5 py-12 space-y-6"><p role="alert">신청 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</p><Link href="/my">내 작품으로 돌아가기</Link></div>;
 if (pending?.length) return <div className="max-w-xl mx-auto px-5 py-12 space-y-6"><h1 className="text-3xl font-bold">작가 신청을 검토 중입니다</h1><p>진행 중인 신청이 승인되거나 검토가 끝나면 다른 작가를 추가로 신청할 수 있습니다.</p><Link href="/my">내 작품으로 돌아가기</Link></div>;
 const cls = 'block w-full border rounded-lg p-3 mt-2';
 return <div className="max-w-xl mx-auto px-5 py-12 space-y-6"><h1 className="text-3xl font-bold">{memberships?.length ? '다른 작가 추가 신청' : '작가 등록 신청'}</h1>
 <p>한 계정으로 여러 작가를 관리할 수 있습니다. 아이의 작품은 보호자의 계정으로 관리할 수 있습니다. 추가 작가도 운영자의 승인 후 별도 갤러리가 생성됩니다.</p>
 <ActionForm action={applyArtist} label="신청하기">
 <label className="block">작가 이름 (활동명) *<input className={cls} name="name" required maxLength={80}/></label>
 <label className="block">연락용 이메일 *<input className={cls} name="contact_email" type="email" required defaultValue={ctx.user.email}/></label>
 <label className="block">작품 활동 소개 *<textarea className={cls} name="bio" required maxLength={2000}/></label>
 <label className="block">모모갤러리를 어떻게 알게 되셨나요?<select className={cls} name="referral"><option value="">선택하지 않음</option><option>인터넷 검색</option><option>지인·가족 추천</option><option>SNS에서 보고</option><option>학교·학원 소개</option><option>기타</option></select></label>
 <p className="text-sm">개인이 운영하는 작은 갤러리로 작품의 영구 보관·복구를 보장하기 어렵습니다. 원본 사진과 설명은 별도로 보관해 주세요. 등록된 작품과 작가 소개는 공개됩니다.</p>
 <label className="block"><input type="checkbox" name="acknowledged" required/> 작품 공개 및 보관 안내를 확인했습니다.</label>
 </ActionForm></div>;
}
