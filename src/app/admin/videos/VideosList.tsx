'use client';

import { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import ConfirmDialog from "@/components/Admin/ConfirmDialog";
import { deleteVideo, updateVideo } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Video = {
  id: string;
  title: string;
  description?: string;
  url: string;
  cloudinaryId?: string;
};

interface Props {
  initialVideos: Video[];
}

export default function VideosList({ initialVideos }: Props) {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState<Video | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteVideo(id);
      setVideos((prev) => prev.filter((v) => v.id !== id));
      toast.success("Video deleted successfully!");
    } catch {
      toast.error("Failed to delete video.");
    }
  };

  const onConfirm = async () => {
    if (selectedId) {
      await handleDelete(selectedId);
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const openEdit = (video: Video) => {
    setVideoToEdit(video);
    setEditTitle(video.title);
    setEditDescription(video.description ?? "");
    setEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoToEdit) return;
    setIsSubmitting(true);
    try {
      const updated = await updateVideo(videoToEdit.id, {
        title: editTitle,
        description: editDescription,
      });
      setVideos((prev) =>
        prev.map((v) => (v.id === videoToEdit.id ? { ...v, ...updated } : v))
      );
      setEditOpen(false);
      setVideoToEdit(null);
      toast.success("Video updated!");
    } catch {
      toast.error("Failed to update video.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {videos.length === 0 ? (
        <div className="p-8 text-center text-[#66556B]">
          No videos found. Add one to get started.
        </div>
      ) : (
        <ul className="divide-y divide-[#E5E7EB]">
          {videos.map((video) => (
            <li
              key={video.id}
              className="p-6 flex gap-6 items-start hover:bg-[#F9F7FA] transition-colors"
            >
              <div className="w-32 h-20 relative rounded-xl overflow-hidden flex-shrink-0 bg-black">
                <video src={video.url} className="object-cover w-full h-full" muted />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-bold text-[#110713]">{video.title}</h3>
                {video.description && <p className="text-sm text-[#66556B]">{video.description}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="h-8 w-8 flex items-center justify-center rounded bg-[#1F2288] text-white hover:bg-[#1F2288]/90"
                  onClick={() => openEdit(video)}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="h-8 w-8 flex items-center justify-center rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={() => {
                    setConfirmOpen(true);
                    setSelectedId(video.id);
                  }}
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
        title="Delete Video"
        description="Are you sure you want to delete this video? This action cannot be undone."
        onConfirm={onConfirm}
      />

      {editOpen && videoToEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#110713]">Edit Video</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Video Title</Label>
                <Input
                  id="edit-title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
