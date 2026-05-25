"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Clock, Calculator, Navigation, HelpCircle, ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import ContactModal from '@/components/Contact/ContactModal'


export default function FAQPage() {
  const faqCategories = [
    {
      category: 'Shipping Time',
      icon: <Clock className="h-6 w-6" />,
      questions: [
        {
          q: 'How long does domestic shipping take?',
          a: 'Standard domestic shipping typically takes 3-5 business days. Express delivery can arrive within 1-2 business days. Same-day delivery is available in select metropolitan areas for urgent shipments.',
        },
        {
          q: 'What are the delivery times for international shipments?',
          a: 'International shipping times vary by destination: Express International (5-7 business days), Standard International (10-14 business days), and Economy International (14-21 business days). Customs clearance may affect these times.',
        },
        {
          q: 'Can I schedule a specific delivery time?',
          a: 'Yes, we offer scheduled delivery options. During booking, you can select a preferred delivery date and time window (morning, afternoon, or evening). Additional fees may apply for scheduled deliveries.',
        },
      ],
    },
    {
      category: 'Pricing',
      icon: <Calculator className="h-6 w-6" />,
      questions: [
        {
          q: 'How is shipping cost calculated?',
          a: 'Shipping costs are based on package weight, dimensions, destination, delivery speed, and any additional services (insurance, signature required, etc.). Use our pricing calculator on the pricing page for accurate estimates.',
        },
        {
          q: 'Are there any hidden fees?',
          a: 'No hidden fees. The price shown during booking includes all shipping costs. International shipments may have customs duties or taxes levied by the destination country, which are the responsibility of the recipient.',
        },
        {
          q: 'Do you offer volume discounts?',
          a: 'Yes, we offer competitive rates for businesses with regular shipping needs. Contact our sales team for customized pricing plans and volume discounts. We have special programs for e-commerce and enterprise customers.',
        },
      ],
    },
    {
      category: 'Tracking',
      icon: <Navigation className="h-6 w-6" />,
      questions: [
        {
          q: 'How do I track my shipment?',
          a: 'Enter your tracking number on our Track Shipment page. You\'ll receive real-time updates including pickup, transit, and delivery status. You can also opt for SMS or email notifications for updates.',
        },
        {
          q: 'What if my package is delayed?',
          a: 'If your package is delayed beyond the estimated delivery date, our system automatically alerts our support team. Contact us with your tracking number for immediate assistance and detailed status information.',
        },
      ],
    },
    {
      category: 'Support',
      icon: <HelpCircle className="h-6 w-6" />,
      questions: [
        {
          q: 'What should I do if my package is lost or damaged?',
          a: 'File a claim within 48 hours of the expected delivery date. Our claims team will investigate promptly. All shipments include basic insurance, with additional coverage available for high-value items.',
        },
        {
          q: 'How do I change delivery address after shipping?',
          a: 'Contact our support team with your tracking number as soon as possible. Address changes are possible before the package reaches the destination hub. A small fee may apply for address redirection.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, bank transfers, and corporate payment options. For businesses, we also offer monthly billing arrangements.',
        },
      ],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      <div className="w-full max-w-[1600px] mx-auto px-6 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src="/images/customer-support.png"
          alt="Frequently Asked Questions"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1">
              FAQ
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Find answers to common questions about our services. Can't find what you're looking for? Ask our support team directly.
            </p>
            <button
              onClick={openModal}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-base font-semibold shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Ask a Custom Question
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{category.category}</h2>
                </div>
                <Accordion type="single" collapsible className="border-2 border-slate-200 rounded-xl mb-8">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem key={qIndex} value={`q-${catIndex}-${qIndex}`}>
                      <AccordionTrigger className="px-6 hover:no-underline hover:bg-slate-50">
                        <span className="text-left font-medium text-lg">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 text-slate-600">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Still Have Questions?
                  </h2>
                  <p className="text-lg text-slate-600">
                    Our support team is here to help you with any questions or concerns.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <a href="tel:+971523979396" className="group">
                    <Card className="border-2 hover:border-blue-400 hover:shadow-lg transition-all h-full cursor-pointer flex flex-col justify-between">
                      <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                        <Phone className="h-10 w-10 text-blue-600 mb-3 group-hover:scale-110 transition-transform mx-auto" />
                        <h4 className="text-xl font-semibold text-slate-900 mb-2">Dubai Call</h4>
                        <p className="text-slate-600 mb-3">
                          Speak with our team directly for immediate assistance.
                        </p>
                        <span className="text-[#1F2288] font-bold text-sm select-all">
                          +971 52 397 9396
                        </span>
                      </CardContent>
                    </Card>
                  </a>
                  
                  <a href="https://wa.me/971523979396" target="_blank" rel="noopener noreferrer" className="group">
                    <Card className="border-2 hover:border-green-400 hover:shadow-lg transition-all h-full cursor-pointer flex flex-col justify-between">
                      <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                        <MessageCircle className="h-10 w-10 text-green-600 mb-3 group-hover:scale-110 transition-transform mx-auto" />
                        <h4 className="text-xl font-semibold text-slate-900 mb-2">WhatsApp</h4>
                        <p className="text-slate-600 mb-3">
                          Chat with our support experts online.
                        </p>
                        <span className="text-green-600 font-bold text-sm select-all">
                          +971 52 397 9396
                        </span>
                      </CardContent>
                    </Card>
                  </a>

                  <button onClick={openModal} className="group text-left h-full w-full focus:outline-none">
                    <Card className="border-2 hover:border-[#1F2288] hover:shadow-lg transition-all h-full cursor-pointer flex flex-col justify-between">
                      <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                        <Mail className="h-10 w-10 text-[#1F2288] mb-3 group-hover:scale-110 transition-transform mx-auto" />
                        <h4 className="text-xl font-semibold text-slate-900 mb-2">Email Support</h4>
                        <p className="text-slate-600 mb-3">
                          Open our inquiry form with secure CAPTCHA check.
                        </p>
                        <span className="text-[#1F2288] font-bold text-sm">
                          Send Inquiry Now
                        </span>
                      </CardContent>
                    </Card>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipient={"manarcargo@manarcargo.com"}
        title={"Ask a Question"}
        submitLabel={"Submit Question"}
      />

      </div>
    </div>
  );
}
