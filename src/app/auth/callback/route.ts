import { NextRequest, NextResponse } from 'next/server';
import { accountClient } from '@/lib/account-auth';
import { accountsEnabled } from '@/lib/account-settings';
export async function GET(request: NextRequest) {
  if (accountsEnabled()) {
    const code = request.nextUrl.searchParams.get('code');
    if (code) {
      const client = await accountClient();
      const { error } = await client.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL(request.nextUrl.searchParams.get('next') === '/my/apply' ? '/my/apply' : '/my', request.url));
    }
  }
  return NextResponse.redirect(new URL('/login?error=1' + (request.nextUrl.searchParams.get('next') === '/my/apply' ? '&next=/my/apply' : ''), request.url));
}

