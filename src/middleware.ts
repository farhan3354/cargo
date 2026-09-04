import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect the /admin routes, but exclude /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token');
    
    // If there is no token, redirect to the login page
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // The actual token verification happens in the Node.js backend when API requests are made.
    // For middleware, checking existence is sufficient to prevent unauthorized UI access.
    // Invalid tokens will result in 401s from the backend, which the frontend should handle.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};