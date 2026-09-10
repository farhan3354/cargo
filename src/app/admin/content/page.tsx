import { getSiteContent } from "@/app/actions/admin";
import { SiteContentForm } from "./SiteContentForm";

export default async function SiteContentPage() {
  let content: Awaited<ReturnType<typeof getSiteContent>> = [];
  try {
    content = await getSiteContent();
  } catch {
    content = [];
  }

  return (
    <div className="mt-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#110713]">Site Content</h1>
        <p className="text-[#66556B] mt-2">
          Manage the Hero section, footer text, and contact page content across your website.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB]">
        <SiteContentForm initialContent={content} />
      </div>
    </div>
  );
}
