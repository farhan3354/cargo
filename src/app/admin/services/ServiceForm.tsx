"use client";

import { useState } from "react";
import { createService } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MediaPicker from "@/components/MediaPicker";
import { toast } from "sonner";

export function ServiceForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await createService({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        imageUrl,
        cloudinaryId: cloudinaryId || undefined,
      });
      const form = document.getElementById("service-form") as HTMLFormElement;
      form.reset();
      setImageUrl("");
      setCloudinaryId("");
      toast.success("Service added successfully!");
    } catch {
      toast.error("Failed to add service. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form id="service-form" action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Service Title</Label>
        <Input id="title" name="title" required placeholder="e.g. Domestic Cargo" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Brief description of the service..." />
      </div>

      <div className="space-y-2">
        <Label>Service Image</Label>
        <p className="text-xs text-red-500 font-medium">Recommended size: 800x600px (4:3 aspect ratio) for best appearance.</p>
        {imageUrl ? (
          <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100">
            <img src={imageUrl} alt="Uploaded" className="object-cover w-full h-full" />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-7"
              onClick={() => { setImageUrl(""); setCloudinaryId(""); }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <MediaPicker onMediaSelect={(url, id) => { setImageUrl(url); if (id) setCloudinaryId(id); }} />
        )}
      </div>

      <Button type="submit" className="w-full bg-[#1F2288] hover:bg-[#1F2288]/90" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Service"}
      </Button>
    </form>
  );
}
