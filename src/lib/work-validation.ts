export function workFields(form: FormData) {
  const title = String(form.get('title') ?? '').trim();
  const created_at = String(form.get('created_at') ?? '');
  const rawAge = String(form.get('age') ?? '');
  const age = rawAge ? Number(rawAge) : null;
  const date = new Date(created_at + 'T00:00:00Z');
  const materials = String(form.get('materials') ?? '').split(',').map(v => v.trim()).filter(Boolean);
  const description = String(form.get('description') ?? '').trim();
  if (!title || title.length > 200 || !/^\d{4}-\d{2}-\d{2}$/.test(created_at) ||
    !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== created_at ||
    (age !== null && (!Number.isInteger(age) || age < 1 || age > 120)) ||
    materials.length > 20 || materials.some(v => v.length > 100) || description.length > 5000) {
    throw new Error('제목, 날짜, 나이, 설명 입력을 확인해 주세요.');
  }
  return { title, created_at, age, materials, description };
}
export async function checkedImage(file: File) {
  if (file.size > 10 * 1024 * 1024) throw new Error('사진은 10MB 이하로 올려 주세요.');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const png = [137,80,78,71,13,10,26,10].every((v,i) => bytes[i] === v);
  const webp = String.fromCharCode(...bytes.slice(0,4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8,12)) === 'WEBP';
  const ext = jpeg ? 'jpg' : png ? 'png' : webp ? 'webp' : null;
  if (!ext) throw new Error('JPG, PNG, WebP 사진만 올릴 수 있어요.');
  return { bytes, ext, type: jpeg ? 'image/jpeg' : png ? 'image/png' : 'image/webp' };
}

