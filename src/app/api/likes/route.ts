import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const workId = searchParams.get('work_id');
  const visitorId = searchParams.get('visitor_id');

  if (!workId) return NextResponse.json({ error: 'work_id required' }, { status: 400 });

  const client = getServiceClient();

  const { count } = await client
    .from('work_likes')
    .select('*', { count: 'exact', head: true })
    .eq('work_id', workId);

  let liked = false;
  if (visitorId) {
    const { data } = await client
      .from('work_likes')
      .select('id')
      .eq('work_id', workId)
      .eq('visitor_id', visitorId)
      .maybeSingle();
    liked = !!data;
  }

  return NextResponse.json({ count: count ?? 0, liked });
}

export async function POST(request: NextRequest) {
  const { work_id, visitor_id } = await request.json();

  if (!work_id || !visitor_id) {
    return NextResponse.json({ error: 'work_id and visitor_id required' }, { status: 400 });
  }

  const client = getServiceClient();

  const { data: existing } = await client
    .from('work_likes')
    .select('id')
    .eq('work_id', work_id)
    .eq('visitor_id', visitor_id)
    .maybeSingle();

  if (existing) {
    await client.from('work_likes').delete().eq('id', existing.id);
  } else {
    await client.from('work_likes').insert({ work_id, visitor_id });
  }

  const { count } = await client
    .from('work_likes')
    .select('*', { count: 'exact', head: true })
    .eq('work_id', work_id);

  return NextResponse.json({ count: count ?? 0, liked: !existing });
}
