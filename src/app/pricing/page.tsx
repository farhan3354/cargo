'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Calculator, CheckCircle2, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const [weight, setWeight] = useState('1')
  const [type, setType] = useState('domestic')

  const pricingPlans = [
    {
      name: 'Standard Domestic',
      price: 12,
      description: 'Reliable delivery for non-urgent shipments',
      features: [
        '3-5 business days',
        'Basic tracking',
        'Up to 10kg',
        'No extra charges',
        'Secure handling',
      ],
    },
    {
      name: 'Express Domestic',
      price: 25,
      description: 'Fast delivery for time-sensitive packages',
      features: [
        '1-2 business days',
        'Real-time tracking',
        'Up to 10kg',
        'Priority handling',
        'SMS notifications',
        'Insurance included',
      ],
      popular: true,
    },
    {
      name: 'International Express',
      price: 65,
      description: 'Global delivery with speed and reliability',
      features: [
        '5-7 business days',
        'International tracking',
        'Customs clearance',
        'Up to 15kg',
        'Dedicated support',
        'Full insurance',
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Main Wrapper with Spacing */}
      <div className="w-full max-w-[1600px] mx-auto px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
      {/* Hero Banner */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src="/images/pricing-concept.png"
          alt="Pricing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1">
              Transparent Pricing
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Choose the plan that fits your needs. No hidden fees, no surprises. Get instant quotes for your shipments.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 h-12 px-8 font-semibold">
                Contact Sales
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 lg:py-24 -mt-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto border-2 border-blue-200 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Quick Price Calculator
              </CardTitle>
              <CardDescription>Get an instant estimate for your shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Package Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="0.1"
                    step="0.1"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Shipping Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={type === 'domestic' ? 'default' : 'outline'}
                      onClick={() => setType('domestic')}
                      className={type === 'domestic' ? 'bg-blue-600' : ''}
                      size="lg"
                    >
                      Domestic
                    </Button>
                    <Button
                      type="button"
                      variant={type === 'international' ? 'default' : 'outline'}
                      onClick={() => setType('international')}
                      className={type === 'international' ? 'bg-blue-600' : ''}
                      size="lg"
                    >
                      International
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg text-slate-700">Estimated Price:</span>
                  <span className="text-4xl font-bold text-blue-700">
                    ${((parseFloat(weight) || 1) * (type === 'domestic' ? 12 : 35)).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  *Actual price may vary based on dimensions, destination, and additional services
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select the shipping option that best meets your needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-2 transition-all hover:shadow-xl ${
                  plan.popular
                    ? 'border-blue-500 scale-105 shadow-lg'
                    : 'border-slate-200 hover:border-blue-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                    <span className="text-slate-500 ml-2">/ shipment</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-600">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
                          : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                      }`}
                      size="lg"
                    >
                      Choose Plan
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 text-center">
              Express vs Standard
            </h2>
            <Card className="border-2 border-blue-200">
              <CardContent className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-4 px-4 font-semibold text-slate-900">Feature</th>
                        <th className="text-center py-4 px-4 font-semibold text-slate-900">Standard</th>
                        <th className="text-center py-4 px-4 font-semibold text-blue-600">Express</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Delivery Time', '3-5 days', '1-2 days'],
                        ['Tracking', 'Basic', 'Real-time'],
                        ['Priority Handling', 'No', 'Yes'],
                        ['SMS Notifications', 'No', 'Yes'],
                        ['Insurance', 'Basic', 'Full'],
                        ['Price', '$12', '$25'],
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-slate-100 last:border-0">
                          <td className="py-4 px-4 text-slate-700 font-medium">{row[0]}</td>
                          <td className="py-4 px-4 text-center text-slate-600">{row[1]}</td>
                          <td className="py-4 px-4 text-center font-semibold text-blue-600">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Pricing?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 hover:border-blue-200 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Calculator className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-2">Transparent Pricing</h4>
                    <p className="text-slate-600">No hidden fees or surprise charges. The price you see is the price you pay.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-blue-200 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                    <TrendingUp className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-2">Volume Discounts</h4>
                    <p className="text-slate-600">Regular shippers can benefit from discounted rates and customized pricing plans.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-blue-200 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-2">Insurance Included</h4>
                    <p className="text-slate-600">All shipments come with basic insurance. Additional coverage available for high-value items.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-blue-200 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-2">Money-Back Guarantee</h4>
                    <p className="text-slate-600">Not satisfied with our service? We offer refunds under our service guarantee policy.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact our team for a custom quote tailored to your shipping needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 h-12 px-8 font-semibold">
              Get a Custom Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      </div>
    </div>
  )
}
