"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CloudinaryUpload from "./CloudinaryUpload";
import { ImageIcon, Link2 } from "lucide-react";

interface MediaPickerProps {
  onMediaSelect: (url: string, id?: string) => void;
  buttonText?: string;
}

export default function MediaPicker({ onMediaSelect, buttonText = "Upload Media" }: MediaPickerProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "local">("upload");
  const [localPath, setLocalPath] = useState("");

  const handleLocalSubmit = () => {
    if (localPath.trim()) {
      onMediaSelect(localPath.trim());
    }
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-white">
      <div className="flex border-b">
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 ${
            activeTab === "upload" 
              ? "bg-[#1F2288] text-white" 
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Cloudinary Upload
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("local")}
          className={`flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 ${
            activeTab === "local" 
              ? "bg-[#1F2288] text-white" 
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Link2 className="w-4 h-4" />
          Public Folder
        </button>
      </div>
      
      <div className="p-4">
        {activeTab === "upload" ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-2 text-center">
            <p className="text-sm text-gray-500 mb-2">Upload directly to Cloudinary storage.</p>
            <CloudinaryUpload onUploadSuccess={onMediaSelect} buttonText={buttonText} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="local-path">File Path (e.g., /homepageimage/services1.jfif)</Label>
              <div className="flex gap-2">
                <Input
                  id="local-path"
                  value={localPath}
                  onChange={(e) => setLocalPath(e.target.value)}
                  placeholder="/images/example.jpg"
                  className="flex-1"
                />
                <Button type="button" onClick={handleLocalSubmit} className="bg-[#1F2288] hover:bg-[#1F2288]/90 text-white">
                  Use
                </Button>
              </div>
            </div>
            
            {localPath.trim() && (
              <div className="mt-4 border rounded p-2">
                <p className="text-xs font-semibold mb-2">Preview (if valid image):</p>
                <div className="relative w-full h-32 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={localPath.trim()} 
                    alt="Local preview" 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMSAxNWYtMy4zLTMuMyI+PC9wYXRoPjxwYXRoIGQ9Ik0xOCAyMkg2YTIgMiAwIDAgMS0yLTJWOEwyIDEyeCI+PC9wYXRoPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTQiIHI9IjIiPjwvY2lyY2xlPjwvc3ZnPg==';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
