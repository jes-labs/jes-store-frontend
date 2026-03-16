'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { features } from '@/lib/constants/landing'
import { staggerContainer, fadeUp, scaleIn } from '@/lib/constants/animation'
import { cn } from '@/lib/utils'

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden bg-[#050505]">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">✦ Everything you need</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6"
          >
            One platform. <span className="text-primary">Total control.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-body leading-relaxed"
          >
            From inventory to stablecoin payments — JesStore gives every African store owner world-class tools.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const IconComponent = (LucideIcons as any)[feature.icon]
            
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative glass-card rounded-2xl p-8 flex flex-col gap-6"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-lg",
                    feature.color === 'green' && "bg-primary/10 text-primary shadow-primary/10",
                    feature.color === 'blue' && "bg-secondary/10 text-secondary shadow-secondary/10",
                    feature.color === 'gold' && "bg-orange-500/10 text-orange-400 shadow-orange-500/10"
                  )}
                >
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                </motion.div>

                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">
                    {feature.description}
                  </p>
                </div>

                {/* Stat Badge */}
                <div className={cn(
                  "mt-auto self-start text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border",
                  feature.color === 'green' && "border-primary/20 bg-primary/5 text-primary",
                  feature.color === 'blue' && "border-secondary/20 bg-secondary/5 text-secondary",
                  feature.color === 'gold' && "border-orange-500/20 bg-orange-500/5 text-orange-400"
                )}>
                  {feature.stat}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
