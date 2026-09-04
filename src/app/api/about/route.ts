import { api } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await api.getAbout();
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: true, data: null });
  }
}
