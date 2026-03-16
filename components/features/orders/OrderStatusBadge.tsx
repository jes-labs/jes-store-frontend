'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface OrderStatusBadgeProps {
  status: 'paid' | 'pending' | 'cancelled' | 'completed' | string
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-none hover:bg-green-500/20'
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-none hover:bg-amber-500/20'
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-none hover:bg-destructive/20'
      default:
        return 'bg-muted text-muted-foreground border-none'
    }
  }

  return (
    <Badge className={cn("text-[10px] font-bold uppercase tracking-wider h-5", getStatusStyle(status))}>
      {status}
    </Badge>
  )
}
