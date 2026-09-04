import { ReactNode } from "react";
import AdminLayoutClient from "./AdminLayoutClient";
import { BackendStatusBanner } from "@/components/BackendStatusBanner";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminLayoutClient>
      <BackendStatusBanner />
      {children}
    </AdminLayoutClient>
  );
}
