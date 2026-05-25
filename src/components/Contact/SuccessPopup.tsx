"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPopup({
  open,
  message,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer setting mounted to avoid synchronous setState in effect
    const id = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(id);
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose(), 2500);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const popup = (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-60 p-4">
      <div className="pointer-events-auto bg-white border border-green-200 rounded-xl shadow-lg p-4 flex items-center gap-3 max-w-md w-full">
        <div className="bg-green-50 p-2 rounded-md">
          <CheckCircle2 className="text-green-600 w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Message sent</p>
          <p className="text-sm text-slate-600">{message}</p>
        </div>
      </div>
    </div>
  );

  return createPortal(popup, document.body);
}
