"use client";

import { useState } from "react";
import { updateTestimonial } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MediaPicker from "@/components/MediaPicker";
import { toast } from "sonner";
import { X } from "lucide-react";

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
  testimonial: Testimonial;
  onSuccess: (updated: Testimonial) => void;
  onCancel: () => void;
}

export default function EditTestimonialForm({ testimonial, onSuccess, onCancel }: Props) {
  const [logoUrl, setLogoUrl] = useState(testimonial.logoUrl || "");
  const [logoCloudinaryId, setLogoCloudinaryId] = useState(testimonial.logoCloudinaryId || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      const updated = await updateTestimonial(testimonial.id, {
        name: formData.get("name") as string,
        text: formData.get("text") as string,
        company: formData.get("company") as string,
        hoverColor: formData.get("hoverColor") as string,
        order: Number(formData.get("order") || 0),
        logoUrl,
        logoCloudinaryId: logoCloudinaryId || undefined,
      });
      toast.success("Testimonial updated!");
      onSuccess(updated as Testimonial);
    } catch {
      toast.error("Failed to update testimonial.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[#110713]">Edit Testimonial</h3>
          <button
            type="button"
            onClick={onCancel}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form action={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Customer Name *</Label>
            <Input id="edit-name" name="name" required defaultValue={testimonial.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-company">Company / Role *</Label>
            <Input id="edit-company" name="company" required defaultValue={testimonial.company} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-text">Review Text *</Label>
            <Textarea id="edit-text" name="text" required rows={4} defaultValue={testimonial.text} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-hoverColor">Hover Color Class</Label>
            <Input id="edit-hoverColor" name="hoverColor" placeholder="e.g. hover:text-[#FF9900]" defaultValue={testimonial.hoverColor || ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-order">Display Order</Label>
            <Input id="edit-order" name="order" type="number" defaultValue={testimonial.order ?? 0} />
          </div>

          <div className="space-y-2">
            <Label>Company Logo</Label>
            <p className="text-xs text-red-500 font-medium">Recommended size: 200x200px (square) or horizontal logo for best appearance.</p>
            {logoUrl ? (
              <div className="relative w-full h-24 rounded-md overflow-hidden bg-gray-100 border">
                <img src={logoUrl} alt="Logo" className="object-contain w-full h-full p-2" />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-7"
                  onClick={() => { setLogoUrl(""); setLogoCloudinaryId(""); }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <MediaPicker
                onMediaSelect={(url, id) => {
                  setLogoUrl(url);
                  if (id) setLogoCloudinaryId(id);
                }}
              />
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#1F2288] hover:bg-[#1F2288]/90" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
