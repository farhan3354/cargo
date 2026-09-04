"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { LayoutDashboard, Building2, Phone, Mail, Settings, ExternalLink, Briefcase, Video, Info } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/offices", label: "Manage Offices", icon: Building2 },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/about", label: "About Page", icon: Info },
  { href: "/admin/content", label: "Footer & Contact", icon: Phone },
  { href: "/admin/emails", label: "Contact Submissions", icon: Mail },
  { href: "/admin/settings", label: "Email Settings", icon: Settings },
];

export default function AdminLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#F9F7FA]">
      <aside className="w-64 bg-[#110713] text-white hidden md:flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1F2288] flex items-center justify-center font-bold text-sm">
              MC
            </div>
            <div>
              <p className="font-bold text-white leading-tight">Manar Cargo</p>
              <p className="text-xs text-white/60">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                pathname === href ? "bg-[#1F2288] text-white" : "text-white/80 hover:bg-[#1F2288] hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${pathname === href ? "text-white" : "text-white/50 group-hover:text-white"}`} />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 space-y-2">
           <a
             href="/api/auth/logout"
             className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
           >
             Logout
           </a>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Website
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="md:hidden bg-[#110713] text-white px-4 py-3 flex items-center justify-between">
          <span className="font-bold">Manar Cargo Admin</span>
          <Link href="/" className="text-xs text-white/60 hover:text-white">View Site</Link>
        </div>
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
