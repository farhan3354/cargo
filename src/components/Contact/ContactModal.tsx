"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Phone,
  Mail,
  MapPin,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import SuccessPopup from "./SuccessPopup";

// Independent CAPTCHA generator helper (same as ContactForm)
const getNewCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return {
    code,
    hash: btoa(code + "mango-cargo-salt"),
  };
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient?: string;
  title?: string;
  submitLabel?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  recipient,
  title = "Contact Office",
  submitLabel = "Send Message",
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    captchaInput: "",
  });

  const [captcha, setCaptcha] = useState(() => getNewCaptcha());
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(getNewCaptcha());
    setFormData((prev) => ({ ...prev, captchaInput: "" }));
  }, []);

  // Sync recipient with subject or message if needed
  useEffect(() => {
    if (recipient && isOpen) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry for ${recipient}`,
      }));
    }
  }, [recipient, isOpen]);

  // Draw distorted characters with noise lines and dots on a canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = ["#1F2288", "#f97316", "#3b82f6", "#94a3b8"][
        Math.floor(Math.random() * 4)
      ];
      ctx.lineWidth = Math.random() * 1.5 + 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw random noise dots
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 1.5,
        0,
        2 * Math.PI,
      );
      ctx.fill();
    }

    // Draw stylized text characters
    ctx.font = "bold 24px 'Work Sans', system-ui, sans-serif";
    ctx.textBaseline = "middle";

    for (let i = 0; i < captcha.code.length; i++) {
      const char = captcha.code[i];
      ctx.fillStyle = ["#1e293b", "#0f172a", "#1F2288", "#475569"][
        Math.floor(Math.random() * 4)
      ];

      ctx.save();

      // Calculate char position with slight randomness
      const x = 12 + i * 22 + Math.random() * 3;
      const y = canvas.height / 2 + (Math.random() * 4 - 2);

      ctx.translate(x, y);

      // Random rotation
      const angle = ((Math.random() * 20 - 10) * Math.PI) / 180;
      ctx.rotate(angle);

      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  }, [captcha.code, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      let apiUrl = "https://cargo-bay.vercel.app/api/contact";
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          captchaInput: formData.captchaInput,
          captchaHash: captcha.hash,
        }),
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        const maybeHtml = /<\/?html/i.test(text);
        setStatus({
          type: "error",
          message: maybeHtml
            ? `Server returned HTML (status ${res.status}). API route might be missing.`
            : "Server returned an unexpected response.",
        });
        refreshCaptcha();
        return;
      }

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message.",
        });
        refreshCaptcha();
        return;
      }

      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        captchaInput: "",
      });

      refreshCaptcha();
      // Close modal after success after a brief delay
      setTimeout(() => {
        onClose();
        setStatus({ type: "idle", message: "" });
      }, 3000);

    } catch (err: any) {
      console.error(err);
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl bg-white rounded-2xl">
          <div className="bg-[#1F2288] p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-white mb-2">
                {title}
              </DialogTitle>
              <DialogDescription className="text-white/70 text-base">
                {recipient 
                  ? `Sending message to: ${recipient}` 
                  : "Fill out the form below to get in touch with our team."}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-8">
            {status.type === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1F2288] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1F2288] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1F2288] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1F2288] transition-all resize-none"
                ></textarea>
              </div>

              {/* CAPTCHA section */}
              <div className="border border-gray-200 rounded-xl p-4 bg-[#f8fafc] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative rounded-lg overflow-hidden border border-gray-300 bg-white">
                    <canvas
                      ref={canvasRef}
                      width={130}
                      height={46}
                      className="block cursor-pointer"
                      title="Click to refresh CAPTCHA"
                      onClick={refreshCaptcha}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    title="Refresh CAPTCHA"
                    className="p-2 text-gray-400 hover:text-[#1F2288] hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all"
                  >
                    <RotateCw className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 max-w-[150px]">
                  <input
                    type="text"
                    name="captchaInput"
                    value={formData.captchaInput}
                    onChange={handleChange}
                    required
                    placeholder="Code"
                    className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1F2288] uppercase"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="w-full bg-[#1F2288] hover:bg-[#171a70] text-white py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-[#1F2288]/30"
                >
                  {status.type === "loading" ? "Sending..." : submitLabel}
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessPopup
        open={status.type === "success"}
        message={status.message}
        onClose={() => setStatus({ type: "idle", message: "" })}
      />
    </>
  );
}
