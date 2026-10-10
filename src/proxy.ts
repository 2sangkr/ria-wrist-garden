import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { accountsEnabled } from '@/lib/account-settings';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!accountsEnabled()) {
    if (pathname === '/api/admin/login') return NextResponse.next();
    if (pathname.startsWith('/api/admin') || pathname.startsWith('/admin/dashboard')) {
      const token = request.cookies.get('admin_token')?.value;
      const expected = process.env.ADMIN_PASSWORD;
      if (!expected || token !== expected) {
        if (pathname.startsWith('/api/admin')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
    return NextResponse.next();
  }
  // Old password-based mutation routes must not bypass account authorization.
  if (pathname.startsWith('/api/admin')) return NextResponse.json({ error: '로그인 기반 관리 화면을 이용해 주세요.' }, { status: 410 });
  if (pathname === '/admin' || pathname.startsWith('/admin/dashboard')) return NextResponse.redirect(new URL('/my/admin', request.url));
  let response = NextResponse.next({ request });
  if (!request.cookies.getAll().some(c => c.name.startsWith('sb-'))) return response;
  const client = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: values => {
        values.forEach(({name,value}) => request.cookies.set(name,value));
        response = NextResponse.next({ request });
        values.forEach(({name,value,options}) => response.cookies.set(name,value,options));
      },
    },
  });
  await client.auth.getUser();
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
