import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const client = getServiceClient();

  const { data: work } = await client.from('works').select('image').eq('id', id).single();

  const { error } = await client.from('works').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (work?.image?.includes('/storage/v1/object/public/works/')) {
    const path = work.image.split('/storage/v1/object/public/works/')[1];
    await client.storage.from('works').remove([path]);
  }

  return NextResponse.json({ ok: true });
}
