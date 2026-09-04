"use client";

import { useState } from "react";
import { ContactSubmission } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Copy, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface SubmissionDetailProps {
  submission: ContactSubmission;
  isOpen: boolean;
  onClose: () => void;
}

export function SubmissionDetailModal({
  submission,
  isOpen,
  onClose,
}: SubmissionDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(submission.email);
    setCopied(true);
    toast.success("Email copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportAsCSV = () => {
    const csv = `Name,Email,Message,Status,Date\n"${submission.name}","${submission.email}","${submission.message.replace(/"/g, '""')}","${submission.status}","${submission.createdAt.toISOString()}"`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submission-${submission.id}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Submission exported!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* From Information */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              From
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {submission.name}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${submission.email}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {submission.email}
              </a>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={handleCopyEmail}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Status and Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Status
              </p>
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  submission.status === "pending"
                    ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                    : submission.status === "responded"
                      ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                }`}
              >
                {submission.status.charAt(0).toUpperCase() +
                  submission.status.slice(1)}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Received
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {formatDistanceToNow(new Date(submission.createdAt), {
                  addSuffix: true,
                })}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Message
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-900 dark:text-white whitespace-pre-wrap break-words">
                {submission.message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={() =>
                window.open(`mailto:${submission.email}`, "_blank")
              }
              className="gap-2"
            >
              <Mail className="w-4 h-4" />
              Reply via Email
            </Button>
            <Button
              onClick={handleExportAsCSV}
              variant="outline"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
