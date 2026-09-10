import { getAbout } from "@/app/actions/admin";
import FullAboutForm from "./FullAboutForm";

export default async function AboutPageAdmin() {
  let aboutData = null;
  try {
    aboutData = await getAbout();
  } catch {
    aboutData = null;
  }

  return (
    <div className="mt-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#110713]">Manage About Page</h1>
        <p className="text-[#66556B] mt-2">
          Edit every section of the About page — hero banner, company story, mission/vision, stats, and home page about section.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB]">
        <FullAboutForm initialData={aboutData} />
      </div>
    </div>
  );
}
