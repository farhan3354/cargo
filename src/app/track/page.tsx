'use client'

import React from 'react'
import TrackHero from '@/components/Track/TrackHero'
import TrackingInterface from '@/components/Track/TrackingInterface'
import FAQ from '@/components/Track/FAQ' // I'll create this next

export default function TrackPage() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <TrackHero />
      <TrackingInterface />
    </main>
  )
}
