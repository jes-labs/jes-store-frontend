'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils/currency'
import { ArrowLeft, Mail, Phone, Copy, ShoppingBag, TrendingUp, Calendar, Edit2, MessageSquare, ShieldCheck, Wallet } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { OrderTable } from '@/components/features/orders/OrderTable'

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  // Mock customer data for premium CRM view
  const customer = {
    id: id,
    name: 'Oluwaseun Adeyemi',
    email: 'seun.ade@jes-store.tech',
    phone: '+234 812 345 6789',
    totalOrders: 14,
    totalSpent: 4250.0,
    avgOrderValue: 303.57,
    joinDate: new Date('2025-06-12'),
    wallet: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    tags: ['VIP', 'Wholesale'],
    avatar: null,
  }

  const orders: any[] = [
    {
      id: '1',
      orderRef: 'ORD-20260315-99A',
      customerName: 'Oluwaseun Adeyemi',
      date: new Date().toISOString(),
      items: 3,
      total: 1039.0,
      paymentMethod: 'crypto',
      status: 'completed' as const,
    },
    {
      id: '2',
      orderRef: 'ORD-20260310-44B',
      customerName: 'Oluwaseun Adeyemi',
      date: new Date(Date.now() - 5 * 86400000).toISOString(),
      items: 1,
      total: 550.0,
      paymentMethod: 'crypto',
      status: 'completed' as const,
    },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/customers">
          <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 border border-border/50 bg-card hover:bg-muted">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-display">Customer Profile</h1>
          <p className="text-sm text-muted-foreground pt-0.5">Managing relations with {customer.name}</p>
        </div>
        <Button variant="outline" className="rounded-xl gap-2 font-bold hidden sm:flex">
          <Edit2 size={16} />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card className="border-border/50 bg-card overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <Avatar className="h-24 w-24 rounded-3xl border-4 border-muted/50 shadow-xl">
                  <AvatarFallback className="bg-primary/20 text-primary text-3xl font-bold font-display">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                      <h2 className="text-3xl font-bold font-display">{customer.name}</h2>
                      {customer.tags.map(tag => (
                        <Badge key={tag} className="bg-primary/10 text-primary border-primary/20 rounded-lg text-[10px] uppercase font-bold tracking-widest">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Mail size={14} /> {customer.email}</span>
                      <span className="flex items-center gap-1.5"><Phone size={14} /> {customer.phone}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> Since {customer.joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2 p-3 rounded-2xl bg-muted/20 border border-border/30 max-w-sm">
                    <Wallet size={16} className="text-muted-foreground" />
                    <code className="text-[11px] font-mono flex-1 truncate">{customer.wallet}</code>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Copy size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/50 bg-card p-6 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <ShoppingBag size={20} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Orders</p>
              <p className="text-2xl font-bold font-display">{customer.totalOrders}</p>
            </Card>
            <Card className="border-border/50 bg-card p-6 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-3">
                <TrendingUp size={20} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Spent</p>
              <p className="text-2xl font-bold font-display tabular-nums underline decoration-2 decoration-green-500/30 underline-offset-4">
                {formatCurrency(customer.totalSpent, 'USDT')}
              </p>
            </Card>
            <Card className="border-border/50 bg-card p-6 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
                <ShieldCheck size={20} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Avg. Order Value</p>
              <p className="text-2xl font-bold font-display tabular-nums">
                {formatCurrency(customer.avgOrderValue, 'USDT')}
              </p>
            </Card>
          </div>

          <Card className="border-border/50 bg-card">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/5 py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <ShoppingBag size={16} />
                Order History
              </CardTitle>
              <Button variant="link" className="text-xs font-bold" asChild>
                <Link href="/dashboard/orders">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <OrderTable orders={orders} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-border/50 bg-card p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">Quick Actions</h3>
            <Button className="w-full rounded-2xl font-bold py-6 gap-3" asChild>
              <Link href="/dashboard/pos">
                <ShoppingBag size={18} />
                Record New Sale
              </Link>
            </Button>
            <Button variant="outline" className="w-full rounded-2xl font-bold py-6 gap-3">
              <Mail size={18} />
              Email Customer
            </Button>
          </Card>

          {/* Internal Notes */}
          <Card className="border-border/50 bg-card flex flex-col h-full overflow-hidden">
            <div className="p-6 pb-2">
              <div className="flex items-center gap-2 text-primary mb-1">
                <MessageSquare size={16} />
                <h3 className="text-sm font-bold uppercase tracking-widest">Internal Notes</h3>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-4">Visible only to you and your staff</p>
            </div>
            <div className="px-6 flex-1">
              <Textarea
                placeholder="Add a private note about this customer..."
                className="min-h-[200px] bg-muted/10 border-border/50 focus:bg-background transition-all rounded-2xl resize-none text-sm p-4"
              />
            </div>
            <div className="p-6 pt-4 mt-auto border-t border-border/50 bg-muted/5">
              <Button size="sm" className="w-full rounded-xl font-bold uppercase tracking-wider text-[10px]">
                Save Note
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
