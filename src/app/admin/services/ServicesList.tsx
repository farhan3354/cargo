'use client';

import { useState } from "react";
import Image from "next/image";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/Admin/ConfirmDialog";
import EditServiceForm from "./EditServiceForm";
import { deleteService } from "@/app/actions/admin";

type Service = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
};

interface Props {
  initialServices: Service[];
}

export default function ServicesList({ initialServices }: Props) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  const handleDelete = async (id: string) => {
    await deleteService(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const onConfirm = async () => {
    if (selectedId) {
      await handleDelete(selectedId);
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const openEdit = (service: Service) => {
    setServiceToEdit(service);
    setEditOpen(true);
  };

  const onEditSuccess = (updated: Service) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
    setEditOpen(false);
    setServiceToEdit(null);
  };

  return (
    <>
      {services.length === 0 ? (
        <div className="p-8 text-center text-[#66556B]">
          No services found. Add one to get started.
        </div>
      ) : (
        <ul className="divide-y divide-[#E5E7EB]">
          {services.map((service) => (
            <li
              key={service.id}
              className="p-6 flex gap-6 items-start hover:bg-[#F9F7FA] transition-colors"
            >
              {service.imageUrl ? (
                <div className="w-24 h-24 relative rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <Image src={service.imageUrl} alt={service.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-xl bg-[#F9F7FA] flex items-center justify-center text-[#66556B] text-sm">
                  No Image
                </div>
              )}
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-bold text-[#110713]">{service.title}</h3>
                {service.description && (
                  <p className="text-sm text-[#66556B]">{service.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="h-8 w-8 flex items-center justify-center rounded bg-[#1F2288] text-white hover:bg-[#1F2288]/90"
                  onClick={() => openEdit(service)}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="h-8 w-8 flex items-center justify-center rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={() => {
                    setConfirmOpen(true);
                    setSelectedId(service.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        onConfirm={onConfirm}
      />

      {editOpen && serviceToEdit && (
        <EditServiceForm
          service={serviceToEdit}
          onSuccess={onEditSuccess}
          onCancel={() => setEditOpen(false)}
        />
      )}
    </>
  );
}
