import Link from "next/link";
import { Building2, Image as ImageIcon, Mail, FileText, Briefcase, Video, Info } from "lucide-react";
import { getContactSubmissions } from "@/app/actions/admin";
import { AdminStats, RecentSubmissions } from "@/components/AdminStats";

export default async function AdminDashboard() {
  let submissions: Awaited<ReturnType<typeof getContactSubmissions>> = [];
  try {
    submissions = await getContactSubmissions();
  } catch {
    submissions = [];
  }
  const unreadCount = submissions.filter((s) => s.status === "pending").length;

  const cards = [
    {
      href: "/admin/offices",
      icon: Building2,
      title: "Manage Offices",
      desc: "Manage office locations, contact emails, and branch images.",
      color: "bg-[#1F2288]/10 text-[#1F2288]",
    },
    {
      href: "/admin/content",
      icon: ImageIcon,
      title: "Site Content",
      desc: "Update section images, background videos, and texts dynamically.",
      color: "bg-purple-100 text-purple-700",
    },
    {
      href: "/admin/services",
      icon: Briefcase,
      title: "Manage Services",
      desc: "Add, edit, and reorder shipping and logistics services.",
      color: "bg-blue-100 text-blue-700",
    },
    {
      href: "/admin/videos",
      icon: Video,
      title: "Manage Videos",
      desc: "Add and manage promotional or instructional videos.",
      color: "bg-red-100 text-red-700",
    },
    {
      href: "/admin/about",
      icon: Info,
      title: "About Page",
      desc: "Edit the main About Us content and imagery.",
      color: "bg-teal-100 text-teal-700",
    },
    {
      href: "/admin/emails",
      icon: Mail,
      title: "Contact Submissions",
      desc: "View and manage contact form submissions.",
      color: "bg-green-100 text-green-700",
      badge: unreadCount,
    },
    {
      href: "/admin/settings",
      icon: FileText,
      title: "Email Settings",
      desc: "Configure SMTP accounts and email templates.",
      color: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#110713] via-[#1F2288] to-purple-900 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium text-white shadow-sm">Administration</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-blue-100 mt-2 max-w-xl text-lg font-medium opacity-90">
            Welcome back to the Manar Cargo Administration Panel. Get a quick overview and manage your website content.
          </p>
        </div>
      </div>

      <AdminStats submissions={submissions} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ href, icon: Icon, title, desc, color, badge }) => (
          <Link
            key={href}
            href={href}
            className="group block p-6 bg-white/50 backdrop-blur-lg rounded-3xl border border-gray-200/60 shadow-lg hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-transparent rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500 ease-out z-0"></div>
            <div className="flex flex-col h-full relative z-10 space-y-4">
              <div className={`p-4 rounded-2xl w-fit ${color} relative shadow-sm ring-1 ring-black/5`}>
                <Icon className="w-7 h-7" />
                {badge !== undefined && badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md ring-2 ring-white">
                    {badge}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#1F2288] transition-colors">{title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <RecentSubmissions submissions={submissions} limit={5} />
    </div>
  );
}
