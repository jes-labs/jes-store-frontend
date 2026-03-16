'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeIn, fadeUp, staggerContainer } from '@/lib/constants/animation'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

/**
 * AnalyticsSection
 * Highlights business insights with animated charts and stats
 */
export default function AnalyticsSection() {
  const [counts, setCounts] = useState({ revenue: 0, growth: 0, time: 0 })

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounts({ revenue: 4.2, growth: 340, time: 2 })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left - Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full transition-colors">
                 Know your numbers
              </span>
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-tight">
                See exactly how your <br />
                <span className="gradient-text">business performs.</span>
              </h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-xl">
                Stop guessing. JesStore Analytics shows you real-time revenue, profit margins, best-selling products, and customer trends — all in one place.
              </p>
            </div>

            {/* Stat Trio */}
            <div className="grid grid-cols-3 gap-6">
               <StatItem label="avg monthly revenue" value={`$${counts.revenue}k`} />
               <StatItem label="more receipts" value={`${counts.growth}%`} />
               <StatItem label="per sale" value={`< ${counts.time} min`} />
            </div>

            <div className="pt-2">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-primary/30 text-primary hover:bg-primary/5 font-bold group">
                Explore Analytics
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Right - Animated Analytics Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative"
          >
             <div className="glass-card rounded-2xl p-6 lg:p-8 space-y-8 shadow-2xl relative z-10">
                <div className="flex justify-between items-center">
                   <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Revenue Overview</div>
                   <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white font-body">Last 30 days ▾</div>
                </div>

                <div className="space-y-1">
                   <div className="text-4xl font-heading font-bold text-white tabular-nums tracking-tighter">$ 28,470</div>
                   <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold">
                         <TrendingUp className="w-3 h-3" /> +12.4%
                      </div>
                      <span className="text-[10px] text-muted-foreground">vs last month</span>
                   </div>
                </div>

                {/* Animated Bars/Chart Area */}
                <div className="h-32 flex items-end gap-2 px-1">
                   {[30, 45, 35, 60, 50, 80, 75, 90, 85, 95].map((h, i) => (
                     <motion.div
                       key={i}
                       initial={{ height: 0 }}
                       whileInView={{ height: `${h}%` }}
                       transition={{ delay: 0.5 + (i * 0.05), duration: 0.8, ease: "easeOut" }}
                       className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 border-x border-t border-primary/30 rounded-t-sm"
                     />
                   ))}
                </div>

                {/* Top Products */}
                <div className="space-y-4 pt-4">
                   <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Top Products</div>
                   <div className="space-y-4">
                      <ProductStat label="Air Force 1" progress={78} value="$5,800" />
                      <ProductStat label="Levi's Jeans" progress={62} value="$3,100" />
                      <ProductStat label="iPhone Case" progress={45} value="$1,800" />
                   </div>
                </div>
             </div>

             {/* Background glow */}
             <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
       <div className="text-xl lg:text-3xl font-heading font-bold text-white gradient-text">{value}</div>
       <div className="text-[8px] lg:text-[10px] uppercase text-muted-foreground/60 font-bold tracking-widest leading-tight">{label}</div>
    </div>
  )
}

function ProductStat({ label, progress, value }: { label: string, progress: number, value: string }) {
  return (
    <div className="space-y-1.5">
       <div className="flex justify-between text-[10px] font-medium">
          <span className="text-white">{label}</span>
          <span className="text-muted-foreground font-mono">{value}</span>
       </div>
       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="h-full bg-primary"
          />
       </div>
    </div>
  )
}
