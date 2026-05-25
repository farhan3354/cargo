"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, RotateCw, CheckCircle2, AlertCircle } from "lucide-react";
import SuccessPopup from "./SuccessPopup";

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

export default function ContactModal({
  isOpen,
  onClose,
  recipient = "manarcargo@manarcargo.com",
  title = "Send Inquiry",
  submitLabel = "Submit",
}: {
  isOpen: boolean;
  onClose: () => void;
  recipient?: string;
  title?: string;
  submitLabel?: string;
}) {
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

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = ["#1F2288", "#f97316", "#3b82f6", "#cbd5e1"][
        Math.floor(Math.random() * 4)
      ];
      ctx.lineWidth = Math.random() * 1.5 + 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

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

    ctx.font = "bold 24px 'Work Sans', system-ui, sans-serif";
    ctx.textBaseline = "middle";

    for (let i = 0; i < captcha.code.length; i++) {
      const char = captcha.code[i];
      ctx.fillStyle = ["#1e293b", "#0f172a", "#1F2288", "#475569"][
        Math.floor(Math.random() * 4)
      ];
      ctx.save();
      const x = 12 + i * 22 + Math.random() * 3;
      const y = canvas.height / 2 + (Math.random() * 4 - 2);
      ctx.translate(x, y);
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          captchaInput: formData.captchaInput,
          captchaHash: captcha.hash,
          to: recipient,
        }),
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("Contact API returned non-JSON response:", text);
        setStatus({
          type: "error",
          message: "Server returned an unexpected response. Check server logs.",
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

      setStatus({ type: "success", message: data.message || "Message sent." });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        captchaInput: "",
      });
      refreshCaptcha();

      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err: any) {
      console.error(err);
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 animate-in fade-in zoom-in duration-300">
        <div className="bg-[#1F2288] p-6 text-white flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-blue-100 text-sm mt-1">
              Submit your inquiry and we'll email you back within 24 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8 max-h-[80vh] overflow-y-auto">
          {status.type === "success" && (
            <div className="mb-6 p-5 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}

          {status.type === "error" && (
            <div className="mb-6 p-5 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full border border-slate-200 rounded-xl px-5 py-3 text-sm outline-none focus:border-[#1F2288] focus:ring-1 focus:ring-[#1F2288]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full border border-slate-200 rounded-xl px-5 py-3 text-sm outline-none focus:border-[#1F2288] focus:ring-1 focus:ring-[#1F2288]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is your inquiry about?"
                className="w-full border border-slate-200 rounded-xl px-5 py-3 text-sm outline-none focus:border-[#1F2288] focus:ring-1 focus:ring-[#1F2288]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Type your question or detailed request here..."
                className="w-full border border-slate-200 rounded-xl px-5 py-3 text-sm outline-none focus:border-[#1F2288] focus:ring-1 focus:ring-[#1F2288]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Spam Protection
              </label>
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative rounded-lg overflow-hidden border border-slate-300">
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
                    className="p-2 text-slate-500 hover:text-[#1F2288] hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
                  >
                    <RotateCw className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 max-w-[180px]">
                  <input
                    type="text"
                    name="captchaInput"
                    value={formData.captchaInput}
                    onChange={handleChange}
                    required
                    placeholder="Enter Code"
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1F2288] uppercase"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-medium transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status.type === "loading"}
                className="bg-[#1F2288] hover:bg-[#171a70] text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {status.type === "loading" ? "Sending..." : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
      <SuccessPopup
        open={status.type === "success"}
        message={status.message}
        onClose={() => setStatus({ type: "idle", message: "" })}
      />
    </div>
  );
}
