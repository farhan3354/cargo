"use client";

import { useState } from "react";
import { createOffice } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MediaPicker from "@/components/MediaPicker";
import { toast } from "sonner";

export function OfficeForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await createOffice({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        address: formData.get("address") as string,
        imageUrl,
      });
      const form = document.getElementById("office-form") as HTMLFormElement;
      form.reset();
      setImageUrl("");
      toast.success("Office added successfully!");
    } catch {
      toast.error("Failed to add office. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form id="office-form" action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Office Name</Label>
        <Input id="name" name="name" required placeholder="e.g. New York HQ" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Contact Email</Label>
        <Input id="email" name="email" type="email" required placeholder="contact@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" placeholder="+1 234 567 8900" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" placeholder="123 Main St, City" />
      </div>

      <div className="space-y-2">
        <Label>Office Image</Label>
        {imageUrl ? (
          <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Uploaded" className="object-cover w-full h-full" />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-7"
              onClick={() => setImageUrl("")}
            >
              Remove
            </Button>
          </div>
        ) : (
          <MediaPicker onMediaSelect={(url) => setImageUrl(url)} />
        )}
      </div>

      <Button type="submit" className="w-full bg-[#1F2288] hover:bg-[#1F2288]/90" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Office"}
      </Button>
    </form>
  );
}
