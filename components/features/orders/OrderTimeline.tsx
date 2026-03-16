'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Check, Circle } from 'lucide-react'

export interface TimelineEvent {
  label: string
  timestamp: string
  status: 'completed' | 'current' | 'upcoming'
}

interface OrderTimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function OrderTimeline({ events, className }: OrderTimelineProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Order Status Timeline</h3>
      <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-border/50">
        {events.map((event, index) => {
          const isCompleted = event.status === 'completed'
          const isCurrent = event.status === 'current'
          
          return (
            <div key={index} className="relative">
              <div 
                className={cn(
                  "absolute -left-[23px] top-1 h-5 w-5 rounded-full border-4 border-background flex items-center justify-center transition-colors duration-300",
                  isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-primary text-primary-foreground animate-pulse" : "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check size={10} strokeWidth={4} /> : <Circle size={6} fill="currentColor" />}
              </div>
              <div className="space-y-0.5">
                <p className={cn(
                  "text-xs font-bold leading-none",
                  isCompleted ? "text-foreground" : isCurrent ? "text-primary" : "text-muted-foreground"
                )}>
                  {event.label}
                </p>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {event.timestamp}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
