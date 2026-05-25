"use client"

import React, { useState } from 'react'
import Hero from '@/components/Home/Hero'
import Stats from '@/components/Home/Stats'
import About from '@/components/Home/About'
import Services from '@/components/Home/Services'
import WhyChooseUs from '@/components/Home/WhyChooseUs'
import Testimonials from '@/components/Home/Testimonials'
import Projects from '@/components/Home/Projects'
import Offices from '@/components/Home/Offices'
import ContactModal from '@/components/Contact/ContactModal'
import FAQSection from '@/components/Home/FinalCTA'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recipient, setRecipient] = useState<string | undefined>(undefined)

  const handleContactClick = (email: string) => {
    setRecipient(email)
    setIsModalOpen(true)
  }

  return (
    <main className="flex-1 overflow-x-hidden">
      <Hero />
      <Stats />
      <About />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Projects />
      <Offices onContactClick={handleContactClick} />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} recipient={recipient} title={"Contact Office"} submitLabel={"Send Message"} />
      {/* <FAQSection /> */}
    </main>
  )
}
