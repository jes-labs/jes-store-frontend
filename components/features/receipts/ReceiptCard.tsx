'use client'

import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Printer, Share2, Eye, Receipt as ReceiptIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils/currency'
import { format } from 'date-fns'

export interface Receipt {
  id: string
  receiptNo: string
  customerName: string
  date: string
  amount: number
  paymentMethod: string
  chain?: string
}

interface ReceiptCardProps {
  receipt: Receipt
  onView?: (id: string) => void
}

export function ReceiptCard({ receipt, onView }: ReceiptCardProps) {
  return (
    <Card className="border-border/50 bg-card hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <ReceiptIcon className="w-4 h-4" />
            </div>
            <span className="font-mono text-[11px] font-bold text-green-500 tracking-tight">
              {receipt.receiptNo}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            {receipt.paymentMethod}
          </span>
        </div>

        <div className="space-y-1">
          <h4 className="font-bold text-sm truncate">{receipt.customerName}</h4>
          <p className="text-[11px] text-muted-foreground font-medium">
            {format(new Date(receipt.date), 'MMM d, yyyy · h:mm a')}
          </p>
        </div>

        <div className="pt-2 border-t border-dashed border-border/50">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Total</span>
            <span className="text-xl font-bold font-display tracking-tight text-foreground">
              {formatCurrency(receipt.amount, 'USDT')}
            </span>
          </div>
          {receipt.chain && (
            <p className="text-[9px] text-muted-foreground uppercase font-bold text-right tracking-tight mt-1">
              via {receipt.chain}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0 grid grid-cols-3 gap-1">
        <Button variant="ghost" size="sm" className="h-8 p-0 rounded-lg" onClick={() => onView?.(receipt.id)}>
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 p-0 rounded-lg">
          <Printer className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 p-0 rounded-lg">
          <Share2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
