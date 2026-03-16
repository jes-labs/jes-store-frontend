'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { faqs } from '@/lib/constants/landing'
import { cn } from '@/lib/utils'

/**
 * FAQSection
 * Features a modern accordion layout with smooth height transitions
 */
export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-6">
            Got questions? <br />
            <span className="text-primary">We've got answers.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Everything you need to know about setting up your on-chain store.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index
            
            return (
              <div
                key={index}
                className={cn(
                  "glass-card rounded-2xl border-white/5 overflow-hidden transition-all duration-300",
                  isOpen && "border-primary/20 bg-white/[0.04]"
                )}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left group"
                >
                  <span className={cn(
                    "text-base font-heading font-bold transition-colors",
                    isOpen ? "text-primary" : "text-white group-hover:text-primary/70"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isOpen ? "bg-primary text-black" : "bg-white/5 text-muted-foreground"
                  )}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-sm text-muted-foreground font-body leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-8 rounded-3xl bg-primary/5 border border-primary/10">
           <h4 className="text-white font-heading font-bold mb-2">Still have more questions?</h4>
           <p className="text-sm text-muted-foreground font-body mb-6">Our team is ready to help you migrate your store today.</p>
           <button className="text-primary font-bold hover:underline underline-offset-4 flex items-center gap-2 mx-auto">
              Contact Support →
           </button>
        </div>
      </div>
    </section>
  )
}
