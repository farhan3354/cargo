"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string, id?: string) => void;
  buttonText?: string;
}

export default function CloudinaryUpload({ onUploadSuccess, buttonText = "Upload Media" }: CloudinaryUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "cargo_preset"}
      onSuccess={(result: any) => {
        if (result.info && result.info.secure_url) {
          onUploadSuccess(result.info.secure_url, result.info.public_id);
        }
      }}
    >
      {({ open }) => {
        return (
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            className="flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            {buttonText}
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
