import { getServices } from "@/app/actions/admin";
import { ServiceForm } from "./ServiceForm";
import ServicesList from "./ServicesList";

export default async function ServicesPage() {
  let services: Awaited<ReturnType<typeof getServices>> = [];
  try {
    services = await getServices();
  } catch {
    services = [];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#110713]">Manage Services</h1>
        <p className="text-[#66556B] mt-2">Add and manage the services displayed on your website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB]">
          <h2 className="text-xl font-semibold mb-4 text-[#110713]">Add New Service</h2>
          <ServiceForm />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-[#110713]">Current Services</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
            <ServicesList initialServices={services as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
