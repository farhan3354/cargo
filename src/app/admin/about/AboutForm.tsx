"use client";

import { useState } from "react";
import { updateAbout } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MediaPicker from "@/components/MediaPicker";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AboutData {
  _id?: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function AboutForm({ initialData }: { initialData: AboutData | null }) {
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      const result = await updateAbout({
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        imageUrl: imageUrl || undefined,
      });
      
      if (result.success) {
        toast.success("About page updated successfully!");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update about page.");
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error("Failed to update about page.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">About Page Title</Label>
        <Input 
          id="title" 
          name="title" 
          required 
          defaultValue={initialData?.title || ""} 
          placeholder="About Us" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">About Content</Label>
        <Textarea 
          id="content" 
          name="content" 
          required
          rows={6} 
          defaultValue={initialData?.content || ""} 
          placeholder="Main text content for the about page..." 
        />
      </div>

      <div className="space-y-2">
        <Label>Featured Image</Label>
        {imageUrl ? (
          <div className="relative w-full max-w-md h-48 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={imageUrl} 
              alt="Uploaded image" 
              className="object-cover w-full h-full" 
            />
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

      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="bg-[#1F2288] hover:bg-[#1F2288]/90" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}