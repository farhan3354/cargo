"use client";

import { useState } from "react";
import { createVideo } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MediaPicker from "@/components/MediaPicker";
import { toast } from "sonner";

export function VideoForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await createVideo({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        url: videoUrl,
        cloudinaryId: cloudinaryId || videoUrl, // fallback
      });
      const form = document.getElementById("video-form") as HTMLFormElement;
      form.reset();
      setVideoUrl("");
      setCloudinaryId("");
      toast.success("Video added successfully!");
    } catch {
      toast.error("Failed to add video. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form id="video-form" action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Video Title</Label>
        <Input id="title" name="title" required placeholder="e.g. Intro Video" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Brief description of the video..." />
      </div>

      <div className="space-y-2">
        <Label>Video File</Label>
        <p className="text-xs text-red-500 font-medium">Recommended video format: MP4 (16:9 aspect ratio), file size under 50MB.</p>
        {videoUrl ? (
          <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
            <video src={videoUrl} className="object-cover w-full h-full" muted />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-7"
              onClick={() => {
                setVideoUrl("");
                setCloudinaryId("");
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <MediaPicker onMediaSelect={(url, id) => {
            setVideoUrl(url);
            if (id) setCloudinaryId(id);
          }} buttonText="Upload Video" />
        )}
      </div>

      <Button type="submit" className="w-full bg-[#1F2288] hover:bg-[#1F2288]/90" disabled={isSubmitting || !videoUrl}>
        {isSubmitting ? "Adding..." : "Add Video"}
      </Button>
    </form>
  );
}
