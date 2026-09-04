import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBackendBaseUrl } from "@/lib/api";

async function backendHeaders(request?: NextRequest) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  // Forward the admin JWT from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${getBackendBaseUrl()}/api/email-templates`, {
      headers: await backendHeaders(request),
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
    const res = await fetch(`${getBackendBaseUrl()}/api/email-templates`, {
      method: "POST",
      headers: await backendHeaders(request),
      body: JSON.stringify({
        templateId: body.id || body.templateId,
        name: body.name,
        subject: body.subject,
        htmlContent: body.htmlContent,
        plainTextContent: body.plainTextContent,
        variables: body.variables,
      }),
    });
    const json = await res.json();
    if (!res.ok) return NextResponse.json(json, { status: res.status });
    return NextResponse.json(json.data);
  } catch {
    return NextResponse.json({ error: "Failed to save template" }, { status: 500 });
  }
}
