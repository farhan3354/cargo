"use client";

import { useState } from "react";
import { deleteTestimonial } from "@/app/actions/admin";
import { Trash2, Edit2, Star, User } from "lucide-react";
import ConfirmDialog from "@/components/Admin/ConfirmDialog";
import EditTestimonialForm from "./EditTestimonialForm";
import { toast } from "sonner";

type Testimonial = {
  id: string;
  name: string;
  text: string;
  company: string;
  logoUrl?: string;
  logoCloudinaryId?: string;
  hoverColor?: string;
  order?: number;
};

interface Props {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsList({ initialTestimonials }: Props) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [testimonialToEdit, setTestimonialToEdit] = useState<Testimonial | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success("Testimonial deleted successfully");
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  const onConfirm = async () => {
    if (selectedId) {
      await handleDelete(selectedId);
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const openEdit = (t: Testimonial) => {
    setTestimonialToEdit(t);
    setEditOpen(true);
  };

  const onEditSuccess = (updated: Testimonial) => {
    setTestimonials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditOpen(false);
    setTestimonialToEdit(null);
  };

  return (
    <>
      {testimonials.length === 0 ? (
        <div className="p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#F9F7FA] flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-[#66556B]" />
          </div>
          <p className="text-[#66556B] font-medium">No testimonials yet.</p>
          <p className="text-sm text-[#66556B]/70 mt-1">Add your first customer review using the form on the left.</p>
        </div>
      ) : (
        <ul className="divide-y divide-[#E5E7EB]">
          {testimonials.map((t) => (
            <li
              key={t.id}
              className="p-5 flex gap-4 items-start hover:bg-[#F9F7FA] transition-colors"
            >
              {/* Logo / Avatar */}
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 flex items-center justify-center">
                {t.logoUrl ? (
                  <img src={t.logoUrl} alt={t.name} className="w-full h-full object-contain p-1" />
                ) : (
                  <User className="w-6 h-6 text-gray-400" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-[#110713]">{t.name}</h3>
                  <span className="text-xs bg-[#EEF0FF] text-[#1F2288] px-2 py-0.5 rounded-full font-medium">{t.company}</span>
                </div>
                <div className="flex text-yellow-400 mt-1 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-3.5 h-3.5" />)}
                </div>
                <p className="text-sm text-[#66556B] line-clamp-2">{t.text}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  type="button"
                  aria-label="Edit testimonial"
                  className="h-8 w-8 flex items-center justify-center rounded bg-[#1F2288] text-white hover:bg-[#1F2288]/90 transition"
                  onClick={() => openEdit(t)}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Delete testimonial"
                  className="h-8 w-8 flex items-center justify-center rounded bg-red-600 text-white hover:bg-red-700 transition"
                  onClick={() => { setConfirmOpen(true); setSelectedId(t.id); }}
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
        title="Delete Testimonial"
        description="Are you sure you want to delete this customer review? This action cannot be undone."
        onConfirm={onConfirm}
      />

      {editOpen && testimonialToEdit && (
        <EditTestimonialForm
          testimonial={testimonialToEdit}
          onSuccess={onEditSuccess}
          onCancel={() => setEditOpen(false)}
        />
      )}
    </>
  );
}
