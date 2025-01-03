import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAdminLoggedIn = request.cookies.get('authToken');
  const url = new URL(request.url);

  // Avoid redirecting if we're already on the login page
  if (!isAdminLoggedIn && url.pathname !== '/admin/login') {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], 
};
