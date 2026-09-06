"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  cookies().delete("admin_session");
  redirect(process.env.NEXT_PUBLIC_FRONTEND_URL?.replace(/\\/+$/, '') || '/admin/login');
}
