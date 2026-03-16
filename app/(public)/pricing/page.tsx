'use client'

import PublicPageHeader from '@/components/landing/PublicPageHeader'
import PricingSection from '@/components/landing/PricingSection'
import FAQSection from '@/components/landing/FAQSection'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/constants/animation'
import { Shield, Zap, Sparkles, Check, X, ShieldCheck, Globe, Percent } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pricingTiers } from '@/lib/constants/landing'

const comparisonFeatures = [
  { name: 'Number of Stores', starter: '1', pro: '1', growth: 'Up to 3' },
  { name: 'Products', starter: '50', pro: 'Unlimited', growth: 'Unlimited' },
  { name: 'Transaction Fees', starter: '0%', pro: '0%', growth: '0%' },
  { name: 'Stablecoin Settlement', starter: true, pro: true, growth: true },
  { name: 'POS Capabilities', starter: 'Basic', pro: 'Full', growth: 'Full + Multi-outlet' },
  { name: 'Analytics', starter: 'Standard', pro: 'Advanced', growth: 'Enterprise' },
  { name: 'Receipt Sharing', starter: 'Standard', pro: 'WhatsApp/Custom', growth: 'White-label' },
  { name: 'Staff Management', starter: false, pro: false, growth: true },
  { name: 'Custom Branding', starter: false, pro: true, growth: true },
  { name: 'API Access', starter: false, pro: false, growth: true },
]

export default function PricingPage() {
  return (
    <main className="flex flex-col w-full">
      <PublicPageHeader 
        eyebrow="Financials"
        title="Transparent pricing, <br/> pure profit."
        description="No hidden fees. No transaction cuts. Just straightforward plans to power your on-chain commerce."
      />

      {/* Social Proof Stats */}
      <section className="py-12 bg-[#0A0A0A] border-b border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingStat icon={Shield} title="0%" desc="Platform transaction fees" />
            <PricingStat icon={Zap} title="Instant" desc="Direct P2P settlement" />
            <PricingStat icon={Sparkles} title="Global" desc="Stable settlements in USD" />
         </div>
      </section>

      <PricingSection />

      {/* Feature Comparison Table */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-heading font-bold text-white mb-4">Detailed Comparison</h2>
               <p className="text-muted-foreground font-body">Every tool you need, mapped out.</p>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-white/10 uppercase tracking-widest text-[10px] text-muted-foreground font-bold">
                        <th className="py-6 px-4">Feature</th>
                        <th className="py-6 px-4">Starter</th>
                        <th className="py-6 px-4 text-primary">Pro</th>
                        <th className="py-6 px-4">Growth</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm font-body">
                     {comparisonFeatures.map((f, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                           <td className="py-5 px-4 text-gray-400">{f.name}</td>
                           <td className="py-5 px-4 text-white">
                              {typeof f.starter === 'boolean' ? (
                                 f.starter ? <Check className="w-4 h-4 text-primary" /> : <X className="w-4 h-4 text-white/20" />
                              ) : f.starter}
                           </td>
                           <td className="py-5 px-4 text-white font-bold">
                              {typeof f.pro === 'boolean' ? (
                                 f.pro ? <Check className="w-4 h-4 text-primary" /> : <X className="w-4 h-4 text-white/20" />
                              ) : f.pro}
                           </td>
                           <td className="py-5 px-4 text-white">
                              {typeof f.growth === 'boolean' ? (
                                 f.growth ? <Check className="w-4 h-4 text-primary" /> : <X className="w-4 h-4 text-white/20" />
                              ) : f.growth}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>

      {/* The Zero-Fee Advantage Section */}
      <section className="py-32 bg-[#0A0A0A] overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                     The Merchant Advantage
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-[1.1]">
                     Stop losing <span className="text-primary">3.5%</span> of <br/>
                     every single sale.
                  </h2>
                  <p className="text-lg text-muted-foreground font-body leading-relaxed">
                     Traditional payment processors in Africa eat into your margins with hidden fees and settlement delays. JesStore shifts the power back to you.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                     <ValueProp 
                        icon={Percent}
                        title="0% Commission"
                        desc="We never take a cut of your revenue. Your hard-earned money stays with you."
                     />
                     <ValueProp 
                        icon={ShieldCheck}
                        title="Self-Custodial"
                        desc="Funds go directly from customer to your wallet. No middleman holding your cash."
                     />
                     <ValueProp 
                        icon={Globe}
                        title="Cross-Border"
                        desc="Accept payments from anywhere in the world without worrying about currency conversion."
                     />
                     <ValueProp 
                        icon={Zap}
                        title="Instant Access"
                        desc="Liquidity is instant. No 3-day wait for bank settlements to clear."
                     />
                  </div>
               </div>

               <div className="relative order-first lg:order-last">
                  <div className="absolute -inset-10 bg-primary/20 blur-[120px] rounded-full opacity-20 animate-pulse" />
                  <div className="relative glass-card p-8 rounded-3xl border-white/10 aspect-video flex flex-col justify-center items-center text-center space-y-4">
                     <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.3em]">Potential Savings</div>
                     <div className="text-6xl sm:text-7xl font-heading font-bold text-white tracking-tighter">
                        +$2,400<span className="text-primary">/yr</span>
                     </div>
                     <div className="text-sm text-gray-400 font-body italic max-w-xs mx-auto">
                        Based on $8,000 monthly volume compared to traditional card processors.
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  )
}

function PricingStat({ icon: Icon, title, desc }: any) {
  return (
    <motion.div 
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-6 space-y-2"
    >
       <Icon className="w-5 h-5 text-primary mb-2" />
       <div className="text-2xl font-heading font-bold text-white">{title}</div>
       <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{desc}</div>
    </motion.div>
  )
}

function ValueProp({ icon: Icon, title, desc }: any) {
   return (
      <div className="space-y-2">
         <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-bold text-white uppercase italic tracking-tight">{title}</h4>
         </div>
         <p className="text-xs text-muted-foreground leading-relaxed">
            {desc}
         </p>
      </div>
   )
}
