import { NextResponse } from 'next/server';
import { getBackendBaseUrl } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const baseUrl = getBackendBaseUrl();

    // Call the Node.js backend
    const res = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      // Create response
      const response = NextResponse.json({ success: true, admin: data.admin });
      
      // Set the JWT token in an HTTP-only cookie
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