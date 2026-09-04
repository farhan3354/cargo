import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL('/admin/login', request.url);
  const response = NextResponse.redirect(url);
  
  // Clear the admin_token cookie
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}