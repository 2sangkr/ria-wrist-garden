import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

async function ensureBucket(client: ReturnType<typeof getServiceClient>) {
  const { data: buckets } = await client.storage.listBuckets();
  if (!buckets?.find((b) => b.name === 'works')) {
    await client.storage.createBucket('works', { public: true });
  }
}

export async function POST(request: NextRequest) {
  const client = getServiceClient();
  const formData = await request.formData();

  const artistId = formData.get('artist_id') as string;
  const title = (formData.get('title') as string).trim();
  const materialsRaw = (formData.get('materials') as string) ?? '';
  const materials = materialsRaw.split(',').map((s) => s.trim()).filter(Boolean);
  const createdAt = formData.get('created_at') as string;
  const ageRaw = formData.get('age') as string;
  const age = ageRaw ? Number(ageRaw) : null;
  const imageFile = formData.get('image') as File | null;

  if (!artistId || !title || !createdAt) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요' }, { status: 400 });
  }

  let imageUrl = '';

  if (imageFile && imageFile.size > 0) {
    await ensureBucket(client);
    const ext = imageFile.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${artistId}/${Date.now()}.${ext}`;
    const buffer = await imageFile.arrayBuffer();

    const { error: uploadError } = await client.storage
      .from('works')
      .upload(filename, buffer, { contentType: imageFile.type, upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: `이미지 업로드 실패: ${uploadError.message}` }, { status: 500 });
    }

    const { data: { publicUrl } } = client.storage.from('works').getPublicUrl(filename);
    imageUrl = publicUrl;
  }

  const slug = `work-${Date.now()}`;

  const { data, error } = await client
    .from('works')
    .insert({ artist_id: artistId, slug, title, materials, created_at: createdAt, age, image: imageUrl })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
