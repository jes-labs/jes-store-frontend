'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Printer, Share2, PlusCircle, ExternalLink } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/date'
import { Separator } from '@/components/ui/separator'

interface ReceiptModalProps {
  isOpen: boolean
  onClose: () => void
  order: {
    id: string
    reference: string
    customerName?: string
    total: number
    paymentMethod: string
    date: string
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
    txHash?: string
  }
}

export function ReceiptModal({ isOpen, onClose, order }: ReceiptModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border/50 rounded-3xl p-0 overflow-hidden">
        <div className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center animate-in zoom-in duration-500">
              <CheckCircle2 size={48} strokeWidth={2.5} />
            </div>
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-bold font-display">Sale Complete! 🎉</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Your transaction has been processed successfully.
            </DialogDescription>
          </div>
        </div>

        <div className="mx-6 p-6 rounded-2xl bg-muted/30 border border-border/50 relative overflow-hidden">
          {/* Decorative receipt edges */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[radial-gradient(circle,hsl(var(--border))_1px,transparent_1px)] bg-[length:8px_8px]" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[radial-gradient(circle,hsl(var(--border))_1px,transparent_1px)] bg-[length:8px_8px]" />
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Receipt No.</p>
                <p className="font-mono text-sm font-bold text-primary">{order.reference}</p>
              </div>
              <div className="text-right space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date</p>
                <p className="text-xs font-medium">{formatDate(order.date)}</p>
              </div>
            </div>

            <Separator className="bg-border/50 border-dashed" />

            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Customer</p>
              <p className="text-sm font-bold">{order.customerName || 'Walk-in Customer'}</p>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Items</p>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x <span className="text-foreground font-medium">{item.name}</span>
                    </span>
                    <span className="font-mono tabular-nums">{formatCurrency(item.price * item.quantity, 'USDT')}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-border/50 border-dashed" />

            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between text-sm font-bold pt-1">
                <span>Total Amount</span>
                <span className="text-primary text-lg">{formatCurrency(order.total, 'USDT')}</span>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
                <span>Paid via</span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>

            {order.txHash && (
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full h-8 text-[10px] font-mono gap-1.5 rounded-xl border-dashed">
                  <ExternalLink size={10} />
                  View Transaction Hash
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-3">
          <Button variant="outline" className="rounded-2xl gap-2 font-bold h-12">
            <Printer size={18} />
            Print
          </Button>
          <Button variant="outline" className="rounded-2xl gap-2 font-bold h-12 text-green-500 hover:text-green-600 hover:bg-green-500/10 border-green-500/20">
            <Share2 size={18} />
            WhatsApp
          </Button>
          <Button className="col-span-2 rounded-2xl gap-2 font-bold h-12 shadow-lg shadow-primary/20" onClick={onClose}>
            <PlusCircle size={18} />
            New Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
