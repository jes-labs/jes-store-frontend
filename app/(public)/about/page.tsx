'use client'

import PublicPageHeader from '@/components/landing/PublicPageHeader'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/constants/animation'
import { Check, Heart, Shield, Users, Zap, TrendingDown, Landmark, Globe, ShieldCheck, Percent, Banknote } from 'lucide-react'
import { cn } from '@/lib/utils'

const values = [
  {
    icon: Shield,
    title: 'Self-Custody',
    description: 'We never touch your funds. All payments settle directly into your own wallet through open protocols.'
  },
  {
    icon: Zap,
    title: 'Lightning Sync',
    description: 'Hardware-grade speed in the cloud. From scanning a barcode to WhatsApp sharing, every ms counts.'
  },
  {
    icon: Heart,
    title: 'Merchant Empathy',
    description: 'Built by engineers who have been behind the counter. We solve for the user, not the suit.'
  }
]

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full">
      <PublicPageHeader 
        eyebrow="Our Movement"
        title="Banking the <br/> unbankable."
        description="JesStore is the decentralized OS for the next billion merchants. We're building the infrastructure that makes commerce borderless, peer-to-peer, and unstoppable."
      />

      {/* The Problem: The Invisible Tax */}
      <section className="py-24 bg-[#0A0A0A] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                    The Crisis
                 </div>
                 <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-[1.1]">
                    The African Merchant's <br/>
                    <span className="text-red-400 italic">Invisible Tax.</span>
                 </h2>
                 <div className="space-y-6 text-lg text-muted-foreground font-body leading-relaxed">
                    <p>
                       For decades, African store owners have been trapped in a financial system that wasn't built for them. High transaction fees (up to 3.5%), surging inflation, and 3-day bank settlement delays are more than just "costs of business" — they are an invisible tax on growth.
                    </p>
                    <p>
                       While the world moves to digital commerce, our merchants are still stuck with manual records or expensive closed-loop systems that lock their liquidity behind a bank's red tape.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <ProblemStat label="Avg. Inflation" value="15%+" color="text-red-400" />
                    <ProblemStat label="Processor Fees" value="3.5%" color="text-red-400" />
                 </div>
              </div>
              
              <div className="relative">
                 <div className="absolute -inset-10 bg-red-500/10 blur-[100px] rounded-full opacity-30" />
                 <div className="relative glass-card p-1 items-center justify-center border-white/10 rounded-3xl overflow-hidden aspect-square flex">
                    <div className="text-center space-y-4 md:space-y-6">
                       <TrendingDown className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-red-500/40 mx-auto transition-all duration-500" />
                       <div className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-[0.4em]">Stagnation Loop</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* The Solution: Why JesStore? */}
      <section className="py-32 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                 The Sovereign Alternative
              </div>
              <h2 className="text-4xl sm:text-6xl font-heading font-bold text-white">Why JesStore?</h2>
              <p className="text-lg text-muted-foreground font-body">
                 We've replaced the bank's central ledger with the collective power of the blockchain.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SolutionCard 
                 icon={Globe}
                 title="Borderless"
                 desc="Accept USD value from any wallet, anywhere. No FX stress."
              />
              <SolutionCard 
                 icon={Zap}
                 title="Instant"
                 desc="Funds hit your wallet the second the order is placed."
              />
              <SolutionCard 
                 icon={Banknote}
                 title="0% Cut"
                 desc="Keep 100% of your sales revenue. Simple SaaS subscription."
              />
              <SolutionCard 
                 icon={ShieldCheck}
                 title="Verifiable"
                 desc="Every receipt is an on-chain proof of history."
              />
           </div>
        </div>
      </section>

      {/* Mission: The Next Billion */}
      <section className="py-24 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative aspect-video rounded-3xl overflow-hidden glass-card border-white/10 group">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-[#0A0A0A] to-secondary/20 flex flex-col items-center justify-center p-12 text-center space-y-6">
                    <Landmark className="w-12 h-12 text-primary/40" />
                    <div className="text-5xl font-heading font-bold text-white tracking-tighter italic">1,000,000</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Merchants Onboarded by 2028</div>
                 </div>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="space-y-8 order-1 lg:order-2"
              >
                <h2 className="text-4xl font-heading font-bold text-white uppercase italic tracking-tighter">Our North Star</h2>
                <div className="space-y-6 text-lg text-muted-foreground font-body leading-relaxed">
                   <p>
                      JesStore isn't just a software company; it's a sovereignty company. We believe that economic freedom starts behind the desk of every local store.
                   </p>
                   <p>
                      Our mission is to empower the next billion merchants to become their own bank. By leveraging decentralized protocols, we are erasing the borders that have historically limited African prosperity.
                   </p>
                   <p className="border-l-2 border-primary pl-6 text-white italic font-bold">
                      "When one merchant succeeds on-chain, their entire community gains a bridge to the global economy."
                   </p>
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-heading font-bold text-white mb-4">Core Principles</h2>
               <p className="text-muted-foreground max-w-xl mx-auto font-body">Our values guide every line of code we write and every merchant we serve.</p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
               {values.map((v) => (
                 <motion.div
                   key={v.title}
                   variants={fadeUp}
                   className="glass-card p-8 rounded-3xl space-y-4 hover:border-primary/20 transition-all group relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                       <v.icon className="w-24 h-24" />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:glow-green transition-all">
                       <v.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white uppercase italic">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-body">{v.description}</p>
                 </motion.div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* Final CTA Bridge */}
      <section className="py-32 bg-[#0A0A0A] overflow-hidden">
         <div className="max-w-3xl mx-auto text-center px-4 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-8">
               <h2 className="text-4xl sm:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tighter italic">Ready to reclaim your sovereignty?</h2>
               <p className="text-xl text-muted-foreground font-body">Setup your store in less than 5 minutes. No bank approval required.</p>
               <div className="pt-4">
                  <button className="bg-primary hover:bg-primary/90 text-black font-extrabold text-sm uppercase tracking-[0.2em] px-12 py-5 rounded-2xl glow-green transition-all hover:scale-105 active:scale-95 shadow-xl">
                     Get Started Now
                  </button>
               </div>
            </div>
         </div>
      </section>
    </main>
  )
}

function ProblemStat({ label, value, color }: any) {
  return (
    <div className="glass-card p-4 rounded-xl border-white/5">
       <div className={cn("text-2xl font-heading font-bold", color)}>{value}</div>
       <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{label}</div>
    </div>
  )
}

function SolutionCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="glass-card p-6 rounded-2xl border-white/5 space-y-4 hover:bg-white/[0.02] transition-colors">
       <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
       </div>
       <div className="space-y-1">
          <h4 className="text-sm font-bold text-white uppercase italic tracking-tight">{title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
             {desc}
          </p>
       </div>
    </div>
  )
}
