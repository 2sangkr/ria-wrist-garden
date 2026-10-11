import { NextRequest, NextResponse } from 'next/server';
import { accountContext } from '@/lib/account-auth';
import { getServiceClient } from '@/lib/supabase';
export async function GET(request: NextRequest) {
  const workId = request.nextUrl.searchParams.get('work_id');
  if (!workId) return NextResponse.json({ error: '작품을 확인해 주세요.' }, { status: 400 });
  const client = getServiceClient();
  const work = await client.from('works').select('id').eq('id',workId).is('deleted_at',null).maybeSingle();
  if (work.error) return NextResponse.json({ error: '조회하지 못했어요.' }, { status: 503 });
  if (!work.data) return NextResponse.json({ error: '작품이 없습니다.' }, { status: 404 });
  const ctx = await accountContext();
  const { count, error } = await client.from('work_likes').select('*',{count:'exact',head:true}).eq('work_id',workId);
  if (error || count === null) return NextResponse.json({error:'좋아요를 불러오지 못했어요.'},{status:503});
  let liked = false;
  if(ctx) {
    const result = await ctx.client.from('work_likes').select('work_id').eq('work_id',workId).eq('user_id',ctx.user.id).maybeSingle();
    if(result.error) return NextResponse.json({error:'좋아요를 불러오지 못했어요.'},{status:503});
    liked = !!result.data;
  }
  return NextResponse.json({count,liked},{headers:{'Cache-Control':'no-store'}});
}
export async function POST(request: NextRequest) {
  if(request.headers.get('origin') !== request.nextUrl.origin) return NextResponse.json({error:'잘못된 요청입니다.'},{status:403});
  const ctx = await accountContext();
  if(!ctx) return NextResponse.json({error:'로그인 후 좋아요를 눌러 주세요.'},{status:401});
  let body;
  try {body=await request.json();} catch {return NextResponse.json({error:'잘못된 요청입니다.'},{status:400});}
  if(!body?.work_id || typeof body.liked !== 'boolean') return NextResponse.json({error:'잘못된 요청입니다.'},{status:400});
  const {data,error} = await ctx.client.rpc('set_work_like',{target_work:body.work_id,desired_liked:body.liked});
  if(error) return NextResponse.json({error:'좋아요를 저장하지 못했어요. 다시 시도해 주세요.'},{status:503});
  return NextResponse.json(data,{headers:{'Cache-Control':'no-store'}});
}
