import React, { useState, useEffect, useRef, useCallback } from "react";
import SuccessPopup from "./SuccessPopup";
import {
  Phone,
  Mail,
  MapPin,
  RotateCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Independent CAPTCHA generator helper
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

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    captchaInput: "",
  });

  // State initialized directly with a new CAPTCHA, avoiding useEffect call
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

  // Draw distorted characters with noise lines and dots on a canvas
  useEffect(() => {
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
  }, [captcha.code]);

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
      let apiUrl = "/api/contact";
      // If the env var is a domain root (e.g. https://example.com), ensure the path points to /api/contact
      try {
        if (!apiUrl.endsWith("/api/contact")) {
          // strip trailing slash then append path
          apiUrl = apiUrl.replace(/\/$/, "") + "/api/contact";
        }
      } catch (e) {
        apiUrl = "/api/contact";
      }

      console.debug('Contact form POST ->', apiUrl)
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
      console.debug('Contact form response status', res.status, 'content-type', res.headers.get('content-type'))

      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("Contact API returned non-JSON response:", text);
        // More helpful message for HTML/404 responses (common when API isn't deployed)
        const maybeHtml = /<\/?html/i.test(text);
        setStatus({
          type: "error",
          message: maybeHtml
            ? `Server returned HTML (status ${res.status}). This often means the API route is not available on the host.`
            : "Server returned an unexpected response. Check server logs.",
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
        message:
          "Thank you! Your message has been sent successfully. We will get back to you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        captchaInput: "",
      });

      refreshCaptcha();
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
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <p className="text-[#1F2288] text-sm font-semibold uppercase tracking-[3px]">
              Contact Us
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold text-[#111] mt-4">
              Get In Touch
            </h2>

            <p className="text-gray-500 text-base mt-5 max-w-[650px] mx-auto leading-8">
              Need help with cargo, shipping, or logistics services? Our team is
              always ready to support your business with fast and reliable
              communication.
            </p>
          </div>

          {/* Main Section */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left Side */}
            <div className="bg-[#1F2288] p-10 rounded-2xl text-white h-full">
              <h3 className="text-3xl font-semibold mb-6">
                Contact Information
              </h3>

              <p className="text-gray-200 leading-8 mb-10">
                Feel free to contact us anytime. We are available for your
                shipping and logistics needs.
              </p>

              {/* Contact Items */}
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold">Office Address</h4>
                    <p className="text-gray-200 mt-1">
                      Office #12, Business Avenue, Dubai, UAE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <Mail size={20} />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold">Email Address</h4>
                    <p className="text-gray-200 mt-1">dubai@manaralkhair.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <Phone size={20} />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold">Phone Number</h4>
                    <p className="text-gray-200 mt-1">+971 50 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Form */}
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-semibold text-[#111] mb-8">
                Send Message
              </h3>

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
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#1F2288]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                    className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#1F2288]"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#1F2288]"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#1F2288]"
                ></textarea>

                {/* CAPTCHA section */}
                <div className="border border-gray-200 rounded-xl p-5 bg-[#f8fafc] flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex items-center gap-3">
                    <div className="relative rounded-lg overflow-hidden border border-gray-300">
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
                      className="p-2 text-gray-500 hover:text-[#1F2288] hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all"
                    >
                      <RotateCw className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex-1 max-w-[200px]">
                    <input
                      type="text"
                      name="captchaInput"
                      value={formData.captchaInput}
                      onChange={handleChange}
                      required
                      placeholder="Enter Code"
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1F2288] uppercase"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="w-full md:w-auto bg-[#1F2288] hover:bg-[#171a70] text-white px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status.type === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <SuccessPopup
        open={status.type === "success"}
        message={status.message}
        onClose={() => setStatus({ type: "idle", message: "" })}
      />
    </>
  );
}

// 'use client'

// import React from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'

// export default function ContactForm() {
//   return (
//     <section className="bg-white">
//       <div className="max-w-[1240px] mx-auto px-5">
//         {/* 2x2 Info Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
//           <div className="p-12 bg-white border border-[#E5E7EB] rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
//             <p className="text-sm font-bold text-[#66556B] uppercase tracking-[0.2em] mb-4">Phone</p>
//             <p className="text-2xl font-bold text-[#110713]">+251915751270</p>
//           </div>
//           <div className="p-12 bg-white border border-[#E5E7EB] rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
//             <p className="text-sm font-bold text-[#66556B] uppercase tracking-[0.2em] mb-4">Email</p>
//             <p className="text-2xl font-bold text-[#110713] break-all">waill.moustafa@gmail.com</p>
//           </div>
//           <div className="p-12 bg-white border border-[#E5E7EB] rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
//             <p className="text-sm font-bold text-[#66556B] uppercase tracking-[0.2em] mb-4">Address</p>
//             <p className="text-2xl font-bold text-[#110713]">Manager jigjiga dds section</p>
//           </div>
//           <div className="p-12 bg-white border border-[#E5E7EB] rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
//             <p className="text-sm font-bold text-[#66556B] uppercase tracking-[0.2em] mb-6">Social Media</p>
//             <div className="flex gap-6">
//               <a href="#" className="text-[#110713] hover:text-[#1F2288] transition-colors"><Facebook className="h-6 w-6" /></a>
//               <a href="#" className="text-[#110713] hover:text-[#1F2288] transition-colors"><Twitter className="h-6 w-6" /></a>
//               <a href="#" className="text-[#110713] hover:text-[#1F2288] transition-colors"><Instagram className="h-6 w-6" /></a>
//               <a href="#" className="text-[#110713] hover:text-[#1F2288] transition-colors"><Youtube className="h-6 w-6" /></a>
//               <a href="#" className="text-[#110713] hover:text-[#1F2288] transition-colors"><Linkedin className="h-6 w-6" /></a>
//             </div>
//           </div>
//         </div>

//         {/* Inquiry Form Section - 2 Columns */}
//         <div className="bg-[#F9F7FA] rounded-[4rem] p-12 lg:p-20 mb-16 border border-[#E5E7EB]">
//           <div className="grid lg:grid-cols-12 gap-16 items-start">
//             <div className="lg:col-span-5">
//               <div className="w-12 h-1 bg-[#1F2288] mb-8"></div>
//               <h2 className="text-4xl lg:text-5xl font-bold text-[#110713] mb-8 leading-tight">
//                 WE'RE HERE TO ANSWER YOUR QUESTIONS ANYTIME
//               </h2>
//               <p className="text-lg text-[#66556B] leading-relaxed">
//                 Use the form below to send us your inquiries or feedback. We’re eager to assist you with our services.
//               </p>
//             </div>

//             <div className="lg:col-span-7">
//               <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input placeholder="First Name" className="h-16 bg-white border-[#E5E7EB] focus:border-[#1F2288] rounded-2xl" />
//                 <Input placeholder="Last Name" className="h-16 bg-white border-[#E5E7EB] focus:border-[#1F2288] rounded-2xl" />
//                 <div className="md:col-span-2">
//                   <Input type="email" placeholder="Email Address" className="h-16 bg-white border-[#E5E7EB] focus:border-[#1F2288] rounded-2xl" />
//                 </div>
//                 <div className="md:col-span-2">
//                   <Textarea placeholder="Type your message" className="min-h-[160px] bg-white border-[#E5E7EB] focus:border-[#1F2288] rounded-2xl p-6" />
//                 </div>
//                 <div>
//                   <Button className="h-16 px-12 bg-[#1F2288] hover:bg-[#161966] text-white font-bold rounded-2xl uppercase tracking-widest text-sm shadow-xl shadow-primary/20 transition-all">
//                     Submit
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Full Width Map */}
//       <div className="w-full h-[600px] border-y border-[#E5E7EB]">
//         <iframe
//           src="https://maps.google.com/maps?q=Ali%20Town&z=12&hl=en&t=m&output=embed&iwloc=near"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           allowFullScreen={true}
//           loading="lazy"
//         ></iframe>
//       </div>
//     </section>
//   )
// }
