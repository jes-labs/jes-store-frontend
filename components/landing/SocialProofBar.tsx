'use client'

import { motion } from 'framer-motion'
import { brands } from '@/lib/constants/landing'
import { staggerContainer, fadeUp } from '@/lib/constants/animation'

export default function SocialProofBar() {
  return (
    <section className="relative w-full bg-[#0A0A0A] border-y border-white/5 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm font-body"
          >
            Trusted by <span className="text-primary font-bold">1,200+</span> store owners across Africa
          </motion.p>

          {/* Brands Marquee/Chips */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 lg:gap-4 overflow-x-auto no-scrollbar"
          >
            {brands.map((brand) => (
              <motion.div
                key={brand}
                variants={fadeUp}
                className="whitespace-nowrap px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-primary transition-all duration-300 cursor-default"
              >
                {brand}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
