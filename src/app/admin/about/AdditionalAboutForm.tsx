"use client";

import { useState } from "react";
import { updateAbout } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import MediaPicker from "@/components/MediaPicker";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AboutData {
  _id?: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  subtitle?: string;
  mission?: string;
  vision?: string;
  extraContent?: string;
  extraImageUrl?: string;
}

export function AdditionalAboutForm({ initialData }: { initialData: AboutData | null }) {
  const [extraImageUrl, setExtraImageUrl] = useState(initialData?.extraImageUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      // We merge with existing home-about fields to avoid overwriting them
      const result = await updateAbout({
        // Preserve existing home section values
        title: initialData?.title || "About Us",
        content: initialData?.content || "",
        imageUrl: initialData?.imageUrl,
        // New about-page detail fields
        subtitle: formData.get("subtitle") as string,
        mission: formData.get("mission") as string,
        vision: formData.get("vision") as string,
      });

      if (result?.success === false) {
        toast.error((result as any).error || "Failed to update.");
      } else {
        toast.success("About page details updated successfully!");
        router.refresh();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update about page details.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="subtitle">Page Subtitle</Label>
        <Input
          id="subtitle"
          name="subtitle"
          defaultValue={initialData?.subtitle || ""}
          placeholder="e.g. Your trusted cargo partner since 2005"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mission">Our Mission</Label>
        <Textarea
          id="mission"
          name="mission"
          rows={4}
          defaultValue={initialData?.mission || ""}
          placeholder="Describe the company's mission..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="vision">Our Vision</Label>
        <Textarea
          id="vision"
          name="vision"
          rows={4}
          defaultValue={initialData?.vision || ""}
          placeholder="Describe the company's vision..."
        />
      </div>


      <div className="flex gap-4">
        <Button
          type="submit"
          className="bg-[#1F2288] hover:bg-[#1F2288]/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save About Page Details"}
        </Button>
      </div>
    </form>
  );
}
