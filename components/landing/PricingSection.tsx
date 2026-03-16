'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { pricingTiers } from '@/lib/constants/landing'
import { staggerContainer, fadeUp, scaleIn } from '@/lib/constants/animation'
import { cn } from '@/lib/utils'

/**
 * PricingSection
 * Features a monthly/annual toggle and 3 tiered pricing cards
 */
export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section id="pricing" className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Pricing Plans</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
            Scale your store with <br />
            <span className="gradient-text">no hidden fees.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Choose the plan that fits your business size. Save 20% when you pay annually using stablecoins.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
           <div className="relative p-1 bg-white/[0.03] border border-white/10 rounded-full flex items-center">
              <motion.div
                className="absolute inset-y-1 bg-primary rounded-full z-0 shadow-lg glow-green"
                initial={false}
                animate={{
                   x: billingCycle === 'monthly' ? 0 : '100%',
                   width: '50%'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <button
                onClick={() => setBillingCycle('monthly')}
                className={cn(
                  "relative z-10 px-8 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200",
                  billingCycle === 'monthly' ? "text-black" : "text-muted-foreground hover:text-white"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={cn(
                  "relative z-10 px-8 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200",
                  billingCycle === 'yearly' ? "text-black" : "text-muted-foreground hover:text-white"
                )}
              >
                Yearly
              </button>
           </div>
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pricingTiers.map((tier) => {
            const price = billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice
            const isPro = tier.name === 'Pro'

            return (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                className={cn(
                  "relative flex flex-col glass-card p-8 rounded-3xl transition-all duration-300",
                  isPro && "border-primary/40 shadow-[0_0_50px_rgba(34,197,94,0.1)] scale-105 z-20"
                )}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg glow-green flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-heading font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">{tier.description}</p>
                </div>

                <div className="mb-8">
                   <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-heading font-bold text-white tracking-tighter">${price.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm font-body">/mo</span>
                   </div>
                   {billingCycle === 'yearly' && price !== 0 && (
                     <div className="text-[10px] text-primary font-bold mt-1">Paid annually (save 20%)</div>
                   )}
                </div>

                <div className="space-y-4 mb-10 flex-1">
                   {tier.features.map((feature) => (
                     <div key={feature.text} className={cn("flex items-start gap-3", !feature.included && "opacity-40")}>
                        <Check className={cn("w-4 h-4 mt-0.5 shrink-0", feature.included ? "text-primary" : "text-muted-foreground")} />
                        <span className="text-sm text-gray-300 font-body">{feature.text}</span>
                     </div>
                   ))}
                </div>

                <Button
                  variant={isPro ? 'default' : 'outline'}
                  size="lg"
                  className={cn(
                    "w-full rounded-2xl h-12 font-bold transition-all",
                    isPro ? "bg-primary hover:bg-primary/90 text-black glow-green" : "border-white/10 hover:bg-white/5 text-white"
                  )}
                >
                  {tier.ctaText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Note */}
        <p className="text-center mt-12 text-muted-foreground text-sm font-body">
          All on-chain settlement happens via smart contracts. JesStore takes 0% transaction fees.
        </p>
      </div>
    </section>
  )
}
