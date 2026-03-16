'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Circle, 
  Package, 
  Truck, 
  ShoppingBag, 
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DeliveryStatus } from '@/types/order'

interface TimelineStep {
  status: DeliveryStatus
  description: string
  timestamp: string
  location?: string
}

interface DeliveryTimelineProps {
  currentStatus: DeliveryStatus
  timeline: TimelineStep[]
}

const statusConfig: Record<DeliveryStatus, { icon: any; color: string; label: string }> = {
  pending: { icon: Clock, color: 'text-yellow-500', label: 'Order Placed' },
  processing: { icon: Package, color: 'text-blue-500', label: 'Processing' },
  dispatched: { icon: ShoppingBag, color: 'text-purple-500', label: 'Dispatched' },
  in_transit: { icon: Truck, color: 'text-primary', label: 'In Transit' },
  out_for_delivery: { icon: MapPin, color: 'text-orange-500', label: 'Out for Delivery' },
  delivered: { icon: CheckCircle2, color: 'text-green-500', label: 'Delivered' },
  failed: { icon: Circle, color: 'text-destructive', label: 'Delivery Failed' },
}

export function DeliveryTimeline({ currentStatus, timeline }: DeliveryTimelineProps) {
  // Sort timeline by timestamp descending
  const sortedTimeline = [...timeline].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div className="space-y-8 relative">
      {/* Decorative vertical line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/5 z-0" />

      {sortedTimeline.map((step, index) => {
        const config = statusConfig[step.status] || statusConfig.pending
        const Icon = config.icon
        const isLatest = index === 0
        const isCompleted = step.status === 'delivered'

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-6 z-10 group"
          >
            {/* Status Dot/Icon */}
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 shrink-0",
              isLatest 
                ? "bg-primary/20 border-primary shadow-[0_0_20px_rgba(var(--primary),0.3)]" 
                : "bg-white/[0.03] border-white/10 group-hover:border-white/20"
            )}>
              <Icon className={cn(
                "w-5 h-5",
                isLatest ? "text-primary" : "text-white/30"
              )} />
              
              {isLatest && !isCompleted && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              )}
            </div>

            {/* Content Card */}
            <div className={cn(
              "flex-1 p-5 rounded-2xl border transition-all duration-500",
              isLatest 
                ? "bg-white/[0.05] border-white/10 shadow-xl" 
                : "bg-transparent border-transparent"
            )}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className={cn(
                  "text-sm font-black uppercase tracking-widest",
                  isLatest ? "text-white" : "text-white/40"
                )}>
                  {config.label}
                </h4>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {new Date(step.timestamp).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </span>
              </div>
              
              <p className={cn(
                "text-sm font-medium leading-relaxed",
                isLatest ? "text-white/80" : "text-white/30 font-normal"
              )}>
                {step.description}
              </p>

              {step.location && (
                <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-primary/60 uppercase tracking-tighter">
                  <MapPin className="w-3 h-3" />
                  {step.location}
                </div>
              )}
            </div>
          </motion.div>
        )
      })}

      {/* Point-to-point flow summary (Optional visual flourish) */}
      <div className="pt-8 mt-8 border-t border-white/5">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white/20" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Store</span>
          </div>
          
          <div className="flex-1 flex items-center justify-center px-4 relative">
            <div className="w-full h-px bg-dashed-gradient opacity-20" />
            <motion.div 
              animate={{ x: [0, 50, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute"
            >
              <Truck className="w-4 h-4 text-primary" />
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
              currentStatus === 'delivered' ? "bg-primary/20 border border-primary/20" : "bg-white/[0.03] border border-white/10"
            )}>
              <MapPin className={cn("w-6 h-6", currentStatus === 'delivered' ? "text-primary" : "text-white/20")} />
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Dest</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-dashed-gradient {
          background-image: linear-gradient(to right, white 50%, transparent 50%);
          background-size: 8px 1px;
          background-repeat: repeat-x;
        }
      `}</style>
    </div>
  )
}
