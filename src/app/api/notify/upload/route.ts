import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { sendTelegram } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');
  if (secret !== process.env.SUPABASE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  if (body.type !== 'INSERT') return NextResponse.json({ ok: true });

  const work = body.record;
  if (!work?.title) return NextResponse.json({ ok: true });

  const client = getServiceClient();
  const { data: artist } = await client
    .from('artists')
    .select('name, slug')
    .eq('id', work.artist_id)
    .single();

  const artistName = artist?.name ?? '알 수 없음';
  const artistSlug = artist?.slug ?? '';

  await sendTelegram(
    `🆕 <b>새 작품 업로드!</b>\n\n` +
    `👩‍🎨 ${artistName}\n` +
    `🖼 ${work.title}\n\n` +
    `https://mymomo.gallery/artist/${artistSlug}`,
  );

  return NextResponse.json({ ok: true });
}
