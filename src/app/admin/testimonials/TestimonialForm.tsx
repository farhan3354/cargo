"use client";

import { useState } from "react";
import { createTestimonial } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MediaPicker from "@/components/MediaPicker";
import { toast } from "sonner";

export function TestimonialForm() {
  const [logoUrl, setLogoUrl] = useState("");
  const [logoCloudinaryId, setLogoCloudinaryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await createTestimonial({
        name: formData.get("name") as string,
        text: formData.get("text") as string,
        company: formData.get("company") as string,
        hoverColor: formData.get("hoverColor") as string,
        order: Number(formData.get("order") || 0),
        logoUrl,
        logoCloudinaryId: logoCloudinaryId || undefined,
      });
      const form = document.getElementById("testimonial-form") as HTMLFormElement;
      form.reset();
      setLogoUrl("");
      setLogoCloudinaryId("");
      toast.success("Testimonial added successfully!");
    } catch {
      toast.error("Failed to add testimonial. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form id="testimonial-form" action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Customer Name *</Label>
        <Input id="name" name="name" required placeholder="e.g. Mohamed Ali" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company / Role *</Label>
        <Input id="company" name="company" required placeholder="e.g. Commercial Client" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="text">Review Text *</Label>
        <Textarea id="text" name="text" required rows={4} placeholder="Write the customer's review here..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hoverColor">Hover Color Class (optional)</Label>
        <Input id="hoverColor" name="hoverColor" placeholder="e.g. hover:text-[#FF9900]" />
        <p className="text-xs text-gray-400">Tailwind hover color class for the logo on scroll</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="order">Display Order</Label>
        <Input id="order" name="order" type="number" placeholder="0" defaultValue="0" />
      </div>

      <div className="space-y-2">
        <Label>Company Logo (optional)</Label>
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

      <Button
        type="submit"
        className="w-full bg-[#1F2288] hover:bg-[#1F2288]/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Testimonial"}
      </Button>
    </form>
  );
}
