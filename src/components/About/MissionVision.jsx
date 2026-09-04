import React from 'react'
import { Target, Eye } from 'lucide-react'

export default function MissionVision({ data }) {
  const missionText = data?.mission || "To provide efficient, secure, and affordable cargo solutions that exceed customer expectations.";
  const visionText = data?.vision || "To become a globally trusted logistics partner known for reliability and excellence.";

  return (
    <section className="py-8 bg-[#f8fafc]">
      <div className="max-w-[1240px] mx-auto px-5 grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <Target className="text-[#1F2288] mb-5" size={40} />
          <h3 className="text-2xl font-bold mb-4">
            Our Mission
          </h3>
          <p className="text-gray-600 whitespace-pre-line">
            {missionText}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <Eye className="text-[#1F2288] mb-5" size={40} />
          <h3 className="text-2xl font-bold mb-4">
            Our Vision
          </h3>
          <p className="text-gray-600 whitespace-pre-line">
            {visionText}
          </p>
        </div>

      </div>
    </section>
  )
}