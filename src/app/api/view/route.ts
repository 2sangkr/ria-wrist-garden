import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const { path } = await request.json();
  if (!path || typeof path !== 'string') {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const client = getServiceClient();
  await client.from('page_views').insert({ path });

  return NextResponse.json({ ok: true });
}
