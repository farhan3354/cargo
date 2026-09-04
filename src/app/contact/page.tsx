import React from 'react'
import ContactHero from '@/components/Contact/ContactHero'
import ContactForm from '@/components/Contact/ContactForm'
import Offices from '@/components/Home/Offices'
import { getSiteContentMap } from "@/app/actions/admin";

export default async function ContactPage() {
  const content = await getSiteContentMap();

  return (
    <main className="flex-1 overflow-x-hidden">
      <ContactHero 
        title={content.contact_page_title || "Manar Cargo"} 
        subtitle={content.contact_page_subtitle || "Get in touch with our team for shipping, logistics, cargo tracking, and support services."} 
      />
      <ContactForm 
        address={content.contact_page_address || "Office #12, Business Avenue, Dubai, UAE"}
        phone={content.contact_page_phone || "+971 50 123 4567"}
        email={content.contact_page_email || "dubai@manaralkhair.com"}
      />
      <Offices />
    </main>
  )
}
