import ActionForm from './ActionForm';
import { saveWork } from '@/app/my/actions';
type EditableWork = { id: number; title: string; created_at: string; age: number | null; materials: string[]; description: string; image: string };
const inputStyle = 'block w-full border rounded-lg p-3 mt-2';
export default function WorkEditor({ artistId, work }: { artistId: string; work?: EditableWork }) {
 return <ActionForm action={saveWork} label={work ? '수정 내용 저장' : '갤러리에 올리기'}>
 <input type="hidden" name="artist_id" value={artistId}/>{work && <input type="hidden" name="id" value={work.id}/>}
 {work && <img src={work.image} alt={work.title} className="max-h-64 object-contain"/>}
 <label className="block">작품 사진 {work ? '(바꾸려면 선택)' : '*'}<input className={inputStyle} type="file" name="image" accept="image/jpeg,image/png,image/webp" required={!work}/></label>
 <p className="text-sm text-gray-500">JPG, PNG, WebP / 최대 10MB</p>
 <label className="block">작품 제목 *<input className={inputStyle} name="title" required maxLength={200} defaultValue={work?.title}/></label>
 <label className="block">만든 날짜 *<input className={inputStyle} type="date" name="created_at" required defaultValue={work?.created_at}/></label>
 <label className="block">당시 나이<input className={inputStyle} type="number" name="age" min={1} max={120} defaultValue={work?.age ?? ''}/></label>
 <label className="block">재료 (쉼표로 구분)<input className={inputStyle} name="materials" defaultValue={work?.materials.join(', ')}/></label>
 <label className="block">작품 설명<textarea className={inputStyle} name="description" maxLength={5000} rows={5} defaultValue={work?.description}/></label>
 </ActionForm>;
}
