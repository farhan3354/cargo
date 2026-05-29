import type { Metadata } from "next";
// Fonts are handled via system stacks in offline mode
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

// System font stacks for offline environments
const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

const marcellus = {
  variable: "--font-marcellus",
};

export const metadata: Metadata = {
  title: "Manar Alkhair Cargo | Global Logistics & Shipping Solutions",
  description: "Fast, reliable, and secure cargo shipping services worldwide. Professional logistics solutions for all your shipping needs.",
  keywords: ["Cargo", "Shipping", "Logistics", "Manar Alkhair", "Dubai Cargo", "Somali Cargo", "International Shipping"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${marcellus.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Footer />
        <Toaster />
        <FloatingButtons />
      </body>
    </html>
  );
}
