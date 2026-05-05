import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const { data, error } = await supabase.from('artists').select('id, name').limit(5);

  return NextResponse.json({
    url_set: !!url,
    key_set: !!key,
    key_prefix: key?.slice(0, 15),
    data,
    error: error ? { message: error.message, code: error.code } : null,
  });
}
