'use client'

import React from 'react'
import BlogHero from '@/components/Blog/BlogHero'
import BlogList from '@/components/Blog/BlogList'
import FinalCTA from '@/components/Home/FinalCTA'

export default function BlogPage() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <BlogHero />
      <BlogList />
      <FinalCTA />
    </main>
  )
}
