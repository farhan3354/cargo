'use client'

import React from 'react'
import ServicesHero from '@/components/Services/ServicesHero'
import ServicesGrid from '@/components/Services/ServicesGrid'
import Services from '@/components/Services/Services'
// import FinalCTA from '@/components/Home/FinalCTA'
import ShippingProcess from '@/components/Services/ShippingProcess'
import Industries from '@/components/Services/Industries'

export default function ServicesPage() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <ServicesHero />
      <ServicesGrid />
      <Services />
      <ShippingProcess />
      <Industries />
      {/* <FinalCTA /> */}
    </main>
  )
}
