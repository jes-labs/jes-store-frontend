'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, LayoutDashboard, ShoppingCart, Package, 
  Receipt, Users, Settings, User, Bell, Plus 
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

/**
 * DemoSection
 * Interactive dashboard mockup with animated metrics and charts
 */
export default function DemoSection() {
  const [showToast, setShowToast] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setShowToast(true), 1500)
    const hideTimer = setTimeout(() => setShowToast(false), 4500)
    return () => { clearTimeout(timer); clearTimeout(hideTimer); }
  }, [])

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] border-y border-white/5 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
            Your entire business. <span className="text-primary">One dashboard.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            Watch how JesStore brings inventory, sales, and on-chain payments together in a single, blazing-fast interface.
          </p>
        </div>

        {/* Dashboard Mockup Container */}
        <div className="relative max-w-5xl mx-auto">
           {/* Toast Notification */}
           <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="absolute top-24 right-4 lg:right-8 z-50 glass-card rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl border-primary/20"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="text-xs font-body text-white">
                  <span className="font-bold">New order!</span> $125.00 · Amara's Fashion
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Outer Chrome */}
          <div className="relative rounded-2xl border border-white/10 bg-[#050505] shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10] lg:aspect-video flex flex-col">
            {/* Browser Header */}
            <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-4 justify-between">
               <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
               </div>
               <div className="bg-white/5 px-4 py-1 rounded-md text-[10px] text-muted-foreground font-mono">
                  app.jesstore.io/dashboard
               </div>
               <div className="flex items-center gap-3">
                  <Bell className="w-3.5 h-3.5 text-muted-foreground" />
                  <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40" />
               </div>
            </div>

            {/* Layout */}
            <div className="flex flex-1 overflow-hidden">
               {/* Sidebar (Desktop) */}
               <div className="w-48 border-r border-white/5 bg-white/[0.01] hidden lg:flex flex-col p-4 gap-8">
                  <div className="flex items-center gap-2 px-2">
                    <div className="w-6 h-6 rounded bg-primary" />
                    <span className="text-xs font-heading font-bold text-white">JesStore</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-1">
                       <p className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-bold mb-2 px-2">Main</p>
                       <SidebarItem icon={LayoutDashboard} label="Overview" active />
                       <SidebarItem icon={BarChart3} label="Analytics" />
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-bold mb-2 px-2">Store</p>
                       <SidebarItem icon={Plus} label="Record Sale" />
                       <SidebarItem icon={Package} label="Products" />
                       <SidebarItem icon={ShoppingCart} label="Orders" />
                       <SidebarItem icon={Users} label="Customers" />
                       <SidebarItem icon={Receipt} label="Receipts" />
                    </div>
                  </div>
               </div>

               {/* Main Content */}
               <div className="flex-1 overflow-y-auto bg-background p-4 lg:p-8">
                  <header className="flex items-center justify-between mb-8">
                    <div>
                       <h3 className="text-sm lg:text-base font-heading font-bold text-white">Good morning, Amara 👋</h3>
                       <p className="text-[10px] text-muted-foreground">March 15, 2026</p>
                    </div>
                    <button className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-2">
                       <Plus className="w-3 h-3" /> Record Sale
                    </button>
                  </header>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 lg:gap-6 mb-8">
                     <MetricCard label="Revenue" value="$28,470" trend="+12%" />
                     <MetricCard label="Orders" value="143" trend="+8%" />
                     <MetricCard label="Customers" value="87" trend="+5%" />
                  </div>

                  {/* Chart and Table Area */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     <div className="glass-card rounded-xl p-4 min-h-[160px] flex flex-col">
                        <p className="text-[10px] font-bold text-muted-foreground/60 mb-4 uppercase">Revenue Growth</p>
                        <div className="flex-1 relative flex items-end gap-1 px-2">
                           {[40, 60, 45, 78, 55, 90, 85].map((h, i) => (
                             <motion.div
                               key={i}
                               initial={{ height: 0 }}
                               whileInView={{ height: `${h}%` }}
                               transition={{ delay: i * 0.1, duration: 1 }}
                               className="flex-1 bg-primary/20 border-x border-primary/30 rounded-t-sm"
                             />
                           ))}
                        </div>
                     </div>
                     <div className="glass-card rounded-xl p-4 min-h-[160px]">
                        <p className="text-[10px] font-bold text-muted-foreground/60 mb-4 uppercase">Recent Orders</p>
                        <div className="space-y-3">
                           {[
                             { id: '001', name: 'Fatima B', total: '160 USDT', status: 'Paid' },
                             { id: '002', name: 'Kwame A', total: '45 USDT', status: 'Paid' },
                             { id: '003', name: 'Ngozi E', total: '89 USDT', status: 'Pending' },
                           ].map((order, i) => (
                             <motion.div
                               key={order.id}
                               initial={{ opacity: 0, x: 10 }}
                               whileInView={{ opacity: 1, x: 0 }}
                               transition={{ delay: 0.8 + (i * 0.1) }}
                               className="flex items-center justify-between text-[10px] border-b border-white/5 pb-2 last:border-0"
                             >
                               <span className="text-white font-mono">#{order.id}</span>
                               <span className="text-muted-foreground">{order.name}</span>
                               <span className="text-white font-bold">{order.total}</span>
                               <span className={cn(
                                 "px-2 py-0.5 rounded-full text-[8px] font-bold",
                                 order.status === 'Paid' ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"
                               )}>
                                 {order.status}
                               </span>
                             </motion.div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Ambient Glow behind mockup */}
          <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-3xl opacity-30 -z-10" />
        </div>
      </div>
    </section>
  )
}

function SidebarItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg text-[10px] font-medium transition-colors cursor-pointer",
      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-white"
    )}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  )
}

function MetricCard({ label, value, trend }: { label: string, value: string, trend: string }) {
  return (
    <div className="glass-card rounded-xl p-3 lg:p-4">
       <p className="text-[9px] uppercase tracking-wide text-muted-foreground/60 font-bold mb-1">{label}</p>
       <div className="flex items-baseline justify-between flex-wrap gap-1">
          <span className="text-xs lg:text-lg font-heading font-bold text-white">{value}</span>
          <span className="text-[8px] font-bold text-primary">{trend}</span>
       </div>
    </div>
  )
}
