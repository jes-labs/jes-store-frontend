'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OrderTimeline } from '@/components/features/orders/OrderTimeline'
import { formatCurrency } from '@/lib/utils/currency'
import { formatDate } from '@/lib/utils/date'
import { ArrowLeft, Printer, ExternalLink, Copy, CheckCircle2, ShoppingBag, ShieldCheck } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { OrderStatusBadge } from '@/components/features/orders/OrderStatusBadge'

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  // Mock data for high-fidelity UI
  const order = {
    id: id,
    reference: 'ORD-20260315-99A',
    date: new Date().toISOString(),
    status: 'completed' as const,
    customer: {
      name: 'Oluwaseun Adeyemi',
      email: 'seun.ade@jes-store.tech',
      phone: '+234 812 345 6789',
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
    },
    items: [
      { id: '1', name: 'iPhone 13 Pro', qty: 1, price: 999.0, sku: 'IP13P-GR' },
      { id: '2', name: 'Leather Wallet', qty: 2, price: 45.0, sku: 'WALL-LTH' },
    ],
    subtotal: 1089.0,
    discount: 50.0,
    total: 1039.0,
    paymentMethod: 'crypto',
    chain: 'Polygon',
    txHash: '0x8d2f19...8e92',
    fullTxHash: '0x8d2f19a0b1234bc56789def0123456789abcdef0123456789abcdef0123456789',
    verified: true,
  }

  const timelineEvents = [
    { label: 'Order Created', timestamp: 'Mar 15, 2026, 09:41 PM', status: 'completed' as const },
    { label: 'Payment Pending', timestamp: 'Mar 15, 2026, 09:42 PM', status: 'completed' as const },
    { label: 'Payment Verified', timestamp: 'Mar 15, 2026, 09:44 PM', status: 'completed' as const },
    { label: 'Order Completed', timestamp: 'Mar 15, 2026, 09:45 PM', status: 'completed' as const },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/orders">
          <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 border border-border/50 bg-card hover:bg-muted">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-display">{order.reference}</h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-sm text-muted-foreground pt-0.5">Placed on {formatDate(order.date)}</p>
        </div>
        <Button variant="outline" className="rounded-xl gap-2 font-bold hidden sm:flex">
          <Printer size={16} />
          Print Receipt
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary Card */}
          <Card className="border-border/50 bg-card overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-primary" />
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Order Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/10">
                      <th className="text-left py-3 px-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Product</th>
                      <th className="text-center py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">SKU</th>
                      <th className="text-center py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Qty</th>
                      <th className="text-right py-3 px-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {order.items.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/5 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-bold text-sm">{item.name}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <code className="text-[10px] bg-muted/50 px-2 py-0.5 rounded-md font-mono">{item.sku}</code>
                        </td>
                        <td className="py-4 px-4 text-center text-sm font-medium">{item.qty}</td>
                        <td className="py-4 px-6 text-right font-mono font-bold text-sm">
                          {formatCurrency(item.price * item.qty, 'USDT')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-muted/10 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono tabular-nums">{formatCurrency(order.subtotal, 'USDT')}</span>
                </div>
                <div className="flex justify-between text-sm text-amber-500 font-bold">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-{formatCurrency(order.discount, 'USDT')}</span>
                </div>
                <Separator className="bg-border/50" />
                <div className="flex justify-between items-center pt-1">
                  <span className="font-bold">Total Amount</span>
                  <span className="text-2xl font-bold text-primary tabular-nums font-display">
                    {formatCurrency(order.total, 'USDT')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card className="border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Contact Name</p>
                  <p className="font-display font-bold text-lg">{order.customer.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</p>
                  <p className="font-medium">{order.customer.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{order.customer.phone}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Customer Wallet</p>
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-muted/20 border border-border/30">
                    <code className="text-[11px] font-mono flex-1 truncate">{order.customer.address}</code>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                      <Copy size={12} />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full rounded-xl gap-2 text-xs font-bold" asChild>
                  <Link href={`/dashboard/customers/${id}`}>
                    View Full Customer Profile
                    <ExternalLink size={12} />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Status Timeline */}
          <Card className="border-border/50 bg-card p-6">
            <OrderTimeline events={timelineEvents} />
          </Card>

          {/* Payment Details */}
          <Card className="border-border/50 bg-card overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Payment Proof</CardTitle>
                {order.verified && (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 gap-1 rounded-lg">
                    <ShieldCheck size={10} />
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/20 border border-border/30">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Method</p>
                  <p className="text-xs font-bold truncate">USDT on {order.chain}</p>
                </div>
              </div>

              <div className="space-y-1.5 px-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <code className="text-[11px] font-mono flex-1 bg-muted/30 p-2 rounded-lg truncate">{order.fullTxHash}</code>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg shrink-0">
                    <ExternalLink size={14} />
                  </Button>
                </div>
              </div>

              <Button variant="secondary" className="w-full rounded-xl font-bold h-11 text-xs uppercase tracking-wider">
                View on Scan Explorer
              </Button>
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card className="border-border/50 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Order Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                No notes have been added to this order. Notes are internal and only visible to you.
              </p>
              <Button variant="link" className="p-0 h-auto text-[10px] font-bold uppercase tracking-widest mt-2">
                Add Note
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
