"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Phone, MapPin, Mail, Globe, Navigation } from "lucide-react";

const offices = [
  {
    city: "Dubai Head Office",
    desc: "Our main office in Dubai is available for cargo inquiries, shipment bookings, and customer support.",
    img: "/officesimage/Gemini_Generated_Image_55i1jg55i1jg55i1.png",
    phones: ["+971 52 397 9396", "+971 45 476 860"],
    email: "dubai@manarcargo.com",
    location: "Dubai, UAE",
    country: "UAE",
  },
  {
    city: "Hargeisa Office",
    desc: "Our Hargeisa branch supports cargo delivery, customer assistance, and shipment tracking across Somaliland.",
    img: "/officesimage/Gemini_Generated_Image_cijc7pcijc7pcijc.png",
    phones: ["+252 63 7448552", "+252 63 8880742"],
    email: "hargeisa@manarcargo.com",
    location: "Hargeisa, Somaliland",
    country: "Somaliland",
  },
  {
    city: "Wajaale Office",
    desc: "Serving customers with reliable cargo handling and logistics support in Wajaale.",
    img: "/officesimage/Gemini_Generated_Image_kmjn2qkmjn2qkmjn.png",
    phones: ["+252 63 7448552", "+252 63 4426732"],
    email: "wajaale@manarcargo.com",
    location: "Wajaale, Somaliland",
    country: "Somaliland",
  },
  {
    city: "Mogadishu Office",
    desc: "Our Mogadishu office provides fast cargo coordination and shipment support for Somalia customers.",
    img: "/officesimage/Gemini_Generated_Image_r5vo6sr5vo6sr5vo.png",
    phones: ["+252 614431212", "+252 610881212"],
    email: "mogadishu@manarcargo.com",
    location: "Mogadishu, Somalia",
    country: "Somalia",
  },
  {
    city: "Bosaso Office",
    desc: "Reliable cargo services and customer support for shipments through our Bosaso branch.",
    img: "/officesimage/Gemini_Generated_Image_x4kj19x4kj19x4kj.png",
    phones: ["+252 904000029", "+252 904000036"],
    email: "bosaso@manarcargo.com",
    location: "Bosaso, Somalia",
    country: "Somalia",
  },
  {
    city: "Jigjiga Office",
    desc: "Our Ethiopia branch helps customers with shipment processing, support, and logistics coordination.",
    img: "/officesimage/Gemini_Generated_Image_yhe5jtyhe5jtyhe5.png",
    phones: ["+251 907940777", "+251 966553166"],
    email: "jigjiga@manarcargo.com",
    location: "Jigjiga, Ethiopia",
    country: "Ethiopia",
  },
];

const globalEmails = ["Manaralkhaircargo@gmail.com", "Info@Manarcargo.com"];

export default function Offices({
  onContactClick,
}: { onContactClick?: (email: string) => void } = {}) {
  const router = useRouter();

  return (
    <section className="py-8 md:py-14 bg-gradient-to-br from-[#F9F7FA] via-white to-[#F9F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#E5E7EB] px-4 py-2 rounded-full mb-6">
            <Globe className="w-4 h-4 text-[#110713]" />
            <span className="text-sm font-medium text-[#110713]">
              Our Global Presence
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#110713] mb-4">
            Our Global Offices &{" "}
            <span className="text-[#1F2288]">Contact Information</span>
          </h2>
          <p className="text-base sm:text-lg text-[#66556B] max-w-2xl mx-auto">
            Connect with MANAR Al Khair Cargo L.L.C for cargo bookings, shipment
            tracking, and logistics support across 6 strategic locations.
          </p>
        </div>

        <div className="mb-12 bg-white rounded-2xl shadow-md border border-[#E5E7EB] p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#1F2288]" />
              <span className="text-sm font-semibold text-[#110713]">
                Global Emails:
              </span>
            </div>
            {globalEmails.map((email, idx) => (
              <a
                key={idx}
                href={`mailto:${email}`}
                className="text-sm text-[#66556B] hover:text-[#1F2288] transition-colors"
              >
                {email}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {offices.map((office, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#E5E7EB]"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={office.img}
                  alt={office.city}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <span className="text-white text-xs font-medium">
                    {office.location}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#1F2288]" />
                  <h4 className="text-lg md:text-xl font-bold text-[#110713]">
                    {office.city}
                  </h4>
                </div>

                <p className="text-sm text-[#66556B] leading-relaxed min-h-[70px]">
                  {office.desc}
                </p>
                <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
                  <div className="flex items-center justify-between border-b border-[#E8DFEB] pb-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#1F2288]" />
                      <p className="text-xs font-semibold text-[#1F2288] uppercase tracking-wider">
                        Phone Numbers
                      </p>
                    </div>
                  </div>
                  {office.phones.map((phone, pi) => (
                    <div key={pi} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#1F2288]" />
                        <span className="text-sm font-medium text-[#110713]">
                          {phone}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Mail className="w-4 h-4 text-[#1F2288]" />
                  <a
                    href={`mailto:${office.email}`}
                    className="text-sm text-[#66556B] hover:text-[#1F2288] transition-colors"
                  >
                    {office.email}
                  </a>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      if (onContactClick) onContactClick(office.email);
                      else router.push("/contact");
                    }}
                    className="flex-1 bg-gradient-to-r from-[#1F2288] to-[#323592] text-white font-semibold py-2.5 px-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Contact Us
                  </button>
                  {/* <button 
                    onClick={() => window.open('https://maps.google.com/?q=' + encodeURIComponent(office.city), '_blank')}
                    className="flex-1 border-2 border-[#1F2288] text-[#1F2288] font-semibold py-2.5 px-3 rounded-xl hover:bg-[#1F2288] hover:text-white transition-all duration-200 text-sm flex items-center justify-center gap-1"
                  >
                    <MapPin className="w-4 h-4" />
                    Directions
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// import React from 'react'

// const offices = [
//   { city: 'Dubai Head Office', desc: 'Our main office in Dubai is available for cargo inquiries, shipment bookings, and customer support.', img: 'https://manarcargo.com/wp-content/uploads/2026/05/pexels-photo-33438757-33438757-556x1024.jpg', phones: ['+971 52 397 9396', '+971 45 476 860'] },
//   { city: 'Hargeisa Office', desc: 'Our Hargeisa branch supports cargo delivery, customer assistance, and shipment tracking across Somaliland.', img: 'https://manarcargo.com/wp-content/uploads/2026/05/pexels-photo-33952950-33952950-1024x576.jpg', phones: ['+252 63 7448552', '+252 63 8880742'] },
//   { city: 'Wajaale Office', desc: 'Serving customers with reliable cargo handling and logistics support in Wajaale.', img: 'https://manarcargo.com/wp-content/uploads/2026/05/g1d0f190d28f0d0f7fbea0cbeba82aebdb14101ed5b342229b865e3727dfb16b56974752770b9b3247bfc22e2ee61fe76051cd0746d0df98e76ad45a21f46ddf0_1280-2256489-1024x682.jpg', phones: ['+252 63 7448552', '+252 63 4426732'] },
//   { city: 'Mogadishu Office', desc: 'Our Mogadishu office provides fast cargo coordination and shipment support for Somalia customers.', img: 'https://manarcargo.com/wp-content/uploads/2026/05/gce421d51067a74b576248c4d425bbc08d07aa6719f41f18465694f3bae11648a7420a2e98e98a1a8000c3b2d4b419a9aecc2e15e045dbc311f7dc899be574992_1280-6011756-819x1024.jpg', phones: ['+252 614431212', '+252 610881212', '+252 615507013'] },
//   { city: 'Bosaso Office', desc: 'Reliable cargo services and customer support for shipments through our Bosaso branch.', img: 'https://images.unsplash.com/photo-1658225595905-7bd75d10a265?fit=crop&crop=entropy%2Cfaces&auto=format%2Ccompress&w=1280', phones: ['+252 904000029', '+252 904000036'] },
//   { city: 'Jigjiga Office', desc: 'Our Ethiopia branch helps customers with shipment processing, support, and logistics coordination.', img: 'https://images.unsplash.com/photo-1689852500881-e80588efaed6?fit=crop&crop=entropy%2Cfaces&auto=format%2Ccompress&w=1280', phones: ['+251 907940777', '+251 966553166'] },
// ]

// export default function Offices() {
//   return (
//     <section className="py-32 bg-[#F9F7FA]">
//       <div className="max-w-[1240px] mx-auto px-5">
//         <h2 className="text-4xl lg:text-5xl font-heading font-normal text-[#110713] mb-6">Our Global Offices & Contact Information</h2>
//         <p className="text-lg text-[#66556B] mb-20 max-w-3xl">Connect with MANAR Al Khair Cargo L.L.C for cargo bookings, shipment tracking, and logistics support.</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {offices.map((office, i) => (
//             <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
//               <div className="h-48 overflow-hidden">
//                 <img src={office.img} alt={office.city} className="w-full h-full object-cover" />
//               </div>
//               <div className="p-8 space-y-6 text-center">
//                 <h4 className="text-xl font-bold text-[#110713]">{office.city}</h4>
//                 <p className="text-sm text-[#66556B] leading-relaxed">{office.desc}</p>
//                 <div className="pt-4 space-y-2">
//                   {office.phones.map((phone, pi) => (
//                     <div key={pi} className="text-[#110713] font-bold">{phone}</div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
