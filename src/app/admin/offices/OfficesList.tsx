'use client';

import { useState } from "react";
import Image from "next/image";
import { Trash2, Edit2, Phone, MapPin } from "lucide-react";
import ConfirmDialog from "@/components/Admin/ConfirmDialog";
import EditOfficeForm from "./EditOfficeForm";
import { deleteOffice, hardDeleteOffice } from "@/app/actions/admin";
import { toast } from "sonner";

type Office = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  phones?: string[];
  description?: string;
  address?: string;
  location?: string;
  country?: string;
  imageUrl?: string;
};

interface Props {
  initialOffices: Office[];
}

export default function OfficesList({ initialOffices }: Props) {
  const [offices, setOffices] = useState<Office[]>(initialOffices);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [hardConfirmOpen, setHardConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [officeToEdit, setOfficeToEdit] = useState<Office | null>(null);

  const handleSoftDelete = async (id: string) => {
    try {
      await deleteOffice(id);
      setOffices((prev) => prev.filter((o) => o.id !== id));
      toast.success("Office hidden from website (soft-deleted).");
    } catch {
      toast.error("Failed to soft-delete office.");
    }
  };

  const handleHardDelete = async (id: string) => {
    try {
      await hardDeleteOffice(id);
      setOffices((prev) => prev.filter((o) => o.id !== id));
      toast.success("Office permanently deleted from database.");
    } catch {
      toast.error("Failed to permanently delete office.");
    }
  };

  const onConfirmSoft = async () => {
    if (selectedId) {
      await handleSoftDelete(selectedId);
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const onConfirmHard = async () => {
    if (selectedId) {
      await handleHardDelete(selectedId);
      setHardConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const openEdit = (office: Office) => {
    setOfficeToEdit(office);
    setEditOpen(true);
  };

  const onEditSuccess = (updated: Office) => {
    setOffices((prev) =>
      prev.map((o) => (o.id === updated.id ? updated : o))
    );
    setEditOpen(false);
    setOfficeToEdit(null);
  };

  return (
    <>
      {offices.length === 0 ? (
        <div className="p-8 text-center text-[#66556B]">
          No offices found. Add one to get started.
        </div>
      ) : (
        <ul className="divide-y divide-[#E5E7EB]">
          {offices.map((office) => {
            const phones = office.phones && office.phones.length > 0
              ? office.phones
              : office.phone
                ? office.phone.split(",").map((p) => p.trim())
                : [];

            return (
              <li
                key={office.id}
                className="p-6 flex gap-6 items-start hover:bg-[#F9F7FA] transition-colors"
              >
                {office.imageUrl ? (
                  <div className="w-24 h-24 relative rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image src={office.imageUrl} alt={office.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-[#F9F7FA] flex items-center justify-center text-[#66556B] text-sm">
                    No Image
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-bold text-[#110713]">{office.name}</h3>

                  {office.description && (
                    <p className="text-sm text-[#66556B] italic">{office.description}</p>
                  )}

                  <p className="text-sm text-[#66556B]"><strong>Email:</strong> {office.email}</p>

                  {phones.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Phone className="w-3.5 h-3.5 text-[#1F2288]" />
                      {phones.map((p, i) => (
                        <span key={i} className="text-sm text-[#66556B]">
                          {p}{i < phones.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  )}

                  {office.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1F2288]" />
                      <span className="text-sm text-[#66556B]">{office.location}</span>
                      {office.country && (
                        <span className="text-xs text-[#66556B] bg-[#F3F4F6] rounded px-1.5 py-0.5 ml-1">
                          {office.country}
                        </span>
                      )}
                    </div>
                  )}

                  {office.address && <p className="text-sm text-[#66556B]"><strong>Address:</strong> {office.address}</p>}
                </div>
                <div className="flex gap-2 flex-col">
                  <button
                    type="button"
                    title="Edit"
                    className="h-8 w-8 flex items-center justify-center rounded bg-[#1F2288] text-white hover:bg-[#1F2288]/90"
                    onClick={() => openEdit(office)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Hide from website (soft delete)"
                    className="h-8 w-8 flex items-center justify-center rounded bg-orange-500 text-white hover:bg-orange-600"
                    onClick={() => {
                      setConfirmOpen(true);
                      setSelectedId(office.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Hide Office"
        description="This will hide the office from your website (soft delete). The record stays in the database."
        onConfirm={onConfirmSoft}
      />

      {editOpen && officeToEdit && (
        <EditOfficeForm
          office={officeToEdit}
          onSuccess={onEditSuccess}
          onCancel={() => setEditOpen(false)}
        />
      )}
    </>
  );
}
