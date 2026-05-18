import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { slugFromToken } from '@/lib/uploadToken';

export async function POST(request: NextRequest) {
  const client = getServiceClient();
  const formData = await request.formData();

  const token = formData.get('token') as string;
  const slug = slugFromToken(token);
  if (!slug) return NextResponse.json({ error: '유효하지 않은 링크예요' }, { status: 403 });

  const { data: artist } = await client.from('artists').select('id').eq('slug', slug).single();
  if (!artist) return NextResponse.json({ error: '작가를 찾을 수 없어요' }, { status: 404 });

  const title = (formData.get('title') as string)?.trim();
  const materialsRaw = (formData.get('materials') as string) ?? '';
  const materials = materialsRaw.split(',').map((s) => s.trim()).filter(Boolean);
  const createdAt = formData.get('created_at') as string;
  const ageRaw = formData.get('age') as string;
  const age = ageRaw ? Number(ageRaw) : null;
  const imageFile = formData.get('image') as File | null;

  if (!title || !createdAt) {
    return NextResponse.json({ error: '제목과 날짜를 입력해주세요' }, { status: 400 });
  }

  let imageUrl = '';
  if (imageFile && imageFile.size > 0) {
    const { data: buckets } = await client.storage.listBuckets();
    if (!buckets?.find((b) => b.name === 'works')) {
      await client.storage.createBucket('works', { public: true });
    }
    const ext = imageFile.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${artist.id}/${Date.now()}.${ext}`;
    const buffer = await imageFile.arrayBuffer();
    const { error: uploadError } = await client.storage
      .from('works')
      .upload(filename, buffer, { contentType: imageFile.type, upsert: false });
    if (uploadError) return NextResponse.json({ error: '이미지 업로드 실패' }, { status: 500 });
    const { data: { publicUrl } } = client.storage.from('works').getPublicUrl(filename);
    imageUrl = publicUrl;
  }

  const workSlug = `work-${Date.now()}`;
  const { error } = await client.from('works').insert({
    artist_id: artist.id, slug: workSlug, title, materials, created_at: createdAt, age, image: imageUrl,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, artistSlug: slug });
}
