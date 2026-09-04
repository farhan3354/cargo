"use client";

import { useState } from "react";
import MediaPicker from "@/components/MediaPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateService } from "@/app/actions/admin";
import { toast } from "sonner";

export default function EditServiceForm({
  service,
  onSuccess,
  onCancel,
}: {
  service: { id: string; title: string; description?: string; imageUrl?: string };
  onSuccess: (updated: { id: string; title: string; description?: string; imageUrl?: string }) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description ?? "");
  const [imageUrl, setImageUrl] = useState(service.imageUrl ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updated = await updateService(service.id, { title, description, imageUrl });
      toast.success("Service updated!");
      onSuccess(updated);
    } catch (err) {
      toast.error("Failed to update service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#110713]">Edit Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Service Image</Label>
            {imageUrl ? (
              <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100 mb-2">
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

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
