'use client'

import React from 'react'
import AboutHero from '@/components/About/AboutHero'
import AboutSection from '@/components/Home/About'
import Stats from '@/components/Home/Stats'
import WhyChooseUs from '@/components/Home/WhyChooseUs'
// import FinalCTA from '@/components/Home/FinalCTA'
import CompanyStory from '@/components/About/CompanyStory'
import MissionVision from '@/components/About/MissionVision'
import AboutStats from '@/components/About/AboutStats'

export default function AboutPage() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      <AboutStats />  
      <AboutSection />
      <Stats />
      <WhyChooseUs />
      {/* <FinalCTA /> */}
    </main>
  )
}
