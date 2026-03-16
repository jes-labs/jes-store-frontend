'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  MapPin, 
  Box, 
  Search, 
  Navigation, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Receipt
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeliveryTimeline } from '@/components/features/orders/DeliveryTimeline'
import { scaleIn, fadeIn } from '@/lib/constants/animation'
import Link from 'next/link'
import { Order, DeliveryStatus } from '@/types/order'

export default function TrackOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = React.use(params)

  // Mock order data with delivery timeline
  const order: Order = {
    id: orderId,
    storeId: 'store-1',
    orderRef: orderId?.toUpperCase() || 'ORD-8271',
    customerName: 'Fatima Bello',
    items: [],
    subtotal: 16000,
    discount: 0,
    total: 16000,
    paymentMethod: 'crypto',
    paymentStatus: 'completed',
    status: 'completed',
    deliveryStatus: 'in_transit',
    trackingNumber: 'JKX-9920-BWL',
    deliveryTimeline: [
      {
        status: 'pending',
        description: 'Order placed successfully.',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        location: 'Lagos, Nigeria'
      },
      {
        status: 'processing',
        description: 'Order confirmed and being prepared at the warehouse.',
        timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
        location: 'Victoria Island Warehouse'
      },
      {
        status: 'dispatched',
        description: 'Order has been dispatched and is on its way to the distribution center.',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        location: 'Lagos Logistics Hub'
      },
      {
        status: 'in_transit',
        description: 'Package is currently in transit between sorting facilities.',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        location: 'Ikeja Distribution Center'
      }
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString()
  }

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center p-4 py-32 relative overflow-hidden">
      {/* Dynamic Background decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="w-full max-w-4xl space-y-8 relative z-10">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-white/5 text-white/40 hover:text-white">
             <Link href={`/receipts/${orderId}`}><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">Order Tracker</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{order.orderRef}</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-xs font-medium text-white/40">{order.customerName}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Tracking Content */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 space-y-6"
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-right from-primary/20 via-primary to-primary/20" />
               
               <div className="flex flex-col gap-10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                       <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="text-sm font-black text-white uppercase tracking-widest">Movement Log</span>
                       </div>
                       <p className="text-xs text-muted-foreground">Detailed trace of your goods from origin to destination.</p>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Status</span>
                       <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase">
                          {order.deliveryStatus.replace('_', ' ')}
                       </div>
                    </div>
                  </div>

                  <DeliveryTimeline 
                    currentStatus={order.deliveryStatus} 
                    timeline={order.deliveryTimeline} 
                  />
               </div>
            </div>
          </motion.div>

          {/* Sidebar / Quick Actions */}
          <motion.aside 
             variants={scaleIn}
             initial="hidden"
             animate="visible"
             className="lg:col-span-4 space-y-6"
          >
             {/* Shipping Details */}
             <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 space-y-6">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                         <Navigation className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-white">Shipping Info</h3>
                   </div>
                   
                   <div className="space-y-4 pt-2">
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none">Tracking ID</p>
                         <p className="text-sm font-mono text-white/80">{order.trackingNumber}</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none">Destination</p>
                         <p className="text-sm font-medium text-white/80 leading-relaxed">
                            No. 42 Crescent Way, Victoria Island, Lagos
                         </p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none">Weight/Size</p>
                         <p className="text-xs font-medium text-white/60">Standard Package (~1.2kg)</p>
                      </div>
                   </div>
                </div>

                <Button variant="outline" className="w-full rounded-2xl h-12 border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-white gap-2">
                   <ExternalLink className="w-3.5 h-3.5" /> Courier Website
                </Button>
             </div>

             {/* Support / Verification */}
             <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-6 space-y-4">
                <div className="flex items-center gap-3">
                   <ShieldCheck className="w-5 h-5 text-primary" />
                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">JesSecure Delivery</span>
                </div>
                <p className="text-[11px] leading-relaxed text-primary/70 font-medium italic lowercase">
                  Your delivery is insured and protected by the JesStore settlement layer.
                </p>
                <Button size="sm" asChild className="w-full bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                   <Link href={`/receipts/${orderId}`} className="flex items-center justify-center gap-2">
                      <Receipt className="w-3.5 h-3.5" /> View Receipt
                   </Link>
                </Button>
             </div>
          </motion.aside>
        </div>

        {/* Brand Footer */}
        <div className="pt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-white/10" />
            <div className="w-2 h-2 rounded-full border border-white/20" />
            <span className="w-8 h-[1px] bg-white/10" />
          </div>
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/10">Decentralized Logistics Verification</p>
        </div>
      </div>
    </main>
  )
}
