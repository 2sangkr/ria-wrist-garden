import { accountsEnabled } from '@/lib/account-settings';
import { NextResponse } from 'next/server';

export async function POST() {
  if (accountsEnabled()) return NextResponse.json({ error: '로그인 기반 관리 화면을 이용해 주세요.' }, { status: 410 });
  const response = NextResponse.json({ ok: true });
  response.cookies.delete('admin_token');
  return response;
}
