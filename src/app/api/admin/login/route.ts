import { accountsEnabled } from '@/lib/account-settings';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  if (accountsEnabled()) return NextResponse.json({ error: '로그인 기반 관리 화면을 이용해 주세요.' }, { status: 410 });
  const { password } = await request.json();
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: '비밀번호가 틀렸어요' }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set('admin_token', password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
