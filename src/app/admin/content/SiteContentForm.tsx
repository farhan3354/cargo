"use client";

import { useState } from "react";
import { bulkUpdateSiteContent } from "@/app/actions/admin";
import { SiteContent } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CloudinaryUpload from "@/components/CloudinaryUpload";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export function SiteContentForm({
  initialContent,
}: {
  initialContent: SiteContent[];
}) {
  const [contentMap, setContentMap] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    initialContent.forEach((item) => {
      map[item.key] = item.value;
    });
    return map;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define the fields we want to make editable
  const fields = [
    // Hero Section
    {
      key: "hero_title",
      label: "Hero Title",
      type: "text",
      section: "hero",
      multiline: false,
    },
    {
      key: "hero_subtitle",
      label: "Hero Subtitle",
      type: "text",
      section: "hero",
      multiline: true,
    },
    {
      key: "hero_cta_text",
      label: "Hero CTA Button Text",
      type: "text",
      section: "hero",
      multiline: false,
    },
    {
      key: "hero_video_url",
      label: "Hero Background Video URL",
      type: "video",
      section: "hero",
      multiline: false,
    },

    // Footer Section
    {
      key: "footer_description",
      label: "Footer Description / Tagline",
      type: "text",
      section: "footer",
      multiline: true,
    },
    {
      key: "footer_address",
      label: "Footer Address",
      type: "text",
      section: "footer",
      multiline: true,
    },
    {
      key: "footer_phone",
      label: "Footer Phone Number",
      type: "text",
      section: "footer",
      multiline: false,
    },
    {
      key: "footer_email",
      label: "Footer Contact Email",
      type: "text",
      section: "footer",
      multiline: false,
    },
    {
      key: "footer_facebook",
      label: "Facebook URL",
      type: "text",
      section: "footer",
      multiline: false,
    },
    {
      key: "footer_instagram",
      label: "Instagram URL",
      type: "text",
      section: "footer",
      multiline: false,
    },
    {
      key: "footer_twitter",
      label: "Twitter / X URL",
      type: "text",
      section: "footer",
      multiline: false,
    },
    {
      key: "footer_linkedin",
      label: "LinkedIn URL",
      type: "text",
      section: "footer",
      multiline: false,
    },
    {
      key: "footer_copyright",
      label: "Copyright Text",
      type: "text",
      section: "footer",
      multiline: false,
    },

    // Contact Page Section
    {
      key: "contact_page_title",
      label: "Contact Page Title",
      type: "text",
      section: "contact",
      multiline: false,
    },
    {
      key: "contact_page_subtitle",
      label: "Contact Page Subtitle",
      type: "text",
      section: "contact",
      multiline: true,
    },
    {
      key: "contact_page_address",
      label: "Contact Page Address",
      type: "text",
      section: "contact",
      multiline: true,
    },
    {
      key: "contact_page_phone",
      label: "Contact Page Phone",
      type: "text",
      section: "contact",
      multiline: false,
    },
    {
      key: "contact_page_email",
      label: "Contact Page Email",
      type: "text",
      section: "contact",
      multiline: false,
    },
    {
      key: "contact_page_hours",
      label: "Business Hours",
      type: "text",
      section: "contact",
      multiline: true,
    },
    {
      key: "contact_page_map_url",
      label: "Google Maps Embed URL",
      type: "text",
      section: "contact",
      multiline: false,
    },
  ];

  const handleUpdate = (key: string, value: string) => {
    setContentMap((prev) => ({ ...prev, [key]: value }));
  };

  const saveContent = async () => {
    setIsSubmitting(true);
    try {
      const items = fields.map((field) => ({
        key: field.key,
        value: contentMap[field.key] || "",
        section: field.section,
        type: field.type,
        description: field.label,
      }));
      await bulkUpdateSiteContent(items);
      toast.success("Site content saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save content.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionMeta: Record<string, { title: string; description: string }> = {
    hero: { title: "🎬 Hero Section", description: "The banner at the top of the home page." },
    footer: { title: "🦶 Footer", description: "Text, contact info, and social links shown in the website footer." },
    contact: { title: "📞 Contact Page", description: "Text and contact details shown on the Contact Us page." },
  };

  return (
    <div className="space-y-10">
      {["hero", "footer", "contact"].map((section) => (
        <div key={section} className="space-y-4">
          <div className="border-b border-[#E5E7EB] pb-2">
            <h2 className="text-xl font-bold text-[#110713]">
              {sectionMeta[section]?.title ?? section}
            </h2>
            <p className="text-sm text-[#66556B] mt-0.5">{sectionMeta[section]?.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields
              .filter((f) => f.section === section)
              .map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>{field.label}</Label>

                  {field.type === "text" && field.multiline && (
                    <Textarea
                      id={field.key}
                      value={contentMap[field.key] || ""}
                      onChange={(e) =>
                        handleUpdate(field.key, e.target.value)
                      }
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      rows={4}
                    />
                  )}

                  {field.type === "text" && !field.multiline && (
                    <Input
                      id={field.key}
                      value={contentMap[field.key] || ""}
                      onChange={(e) =>
                        handleUpdate(field.key, e.target.value)
                      }
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}

                  {(field.type === "image" || field.type === "video") && (
                    <div className="space-y-2">
                      <Input
                        id={field.key}
                        value={contentMap[field.key] || ""}
                        onChange={(e) =>
                          handleUpdate(field.key, e.target.value)
                        }
                        placeholder={`Direct URL for ${field.type}`}
                      />
                      <div className="flex gap-2 items-center">
                        <span className="text-sm text-gray-500">or</span>
                        <CloudinaryUpload
                          buttonText={`Upload ${field.type === "video" ? "Video" : "Image"}`}
                          onUploadSuccess={(url) =>
                            handleUpdate(field.key, url)
                          }
                        />
                      </div>
                      {contentMap[field.key] && field.type === "image" && (
                        <div className="mt-2 h-24 w-40 relative rounded border bg-gray-100 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={contentMap[field.key]}
                            alt={field.label}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      {contentMap[field.key] && field.type === "video" && (
                        <div className="mt-2 h-24 w-40 relative rounded border bg-gray-100 overflow-hidden">
                          <video
                            src={contentMap[field.key]}
                            className="object-cover w-full h-full"
                            controls
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="pt-4 border-t">
        <Button onClick={saveContent} disabled={isSubmitting} size="lg" className="bg-[#1F2288] hover:bg-[#1F2288]/90">
          {isSubmitting ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}
