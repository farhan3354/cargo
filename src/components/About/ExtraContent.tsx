"use client";

import React, { useState } from "react";

interface ExtraContentProps {
  content: string;
  imageUrl?: string;
}

export default function ExtraContent({ content, imageUrl }: ExtraContentProps) {
  const [expanded, setExpanded] = useState(false);

  if (!content) return null;

  // Show only first 300 chars collapsed
  const preview = content.slice(0, 300);
  const hasMore = content.length > 300;

  return (
    <section className="py-10 bg-[#f8f9ff]">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="w-20 h-[3px] bg-[#1F2288] mb-4" />
            <p className="text-[#1F2288] uppercase tracking-[3px] text-sm font-semibold mb-3">
              More About Us
            </p>
            <div className="text-gray-600 leading-relaxed text-justify whitespace-pre-line">
              {expanded || !hasMore ? content : `${preview}...`}
            </div>
            {hasMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-4 inline-flex items-center gap-2 text-[#1F2288] font-semibold text-sm hover:underline transition"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <>
                    Show Less
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                  </>
                ) : (
                  <>
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </>
                )}
              </button>
            )}
          </div>
          {imageUrl && (
            <div className="rounded-3xl overflow-hidden h-[400px]">
              <img
                src={imageUrl}
                alt="About Manar Cargo"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
