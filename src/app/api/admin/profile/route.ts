import { NextResponse } from 'next/server';
import { getBackendBaseUrl } from '@/lib/api';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const baseUrl = getBackendBaseUrl();
    
    // The admin_token cookie is httpOnly, so we must read it server-side
    const tokenCookie = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('admin_token='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;
    
    const authHeader = token ? `Bearer ${token}` : request.headers.get('Authorization');

    console.log('Proxying profile update request to backend', { baseUrl, endpoint: `${baseUrl}/api/admin/profile` });

    const res = await fetch(`${baseUrl}/api/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { 'Authorization': authHeader })
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log('Backend profile response', { status: res.status, data });

    if (res.ok) {
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json(
      { success: false, error: data.error || 'Failed to update profile' },
      { status: res.status }
    );
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
