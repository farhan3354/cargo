import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Global Logistics in 2026',
    excerpt: 'Explore how automation and sustainable practices are reshaping the shipping industry and what it means for global commerce.',
    date: 'May 10, 2026',
    author: 'Ali Khan',
    image: 'https://manarcargo.com/wp-content/uploads/2026/05/pexels-photo-31592576.jpeg',
  },
  {
    id: 2,
    title: '5 Tips for Efficient International Shipping',
    excerpt: 'Streamline your international deliveries with these expert tips on documentation, packaging, and choosing the right freight partner.',
    date: 'May 05, 2026',
    author: 'Support Team',
    image: 'https://manarcargo.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-13-at-4.09.51-PM-4-1.jpeg',
  },
  {
    id: 3,
    title: 'Expanding Our Reach: New Routes to East Africa',
    excerpt: 'Manar Cargo is proud to announce new express shipping routes to Hargeisa and Mogadishu, enhancing our commitment to regional connectivity.',
    date: 'April 28, 2026',
    author: 'Admin',
    image: 'https://manarcargo.com/wp-content/uploads/2026/05/pexels-photo-34406344.jpeg',
  },
]

export default function BlogList() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-[#E5E7EB] hover:shadow-2xl transition-all duration-500">
              <div className="h-64 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-6 text-sm text-[#66556B] font-bold uppercase tracking-widest mb-6">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#1F2288]" /> {post.date}</span>
                  <span className="flex items-center gap-2"><User className="h-4 w-4 text-[#1F2288]" /> {post.author}</span>
                </div>
                <h3 className="text-2xl font-heading font-normal text-[#110713] mb-6 leading-tight group-hover:text-[#1F2288] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#66556B] leading-relaxed mb-8 flex-1">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-[#1F2288] font-bold uppercase tracking-widest text-sm group/btn">
                  Read More <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


