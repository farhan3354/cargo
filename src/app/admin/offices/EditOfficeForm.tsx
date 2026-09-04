"use client";

import { useState } from "react";
import MediaPicker from "@/components/MediaPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateOffice } from "@/app/actions/admin";
import { toast } from "sonner";

type Office = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  imageUrl?: string;
};

export default function EditOfficeForm({
  office,
  onSuccess,
  onCancel,
}: {
  office: Office;
  onSuccess: (updated: Office) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(office.name);
  const [email, setEmail] = useState(office.email);
  const [phone, setPhone] = useState(office.phone ?? "");
  const [address, setAddress] = useState(office.address ?? "");
  const [imageUrl, setImageUrl] = useState(office.imageUrl ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updated = await updateOffice(office.id, {
        name,
        email,
        phone,
        address,
        imageUrl,
      });
      toast.success("Office updated!");
      onSuccess(updated as unknown as Office);
    } catch {
      toast.error("Failed to update office.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-[#110713]">Edit Office</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Office Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Contact Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-phone">Phone Number</Label>
            <Input
              id="edit-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-address">Address</Label>
            <Input
              id="edit-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Office Image</Label>
            {imageUrl ? (
              <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100 mb-2">
                <img
                  src={imageUrl}
                  alt="Uploaded"
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

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
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
  );
}
