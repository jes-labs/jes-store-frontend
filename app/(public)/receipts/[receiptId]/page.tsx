'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, ExternalLink, Printer, Share2, ShieldCheck, Zap, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { scaleIn } from '@/lib/constants/animation'
import { cn } from '@/lib/utils'
import { useReceipt } from '@/hooks/useReceipts'

/**
 * ReceiptPage
 * Public shareable receipt visualization for on-chain transactions
 */
export default function ReceiptPage({ params }: { params: Promise<{ receiptId: string }> }) {
  const { receiptId } = React.use(params)
  const { data: receiptData, isLoading, error } = useReceipt(receiptId)

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-white/40 text-sm uppercase tracking-widest animate-pulse">Loading receipt…</div>
      </main>
    )
  }

  if (error || !receiptData) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-white/10 mx-auto" />
          <p className="text-white/40 text-sm uppercase tracking-widest">Receipt not found or expired.</p>
        </div>
      </main>
    )
  }

  const receipt = {
    id: receiptData.receipt_number ?? receiptData.receiptNumber ?? receiptId,
    date: new Date(receiptData.issued_at ?? receiptData.createdAt ?? Date.now()).toLocaleString('en-GB', {
      dateStyle: 'long',
      timeStyle: 'short',
    }),
    storeName: receiptData.store?.name ?? receiptData.storeName ?? '—',
    storeAddress: receiptData.store?.address ?? '',
    customer: receiptData.customer_name ?? receiptData.customerName ?? 'Customer',
    items: (receiptData.items ?? []).map((item: any) => ({
      name: item.product_name ?? item.name ?? '',
      qty: item.quantity ?? item.qty ?? 1,
      price: typeof item.unit_price === 'string' ? parseFloat(item.unit_price) : (item.unit_price ?? item.price ?? 0),
    })),
    subtotal: typeof receiptData.total_amount === 'string' ? parseFloat(receiptData.total_amount) : (receiptData.total_amount ?? receiptData.total ?? 0),
    total: typeof receiptData.total_amount === 'string' ? parseFloat(receiptData.total_amount) : (receiptData.total_amount ?? receiptData.total ?? 0),
    fee: 0,
    network: 'Polygon POS',
    txHash: receiptData.transaction_hash ?? receiptData.txHash ?? '',
    status: receiptData.status ?? 'Confirmed',
  }

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 py-32">
       {/* High-Fidelity Receipt Card */}
       <motion.div
         variants={scaleIn}
         initial="hidden"
         animate="visible"
         className="w-full max-w-xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative"
       >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary glow-green" />

          <div className="p-8 lg:p-12 space-y-10">
             {/* Brand Header */}
             <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20 shadow-lg mb-2">
                   <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-1">
                   <h1 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">On-Chain Receipt</h1>
                   <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{receipt.id}</p>
                </div>
             </div>

             {/* Store Info Cluster */}
             <div className="grid grid-cols-2 gap-8 text-[10px] uppercase tracking-widest font-bold border-y border-white/5 py-6">
                <div className="space-y-2">
                   <p className="text-muted-foreground/60">Merchant</p>
                   <p className="text-white">{receipt.storeName}</p>
                   {receipt.storeAddress && (
                     <p className="text-muted-foreground/40 font-medium normal-case">{receipt.storeAddress}</p>
                   )}
                </div>
                <div className="text-right space-y-2">
                   <p className="text-muted-foreground/60">Transaction Date</p>
                   <p className="text-white">{receipt.date}</p>
                </div>
             </div>

             {/* Line Items */}
             <div className="space-y-6">
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                   <span>Item description</span>
                   <div className="flex gap-12">
                      <span>qty</span>
                      <span>total</span>
                   </div>
                </div>
                <div className="space-y-4">
                   {receipt.items.map((item, i) => (
                     <div key={i} className="flex justify-between items-center group">
                        <span className="text-sm font-body text-white">{item.name}</span>
                        <div className="flex gap-12 text-sm font-mono">
                           <span className="text-muted-foreground w-4 text-center">{item.qty}</span>
                           <span className="text-white w-16 text-right">${item.price.toFixed(2)}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Totals */}
             <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between text-xs">
                   <span className="text-muted-foreground">Subtotal</span>
                   <span className="text-white font-mono">${receipt.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                   <span className="text-muted-foreground">JesStore Platform Fee</span>
                   <span className="text-primary font-bold">0.00 (0.0%)</span>
                </div>
                <div className="flex justify-between text-xl font-heading font-bold pt-4 border-t border-white/5 border-dashed">
                   <span className="text-white">Amount Paid</span>
                   <div className="flex flex-col items-end">
                      <span className="text-primary">${receipt.total.toFixed(2)}</span>
                      <span className="text-[10px] text-muted-foreground font-body uppercase tracking-[0.2em]">Settled via USDC</span>
                   </div>
                </div>
             </div>

             {/* On-Chain Verification Block */}
             {receipt.txHash && (
               <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Network Verification</span>
                     </div>
                     <div className="flex items-center gap-1.5 text-primary animate-pulse">
                        <Check className="w-3 h-3" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">{receipt.status}</span>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg">
                        <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">TX Hash</div>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-mono text-white/60 truncate max-w-[140px]">{receipt.txHash}</span>
                           <button
                             className="text-muted-foreground hover:text-white transition-colors"
                             title="Copy Hash"
                             onClick={() => navigator.clipboard.writeText(receipt.txHash)}
                           >
                             <Copy className="w-3 h-3" />
                           </button>
                        </div>
                     </div>
                     <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground uppercase font-bold tracking-widest">Settlement Layer</span>
                        <span className="text-white font-bold">{receipt.network}</span>
                     </div>
                  </div>
               </div>
             )}
          </div>

          <div className="px-8 pb-8 lg:px-12 lg:pb-12 flex flex-col gap-4">
             <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button
                  variant="outline"
                  onClick={() => window.print()}
                  className="flex-1 w-full rounded-2xl h-12 border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-widest text-white gap-2"
                >
                   <Printer className="w-4 h-4" /> Print Receipt
                </Button>
                <Button
                  onClick={() => navigator.share?.({ url: window.location.href, title: `Receipt ${receipt.id}` })}
                  className="flex-1 w-full rounded-2xl h-12 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest gap-2 border border-white/10"
                >
                   <Share2 className="w-4 h-4" /> Share link
                </Button>
             </div>

             <Button asChild className="w-full rounded-2xl h-14 bg-primary hover:bg-primary/90 text-black font-black text-sm uppercase tracking-[0.2em] gap-3 glow-green group">
                <Link href={`/track/${receiptId}`}>
                   <Truck className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   Track Delivery Flow
                </Link>
             </Button>
          </div>

          {/* Holographic Watermark Decor */}
          <div className="absolute bottom-4 right-8 opacity-5 text-[8rem] font-heading font-black pointer-events-none select-none -z-10 -rotate-12 translate-x-12 translate-y-12">
             JES
          </div>
       </motion.div>

       {/* Subtext */}
       <p className="mt-8 text-[10px] text-muted-foreground font-body max-w-sm text-center uppercase tracking-widest leading-loose">
          This receipt is cryptographically verified. No entity can modify its record once confirmed on the blockchain.
       </p>
    </main>
  )
}
