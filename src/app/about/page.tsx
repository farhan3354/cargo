import React from 'react'
import AboutHero from '@/components/About/AboutHero'
import AboutSection from '@/components/Home/About'
import Stats from '@/components/Home/Stats'
import WhyChooseUs from '@/components/Home/WhyChooseUs'
import CompanyStory from '@/components/About/CompanyStory'
import MissionVision from '@/components/About/MissionVision'
import AboutStats from '@/components/About/AboutStats'
import ExtraContent from '@/components/About/ExtraContent'
import { api } from '@/lib/api'

export default async function AboutPage() {
  let aboutData = null;
  try {
    aboutData = await api.getAbout();
  } catch (error) {
    console.error("Failed to fetch about data:", error);
  }

  return (
    <main className="flex-1 overflow-x-hidden">
      <AboutHero data={aboutData} />
      <CompanyStory data={aboutData} />
      <MissionVision data={aboutData} />
      <AboutStats data={aboutData} />
      <AboutSection
        aboutTitle={aboutData?.title}
        aboutText={aboutData?.content}
        aboutImage={aboutData?.imageUrl}
      />
      {/* Extra expandable content — only shown when admin has added content */}
      {aboutData?.extraContent && (
        <ExtraContent
          content={aboutData.extraContent}
          imageUrl={aboutData.extraImageUrl}
        />
      )}
      <Stats />
      <WhyChooseUs />
    </main>
  )
}
