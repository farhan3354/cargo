import type { Metadata } from "next";
import { Geist, Geist_Mono, Marcellus } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  weight: "400",
  variable: "--font-marcellus",
  subsets: ["latin"],
});

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
