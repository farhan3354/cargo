import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBackendBaseUrl } from "@/lib/api";

async function backendHeaders() {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function GET() {
  try {
    const res = await fetch(`${getBackendBaseUrl()}/api/smtp-accounts`, {
      headers: await backendHeaders(),
      cache: "no-store",
    });
    const json = await res.json();
    return NextResponse.json(json.data ?? []);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${getBackendBaseUrl()}/api/smtp-accounts`, {
      method: "POST",
      headers: await backendHeaders(),
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) return NextResponse.json(json, { status: res.status });
    return NextResponse.json(json.data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add SMTP account" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const res = await fetch(`${getBackendBaseUrl()}/api/smtp-accounts/${id}`, {
      method: "DELETE",
      headers: await backendHeaders(),
    });
    const json = await res.json();
    if (!res.ok) return NextResponse.json(json, { status: res.status });
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
