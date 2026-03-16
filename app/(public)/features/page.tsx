'use client'

import PublicPageHeader from '@/components/landing/PublicPageHeader'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/constants/animation'
import { features } from '@/lib/constants/landing'
import * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FeaturesPage() {
  return (
    <main className="flex flex-col w-full">
      <PublicPageHeader 
        eyebrow="JesStore Capabilities"
        title="Everything you need <br/> to run your business."
        description="A comprehensive suite of on-chain commerce tools designed for the next generation of African entrepreneurs."
      />

      {/* Core Grid */}
      <section className="py-24 bg-[#0A0A0A]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
               {features.map((feature, i) => {
                  const IconComponent = (LucideIcons as any)[feature.icon]
                  return (
                    <motion.div
                      key={feature.title}
                      variants={fadeUp}
                      className="group flex flex-col gap-6 p-8 rounded-3xl glass-card border-white/5 hover:border-primary/20 transition-all duration-300"
                    >
                       <div className={cn(
                         "w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center shadow-lg",
                         feature.color === 'green' && "bg-primary/10 text-primary",
                         feature.color === 'blue' && "bg-secondary/10 text-secondary",
                         feature.color === 'gold' && "bg-orange-500/10 text-orange-400"
                       )}>
                          {IconComponent && <IconComponent className="w-6 h-6" />}
                       </div>
                       <div className="space-y-3">
                          <h3 className="text-xl font-heading font-bold text-white group-hover:text-primary transition-colors">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">{feature.description}</p>
                          <div className="flex items-center gap-4 pt-2">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/5 border border-primary/20">
                                {feature.stat}
                             </span>
                          </div>
                       </div>
                    </motion.div>
                  )
               })}
            </motion.div>
         </div>
      </section>

      {/* Deep Dive 1: Payments & Settlement */}
      <section className="py-32 bg-[#050505] border-t border-white/5 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest">
                     Financial Infrastructure
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-[1.1]">
                     On-Chain Settlement. <br/>
                     <span className="text-secondary">Zero Friction.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground font-body leading-relaxed">
                     Say goodbye to 3-day bank settlement delays. JesStore interacts directly with the blockchain, ensuring your funds are in your wallet the moment a customer pays.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <FeaturePoint 
                        title="Stablecoin Focus" 
                        desc="Accept USDC and USDT directly to reduce volatility risks." 
                     />
                     <FeaturePoint 
                        title="Gasless Intent" 
                        desc="We handle the complexity of gas fees so your customers don't have to." 
                     />
                     <FeaturePoint 
                        title="Multi-Chain" 
                        desc="Deploy on Polygon, Base, Celo, or Ethereum with a single click." 
                     />
                     <FeaturePoint 
                        title="0% Commission" 
                        desc="Your hard-earned money stays with you. We don't take a cut." 
                     />
                  </div>
               </div>

               <div className="relative">
                  <div className="absolute -inset-4 bg-secondary/20 blur-[100px] rounded-full opacity-20" />
                  <div className="relative glass-card aspect-square sm:aspect-video lg:aspect-square rounded-3xl border-white/10 overflow-hidden p-8 flex flex-col justify-between">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                              <LucideIcons.ShieldCheck className="w-5 h-5" />
                           </div>
                           <div>
                              <div className="text-xs font-bold text-white uppercase tracking-tight">Vault Protocol</div>
                              <div className="text-[10px] text-muted-foreground">Self-Custodial Architecture</div>
                           </div>
                        </div>
                        <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">0x82...E42a</div>
                     </div>

                     <div className="flex-1 flex flex-col items-center justify-center gap-6 py-10">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-full border-2 border-dashed border-secondary/30 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-black font-black">$</div>
                           </div>
                           <motion.div 
                              animate={{ x: [0, 40, 0] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              className="w-12 h-0.5 bg-gradient-to-r from-secondary to-transparent" 
                           />
                           <LucideIcons.Wallet className="w-10 h-10 text-white/20" />
                        </div>
                        <div className="text-center">
                           <div className="text-2xl font-bold text-white tracking-tight">$1,420.00 <span className="text-secondary">USDC</span></div>
                           <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mt-1">Direct Settlement Active</div>
                        </div>
                     </div>

                     <div className="h-20 w-full bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-around">
                        <div className="flex justify-between text-[10px] text-white/40 font-mono">
                           <span>NETWORK CONFIRMATION</span>
                           <span>99%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full w-[99%] bg-secondary rounded-full" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Deep Dive 2: POS & Inventory */}
      <section className="py-32 bg-[#0A0A0A] overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="order-2 lg:order-1 relative">
                  <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full opacity-20" />
                  <div className="relative glass-card aspect-square sm:aspect-video lg:aspect-[4/5] rounded-3xl border-white/10 overflow-hidden flex flex-col">
                     {/* POS Header Mockup */}
                     <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <LucideIcons.Scan className="w-5 h-5 text-primary" />
                           <span className="text-xs font-bold text-white uppercase italic">Active Session</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                     </div>
                     {/* Product List Mockup */}
                     <div className="flex-1 p-6 space-y-4">
                        <POSItem 
                           name="Leather Chelsea Boots" 
                           sku="SKU-293" 
                           price="120.00" 
                           stock={12} 
                        />
                        <POSItem 
                           name="Premium Denim Jacket" 
                           sku="SKU-104" 
                           price="85.00" 
                           stock={4} 
                           low
                        />
                        <POSItem 
                           name="Vintage Graphic Tee" 
                           sku="SKU-882" 
                           price="35.00" 
                           stock={42} 
                        />
                     </div>
                     {/* POS Actions Mockup */}
                     <div className="p-6 bg-primary/5 border-t border-primary/10">
                        <div className="flex justify-between mb-4">
                           <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Running Total</span>
                           <span className="text-xl font-bold text-white">$240.00</span>
                        </div>
                        <div className="w-full py-4 rounded-xl bg-primary text-black font-black text-center text-sm uppercase tracking-widest mb-2">Checkout Sale</div>
                        <div className="text-[9px] text-center text-primary/60 font-medium">Auto-synced with Blockchain Inventory</div>
                     </div>
                  </div>
               </div>

               <div className="order-1 lg:order-2 space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                     Business Operations
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-[1.1]">
                     Blazing Fast POS. <br/>
                     <span className="text-primary">Smarter Inventory.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground font-body leading-relaxed">
                     Hardware-grade speed in your browser. Record sales, track stock levels, and manage multiple outlets from a single unified mobile dashboard.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <FeaturePoint 
                        color="primary"
                        title="Offline-Sync" 
                        desc="Keep selling even when the internet drops. Sales sync as soon as you're back." 
                     />
                     <FeaturePoint 
                        color="primary"
                        title="Low Stock Alerts" 
                        desc="Get instant WhatsApp or Push notifications before you run out of bestsellers." 
                     />
                     <FeaturePoint 
                        color="primary"
                        title="Barcode Ready" 
                        desc="Use your mobile camera as a pro-grade scanner for lightning-fast checkouts." 
                     />
                     <FeaturePoint 
                        color="primary"
                        title="Draft Sales" 
                        desc="Customer changed their mind? Park a sale and return to it later effortlessly." 
                     />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Deep Dive 3: Analytics */}
      <section className="py-32 bg-[#050505] border-y border-white/5 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-widest">
                     Merchant Intelligence
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white leading-[1.1]">
                     Real-Time Data. <br/>
                     <span className="text-orange-400">Total Insights.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground font-body leading-relaxed">
                     Stop guessing. Know exactly which products are flying off the shelves and which days are your most profitable with a dashboard that never sleeps.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <FeaturePoint 
                        color="gold"
                        title="Profit Tracking" 
                        desc="Automatic margin calculation based on your cost of goods sold." 
                     />
                     <FeaturePoint 
                        color="gold"
                        title="Customer LTV" 
                        desc="Identify your most loyal customers and reward them personally." 
                     />
                     <FeaturePoint 
                        color="gold"
                        title="Global Benchmarks" 
                        desc="See how your store performs against similar merchants in your region." 
                     />
                     <FeaturePoint 
                        color="gold"
                        title="Tax Export" 
                        desc="One-click CSV exports for your year-end tax and accounting needs." 
                     />
                  </div>
               </div>

               <div className="relative">
                  <div className="absolute -inset-4 bg-orange-500/10 blur-[100px] rounded-full opacity-20" />
                  <div className="relative glass-card aspect-video lg:aspect-square rounded-3xl border-white/10 overflow-hidden flex flex-col p-8">
                     <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Revenue Velocity</h3>
                        <div className="flex gap-1">
                           <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                           <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        </div>
                     </div>
                     <div className="flex-1 flex items-end gap-3 pb-4">
                        {[20, 35, 10, 45, 60, 25, 80, 55, 90, 40, 70, 95].map((v, i) => (
                           <motion.div 
                              key={i}
                              initial={{ height: 0 }}
                              whileInView={{ height: `${v}%` }}
                              transition={{ delay: i * 0.05, duration: 1 }}
                              className="flex-1 bg-gradient-to-t from-orange-500/30 to-orange-400 rounded-t-lg"
                           />
                        ))}
                     </div>
                     <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                        <div className="space-y-1">
                           <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Daily Average</div>
                           <div className="text-xl font-bold text-white">$1,104.20</div>
                        </div>
                        <div className="space-y-1">
                           <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Growth Factor</div>
                           <div className="text-xl font-bold text-orange-400">+34.8%</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Receipts Section - Professional Polish */}
      <section className="py-24 bg-[#0A0A0A]">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl font-heading font-bold text-white italic">Branded Cryptographic Receipts</h2>
            <p className="text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
               Every sale generates a professional, blockchain-verified receipt that lives on IPFS. Share them instantly via WhatsApp with zero storage costs for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <ReceiptBadge icon={LucideIcons.Share2} label="WhatsApp Sharing" />
               <ReceiptBadge icon={LucideIcons.Link} label="On-Chain Linked" />
               <ReceiptBadge icon={LucideIcons.Zap} label="Instant Generation" />
               <ReceiptBadge icon={LucideIcons.Printer} label="Print Optimized" />
            </div>
         </div>
      </section>
    </main>
  )
}

function FeaturePoint({ title, desc, color = 'secondary' }: any) {
   return (
      <div className="space-y-2">
         <div className="flex items-center gap-2">
            <div className={cn(
               "w-1.5 h-1.5 rounded-full",
               color === 'primary' && "bg-primary shadow-[0_0_8px_rgba(34,197,94,0.5)]",
               color === 'secondary' && "bg-secondary shadow-[0_0_8px_rgba(56,189,248,0.5)]",
               color === 'gold' && "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]"
            )} />
            <h4 className="text-sm font-bold text-white uppercase italic tracking-tight">{title}</h4>
         </div>
         <p className="text-xs text-muted-foreground leading-relaxed pl-3.5">
            {desc}
         </p>
      </div>
   )
}

function POSItem({ name, sku, price, stock, low = false }: any) {
   return (
      <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-white/10 transition-colors">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
               <LucideIcons.Box className="w-5 h-5" />
            </div>
            <div>
               <div className="text-xs font-bold text-white tracking-tight">{name}</div>
               <div className="text-[10px] text-muted-foreground font-mono">{sku}</div>
            </div>
         </div>
         <div className="text-right">
            <div className="text-xs font-bold text-white">${price}</div>
            <div className={cn(
               "text-[9px] font-bold uppercase tracking-widest",
               low ? "text-orange-400" : "text-primary/60"
            )}>
               {stock} in stock
            </div>
         </div>
      </div>
   )
}

function ReceiptBadge({ icon: Icon, label }: any) {
   return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/70">
         <Icon className="w-4 h-4 text-primary" />
         {label}
      </div>
   )
}
