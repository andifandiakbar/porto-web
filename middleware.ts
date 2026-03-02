import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardPage && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};