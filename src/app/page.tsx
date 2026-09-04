import React from "react";
// Removed unused dynamic import
import { getSiteContentMap, getOffices, getServices, getAbout, getVideos } from "@/app/actions/admin";

// Above-the-fold: load immediately
import Hero from "@/components/Home/Hero";
import Stats from "@/components/Home/Stats";
import About from "@/components/Home/About";
import Services from "@/components/Home/Services";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

// Below-the-fold: lazy load to reduce initial JS bundle
import LazySections from "@/components/Home/LazySections";

export default async function Home() {
  let content: Record<string, string> = {};
  let dbOffices: Awaited<ReturnType<typeof getOffices>> = [];
  let dbServices: Awaited<ReturnType<typeof getServices>> = [];
  let dbVideos: Awaited<ReturnType<typeof getVideos>> = [];
  let aboutData: Awaited<ReturnType<typeof getAbout>> = null;
  try {
    const [
      contentRes,
      officesRes,
      servicesRes,
      videosRes,
      aboutRes
    ] = await Promise.all([
      getSiteContentMap(),
      getOffices(),
      getServices(),
      getVideos(),
      getAbout()
    ]);
    
    content = contentRes;
    dbOffices = officesRes;
    dbServices = servicesRes;
    dbVideos = videosRes;
    aboutData = aboutRes;
  } catch {
    // Backend unavailable — use defaults from components
  }

  return (
    <main className="flex-1 overflow-x-hidden">
      <Hero 
        heroTitle={content["hero_title"]} 
        heroSubtitle={content["hero_subtitle"]}
        dbVideos={dbVideos}
      />
      <Stats />
      <About 
        aboutTitle={aboutData?.title || content["about_title"]}
        aboutText={aboutData?.content || content["about_text"]}
        aboutImage={aboutData?.imageUrl || content["about_image_1"]}
      />
      <Services dbServices={dbServices} />
      <WhyChooseUs />
       <LazySections dbOffices={dbOffices} />
    </main>
  );
}
