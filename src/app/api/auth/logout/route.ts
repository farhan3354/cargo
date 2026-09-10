import { NextResponse, NextRequest } from 'next/server';

function clearAuthCookies(response: NextResponse) {
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  return response;
}

export async function POST() {
  const response = NextResponse.json({ success: true });
  return clearAuthCookies(response);
}

export async function GET(request: NextRequest) {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL?.trim();
  let targetUrl: URL;

  if (frontendUrl && frontendUrl.startsWith('http')) {
    targetUrl = new URL('/admin/login', frontendUrl);
  } else {
    targetUrl = request.nextUrl.clone();
    targetUrl.pathname = '/admin/login';
  }

  const response = NextResponse.redirect(targetUrl);
  return clearAuthCookies(response);
}