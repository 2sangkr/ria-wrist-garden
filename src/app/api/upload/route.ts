import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { slugFromToken } from '@/lib/uploadToken';
import { legacyUploadAllowed } from '@/lib/account-settings';
import { checkedImage, workFields } from '@/lib/work-validation';

export async function POST(request: NextRequest) {
  const client = getServiceClient();
  const formData = await request.formData();

  const token = String(formData.get('token') ?? '');
  const slug = slugFromToken(token);
  if (!slug) return NextResponse.json({ error: '유효하지 않은 링크예요' }, { status: 403 });
  if (!legacyUploadAllowed(slug)) return NextResponse.json({ error: '로그인 후 내 작품에서 등록해 주세요.' }, { status: 410 });

  const { data: artist } = await client.from('artists').select('id').eq('slug', slug).single();
  if (!artist) return NextResponse.json({ error: '작가를 찾을 수 없어요' }, { status: 404 });

  let fields;
  let checked;
  try {
    fields = workFields(formData);
    const imageFile = formData.get('image');
    if (!(imageFile instanceof File) || !imageFile.size) throw new Error('작품 사진을 선택해 주세요.');
    checked = await checkedImage(imageFile);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : '입력을 확인해 주세요.' }, { status: 400 });
  }
  const filename = `${artist.id}/${crypto.randomUUID()}.${checked.ext}`;
  const { error: uploadError } = await client.storage.from('works').upload(filename, checked.bytes, { contentType: checked.type, upsert: false });
  if (uploadError) return NextResponse.json({ error: '이미지 업로드 실패' }, { status: 500 });
  const imageUrl = client.storage.from('works').getPublicUrl(filename).data.publicUrl;
  const workSlug = `work-${crypto.randomUUID()}`;
  const { error } = await client.from('works').insert({
    artist_id: artist.id, slug: workSlug, title: fields.title, materials: fields.materials, created_at: fields.created_at, age: fields.age, image: imageUrl,
  });

  if (error) {
    await client.storage.from('works').remove([filename]);
    return NextResponse.json({ error: '작품을 저장하지 못했어요. 다시 시도해 주세요.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true, artistSlug: slug });
}
