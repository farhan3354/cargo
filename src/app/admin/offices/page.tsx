import { getOffices } from "@/app/actions/admin";
import { OfficeForm } from "./OfficeForm";
import OfficesList from "./OfficesList";

export default async function OfficesPage() {
  let offices: Awaited<ReturnType<typeof getOffices>> = [];
  try {
    offices = await getOffices();
  } catch {
    offices = [];
  }

  return (
    <div className="mt-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#110713]">Manage Offices</h1>
        <p className="text-[#66556B] mt-2">Add and manage office locations displayed on your website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB]">
          <h2 className="text-xl font-semibold mb-4 text-[#110713]">Add New Office</h2>
          <OfficeForm />
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-[#110713]">Current Offices</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
            <OfficesList initialOffices={offices as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
