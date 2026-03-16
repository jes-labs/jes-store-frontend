'use client'

import PublicPageHeader from '@/components/landing/PublicPageHeader'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/constants/animation'
import { Mail, MessageCircle, MapPin, Send, Globe, Zap, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none opacity-20" />

      <PublicPageHeader 
        eyebrow="Get in touch"
        title="We're here to <br/> support your growth."
        description="Whether you have a product question, need help with migration, or want to talk partnership — we're all ears."
      />

      <section className="py-24 bg-[#0A0A0A] relative z-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
               
               {/* Side Content: Contact Info & Support Narrative */}
               <motion.div
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={staggerContainer}
                 className="space-y-16"
               >
                  <div className="space-y-6">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                        Support Infrastructure
                     </div>
                     <h2 className="text-4xl font-heading font-bold text-white uppercase italic tracking-tighter">Direct Channels</h2>
                     <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-md">
                        We don't believe in support tickets that sit in a void. Our team of product engineers is available across the channels you already use.
                     </p>
                  </div>

                  <div className="space-y-6">
                     <ContactItem icon={Mail} title="Email Correspondence" value="hello@jesstore.io" link="mailto:hello@jesstore.io" />
                     <ContactItem icon={MessageCircle} title="WhatsApp Sync" value="+234 81 234 567 89" link="https://wa.me/2348123456789" />
                     <ContactItem icon={MapPin} title="West African HQ" value="Victoria Island, Lagos, Nigeria" />
                  </div>

                  {/* Global Availability Section */}
                  <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/5">
                     <LocationBadge city="Lagos" status="Active" />
                     <LocationBadge city="Accra" status="In Market" />
                     <LocationBadge city="Nairobi" status="Coming Q3" />
                  </div>
               </motion.div>

               {/* Form Container */}
               <motion.div
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeUp}
                 className="relative"
               >
                  <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-[3rem] opacity-50" />
                  <div className="relative glass-card p-8 lg:p-12 rounded-[2.5rem] border-white/10 shadow-2xl overflow-hidden group">
                     {/* Subtle Scanline Effect */}
                     <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                     
                     <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                           <div className="space-y-2 group/field">
                              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors group-focus-within/field:text-primary">Full Name</label>
                              <input type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/10" placeholder="Amara Okonkwo" />
                           </div>
                           <div className="space-y-2 group/field">
                              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors group-focus-within/field:text-primary">Email Address</label>
                              <input type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/10" placeholder="amara@fashion.com" />
                           </div>
                        </div>

                        <div className="space-y-2 group/field">
                           <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors group-focus-within/field:text-primary">Inquiry Type</label>
                           <div className="relative">
                              <select className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary/50 outline-none transition-all appearance-none cursor-pointer">
                                 <option>General Inquiry</option>
                                 <option>Technical Support</option>
                                 <option>Migration Help</option>
                                 <option>Partnership Proposal</option>
                                 <option>Investment</option>
                              </select>
                              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                                 <Globe className="w-4 h-4" />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-2 group/field">
                           <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors group-focus-within/field:text-primary">Your Message</label>
                           <textarea rows={5} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all resize-none placeholder:text-white/10" placeholder="How can we help your business thrive?" />
                        </div>

                        <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-black font-extrabold text-sm uppercase tracking-[0.2em] shadow-lg glow-green group overflow-hidden relative">
                           <span className="relative z-10 flex items-center gap-3">
                              Dispatch Message
                              <Send className="w-4 h-4 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                           </span>
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </Button>
                     </form>
                  </div>

                  {/* Trust Badge below form */}
                  <div className="mt-8 flex items-center justify-center gap-6 text-muted-foreground/40 font-body text-xs">
                     <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        End-to-end encrypted
                     </div>
                     <div className="w-1 h-1 rounded-full bg-white/10" />
                     <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Avg response: 114m
                     </div>
                  </div>
               </motion.div>

            </div>
         </div>
      </section>

      {/* Grid Background SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ 
         backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
         backgroundSize: '40px 40px'
      }} />
    </main>
  )
}

function ContactItem({ icon: Icon, title, value, link }: any) {
  const Component = link ? 'a' : 'div'
  
  return (
    <motion.div variants={fadeUp}>
       <Component 
         href={link} 
         className={cn(
            "flex gap-6 items-center p-4 rounded-3xl transition-all border border-transparent",
            link && "hover:bg-white/[0.03] hover:border-white/10 group/item cursor-pointer"
         )}
       >
          <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0 border border-primary/10 transition-all group-hover/item:glow-green group-hover/item:bg-primary/10">
             <Icon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
             <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{title}</div>
             <div className="text-xl font-heading font-bold text-white tracking-tight">{value}</div>
          </div>
       </Component>
    </motion.div>
  )
}

function LocationBadge({ city, status }: { city: string, status: string }) {
   return (
      <div className="space-y-1">
         <div className="text-xs font-bold text-white tracking-tight">{city}</div>
         <div className="flex items-center gap-1.5">
            <div className={cn("w-1.5 h-1.5 rounded-full", status === 'Active' ? 'bg-primary animate-pulse' : 'bg-white/20')} />
            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">{status}</div>
         </div>
      </div>
   )
}
