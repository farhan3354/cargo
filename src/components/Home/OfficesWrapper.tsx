"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { Office } from "@/lib/api";

const Offices = dynamic(() => import("@/components/Home/Offices"), {
  ssr: false,
  loading: () => <div className="h-64 bg-[#F9F7FA]" />,
});
const ContactModal = dynamic(
  () => import("@/components/Contact/ContactModal"),
  { ssr: false }
);

export default function OfficesWrapper({ dbOffices }: { dbOffices: Office[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [officeTag, setOfficeTag] = useState<string | undefined>(undefined);

  const handleContactClick = (tag: string) => {
    setOfficeTag(tag);
    setIsModalOpen(true);
  };

  return (
    <>
      <Offices dbOffices={dbOffices} onContactClick={handleContactClick} />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipient={officeTag}
        title={"Contact Office"}
        submitLabel={"Send Message"}
      />
    </>
  );
}
