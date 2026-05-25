'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Package, MapPin, Clock, CheckCircle2 } from 'lucide-react'

export default function TrackingInterface() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingNumber.trim()) {
      // Mock result
      setResult({
        id: trackingNumber,
        status: 'In Transit',
        origin: 'Dubai, UAE',
        destination: 'Hargeisa, SL',
        lastUpdate: '2 hours ago',
        steps: [
          { status: 'Manifested', date: 'May 12, 10:00 AM', done: true },
          { status: 'Picked Up', date: 'May 12, 02:30 PM', done: true },
          { status: 'In Transit', date: 'May 13, 08:00 AM', done: true },
          { status: 'Out for Delivery', date: 'Expected Tomorrow', done: false },
        ]
      })
    }
  }

  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 p-3 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] mb-16">
            <div className="flex-1 relative flex items-center px-4">
              <Search className="h-6 w-6 text-[#1F2288] mr-4 opacity-50" />
              <Input
                placeholder="Enter Tracking Number"
                className="h-14 border-none bg-transparent focus-visible:ring-0 text-xl"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-16 px-12 bg-[#1F2288] hover:bg-[#161966] text-white font-bold rounded-xl transition-all shadow-xl shadow-primary/20">
              Track Now
            </Button>
          </form>

          {result && (
            <div className="bg-[#F9F7FA] rounded-[3rem] p-12 border border-[#E5E7EB] animate-in fade-in duration-500">
              <div className="flex flex-wrap justify-between items-start gap-8 mb-12">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1F2288] mb-2">Tracking ID</h3>
                  <p className="text-3xl font-bold text-[#110713]">{result.id}</p>
                </div>
                <div className="bg-[#1F2288] text-white px-6 py-2 rounded-full font-bold">
                  {result.status}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-12 mb-16">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#66556B] mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Origin
                  </h4>
                  <p className="text-xl font-bold text-[#110713]">{result.origin}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#66556B] mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Destination
                  </h4>
                  <p className="text-xl font-bold text-[#110713]">{result.destination}</p>
                </div>
              </div>

              <div className="space-y-10">
                {result.steps.map((step: any, i: number) => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== result.steps.length - 1 && (
                      <div className={`absolute left-4 top-10 w-0.5 h-10 ${step.done ? 'bg-[#1F2288]' : 'bg-[#E5E7EB]'}`}></div>
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-[#1F2288] text-white' : 'bg-white border-2 border-[#E5E7EB] text-[#E5E7EB]'}`}>
                      {step.done ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold ${step.done ? 'text-[#110713]' : 'text-[#66556B]'}`}>{step.status}</h4>
                      <p className="text-[#66556B]">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


