import { NextResponse } from 'next/server';
import { getBackendBaseUrl } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const baseUrl = getBackendBaseUrl();
    console.log('Proxying login request to backend', { baseUrl, endpoint: `${baseUrl}/api/admin/login` });

    const res = await fetch(`${baseUrl}/api/admin/login`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log('Backend login response', { status: res.status, data });

    if (res.ok && data.token) {
      const response = NextResponse.json({ success: true, admin: data.admin });

      response.cookies.set('admin_token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: data.error || 'Invalid credentials' },
      { status: res.status }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
