"use client";

import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("./Testimonials"), {
  ssr: false,
  loading: () => <div className="h-64 bg-[#f8fafc]" />,
});

const Projects = dynamic(() => import("./Projects"), {
  ssr: false,
  loading: () => <div className="h-64 bg-white" />,
});

const OfficesWrapper = dynamic(() => import("./OfficesWrapper"), {
  ssr: false,
});

export default function LazySections({ dbOffices }: { dbOffices: any[] }) {
  return (
    <>
      <Testimonials />
      <Projects />
      <OfficesWrapper dbOffices={dbOffices} />
    </>
  );
}
