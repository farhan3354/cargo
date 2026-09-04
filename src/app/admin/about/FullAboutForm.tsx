"use client";

import { useState } from "react";
import { updateAbout } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import MediaPicker from "@/components/MediaPicker";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AboutData {
  _id?: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  storyLabel?: string;
  storyHeading?: string;
  storyContent?: string;
  storyImageUrl?: string;
  mission?: string;
  vision?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  stat4Value?: string;
  stat4Label?: string;
  subtitle?: string;
  extraContent?: string;
  extraImageUrl?: string;
}

export default function FullAboutForm({ initialData }: { initialData: AboutData | null }) {
  const d = initialData;

  // Image states
  const [imageUrl, setImageUrl] = useState(d?.imageUrl || "");
  const [heroImageUrl, setHeroImageUrl] = useState(d?.heroImageUrl || "");
  const [storyImageUrl, setStoryImageUrl] = useState(d?.storyImageUrl || "");
  const [extraImageUrl, setExtraImageUrl] = useState(d?.extraImageUrl || "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      const payload = {
        // Home About section
        title: formData.get("title") as string || "About Us",
        content: formData.get("content") as string || "",
        imageUrl: imageUrl || undefined,
        // Hero
        heroTitle: formData.get("heroTitle") as string,
        heroTitleHighlight: formData.get("heroTitleHighlight") as string,
        heroSubtitle: formData.get("heroSubtitle") as string,
        heroImageUrl: heroImageUrl || undefined,
        // Story
        storyLabel: formData.get("storyLabel") as string,
        storyHeading: formData.get("storyHeading") as string,
        storyContent: formData.get("storyContent") as string,
        storyImageUrl: storyImageUrl || undefined,
        // Mission/Vision
        mission: formData.get("mission") as string,
        vision: formData.get("vision") as string,
        // Stats
        stat1Value: formData.get("stat1Value") as string,
        stat1Label: formData.get("stat1Label") as string,
        stat2Value: formData.get("stat2Value") as string,
        stat2Label: formData.get("stat2Label") as string,
        stat3Value: formData.get("stat3Value") as string,
        stat3Label: formData.get("stat3Label") as string,
        stat4Value: formData.get("stat4Value") as string,
        stat4Label: formData.get("stat4Label") as string,
        // Extra
        subtitle: formData.get("subtitle") as string,
        extraContent: formData.get("extraContent") as string,
        extraImageUrl: extraImageUrl || undefined,
      };

      const result = await updateAbout(payload);

      if (result?.success === false) {
        toast.error((result as any).error || "Failed to update.");
      } else {
        toast.success("About page updated successfully!");
        router.refresh();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update about page.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function ImageField({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (url: string) => void;
  }) {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        {value ? (
          <div className="relative w-full max-w-md h-44 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt={label} className="object-cover w-full h-full" />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-7"
              onClick={() => onChange("")}
            >
              Remove
            </Button>
          </div>
        ) : (
          <MediaPicker onMediaSelect={(url) => onChange(url)} />
        )}
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-10">
      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1: Hero Banner */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="border-b border-[#E5E7EB] pb-2">
          <h2 className="text-xl font-bold text-[#110713]">🎬 Hero Banner</h2>
          <p className="text-sm text-[#66556B]">The top banner of the About page.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Hero Title (Line 1)</Label>
            <Input id="heroTitle" name="heroTitle" defaultValue={d?.heroTitle || "Your Trusted"} placeholder="e.g. Your Trusted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroTitleHighlight">Hero Title Highlight (Line 2)</Label>
            <Input id="heroTitleHighlight" name="heroTitleHighlight" defaultValue={d?.heroTitleHighlight || "Cargo Partner"} placeholder="e.g. Cargo Partner" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Textarea id="heroSubtitle" name="heroSubtitle" rows={2} defaultValue={d?.heroSubtitle || "Delivering reliable cargo and logistics solutions across the UAE and worldwide."} />
          </div>
        </div>

        <ImageField label="Hero Background Image" value={heroImageUrl} onChange={setHeroImageUrl} />
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 2: Company Story */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="border-b border-[#E5E7EB] pb-2">
          <h2 className="text-xl font-bold text-[#110713]">📖 Company Story</h2>
          <p className="text-sm text-[#66556B]">The &quot;Our Story&quot; section with heading, content, and image.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="storyLabel">Section Label</Label>
            <Input id="storyLabel" name="storyLabel" defaultValue={d?.storyLabel || "Our Story"} placeholder="e.g. Our Story" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storyHeading">Section Heading</Label>
            <Input id="storyHeading" name="storyHeading" defaultValue={d?.storyHeading || "Moving Cargo With Confidence"} placeholder="e.g. Moving Cargo With Confidence" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="storyContent">Story Content</Label>
            <Textarea id="storyContent" name="storyContent" rows={6} defaultValue={d?.storyContent || ""} placeholder="Tell your company's story..." />
          </div>
        </div>

        <ImageField label="Story Section Image" value={storyImageUrl} onChange={setStoryImageUrl} />
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 3: Mission & Vision */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="border-b border-[#E5E7EB] pb-2">
          <h2 className="text-xl font-bold text-[#110713]">🎯 Mission & Vision</h2>
          <p className="text-sm text-[#66556B]">Your company mission and vision statements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="mission">Our Mission</Label>
            <Textarea id="mission" name="mission" rows={4} defaultValue={d?.mission || ""} placeholder="To provide efficient, secure..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vision">Our Vision</Label>
            <Textarea id="vision" name="vision" rows={4} defaultValue={d?.vision || ""} placeholder="To become a globally trusted..." />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 4: Stats */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="border-b border-[#E5E7EB] pb-2">
          <h2 className="text-xl font-bold text-[#110713]">📊 Stats Section</h2>
          <p className="text-sm text-[#66556B]">4 statistics shown in the blue banner.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { vKey: "stat1Value", lKey: "stat1Label", dv: d?.stat1Value || "5000+", dl: d?.stat1Label || "Shipments Delivered" },
            { vKey: "stat2Value", lKey: "stat2Label", dv: d?.stat2Value || "20+", dl: d?.stat2Label || "Countries Served" },
            { vKey: "stat3Value", lKey: "stat3Label", dv: d?.stat3Value || "24/7", dl: d?.stat3Label || "Customer Support" },
            { vKey: "stat4Value", lKey: "stat4Label", dv: d?.stat4Value || "99%", dl: d?.stat4Label || "On-Time Delivery" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2 p-3 bg-[#F9F7FA] rounded-lg">
              <Label htmlFor={stat.vKey}>Stat {i + 1} Value</Label>
              <Input id={stat.vKey} name={stat.vKey} defaultValue={stat.dv} placeholder="e.g. 5000+" />
              <Label htmlFor={stat.lKey}>Stat {i + 1} Label</Label>
              <Input id={stat.lKey} name={stat.lKey} defaultValue={stat.dl} placeholder="e.g. Shipments Delivered" />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 5: Home Page About Section */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="border-b border-[#E5E7EB] pb-2">
          <h2 className="text-xl font-bold text-[#110713]">🏠 Home Page — About Section</h2>
          <p className="text-sm text-[#66556B]">Content shown in the About section on the Home page.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">About Title</Label>
            <Input id="title" name="title" defaultValue={d?.title || "About Us"} placeholder="About Us" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">About Content</Label>
            <Textarea id="content" name="content" rows={5} defaultValue={d?.content || ""} placeholder="Main about us paragraph..." />
          </div>
        </div>

        <ImageField label="Home About Image" value={imageUrl} onChange={setImageUrl} />
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 6: Extra Content (Optional) */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="border-b border-[#E5E7EB] pb-2">
          <h2 className="text-xl font-bold text-[#110713]">✨ Extra Content (Optional)</h2>
          <p className="text-sm text-[#66556B]">Additional subtitle, content, and image for the About page.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="subtitle">Page Subtitle</Label>
            <Input id="subtitle" name="subtitle" defaultValue={d?.subtitle || ""} placeholder="e.g. Your trusted cargo partner since 2005" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="extraContent">Extra Content — "Read More" Section</Label>
            <p className="text-xs text-[#66556B]">💡 When filled, a collapsible "Read More" section will appear on the About page. First 300 characters are shown, then visitors can expand.</p>
            <Textarea id="extraContent" name="extraContent" rows={6} defaultValue={d?.extraContent || ""} placeholder="Add additional company background, achievements, or extra details here..." />
          </div>
        </div>


        <ImageField label="Extra Section Image" value={extraImageUrl} onChange={setExtraImageUrl} />
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* Save Button */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="pt-4 border-t border-[#E5E7EB]">
        <Button type="submit" size="lg" className="bg-[#1F2288] hover:bg-[#1F2288]/90" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save All About Page Changes"}
        </Button>
      </div>
    </form>
  );
}
