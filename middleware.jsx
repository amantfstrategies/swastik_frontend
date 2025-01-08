import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the authorization header (make sure it's lowercase)
  // const authorizationHeader = request.headers.get('authorization'); 

  // console.log("Authorization Header:", authorizationHeader);

  // const url = new URL(request.url);
  // const isAdminLoggedIn = authorizationHeader && authorizationHeader.startsWith('Bearer ');

  // // Redirect to login if not logged in and not on the login page
  // if (!isAdminLoggedIn && url.pathname !== '/admin/login') {
  //   url.pathname = '/admin/login';
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to admin routes
};
