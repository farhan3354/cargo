'use client'

import React from 'react'
import ContactHero from '@/components/Contact/ContactHero'
import ContactForm from '@/components/Contact/ContactForm'
import Offices from '@/components/Home/Offices'

export default function ContactPage() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <ContactHero />
      <ContactForm />
      <Offices />
    </main>
  )
}
