import Link from 'next/link';
import { canManageArtist } from '@/lib/account-auth';
import { moveWork } from '@/app/my/actions';
import ActionForm from './ActionForm';
export default async function WorkControls({ artistId, workId }: { artistId: string; workId: number }) {
 if (!await canManageArtist(artistId)) return null;
 const buttonClassName = 'inline-flex h-12 items-center justify-center border border-gray-200 bg-white text-gray-900 rounded-xl px-5 text-base hover:bg-gray-50';
 return <div className="flex gap-4 items-start mt-6"><Link href={'/my/works/' + workId + '/edit'} className={buttonClassName}>수정</Link>
 <ActionForm action={moveWork} label="삭제" className="relative" buttonClassName={buttonClassName} confirm="이 작품을 휴지통으로 옮길까요? 공개 갤러리에서 숨겨지며 휴지통에서 복원할 수 있어요."><input type="hidden" name="id" value={workId}/></ActionForm></div>;
}
