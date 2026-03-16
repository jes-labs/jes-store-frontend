'use client'

import React from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  BarChart3,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils/currency'
import Link from 'next/link'
import { RevenueChart } from '@/components/features/analytics/RevenueChart'

const stats = [
  {
    label: 'Total Revenue',
    value: 2450000,
    change: '+12.4%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    label: 'Orders Today',
    value: 143,
    change: '+8',
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    label: 'Products in Stock',
    value: 284,
    change: '12 low stock',
    trend: 'down',
    icon: Package,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    label: 'Total Customers',
    value: 87,
    change: '+5 this week',
    trend: 'up',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  }
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader 
        title="Good morning, Jes 👋"
        description="Here's what's happening with your store today."
        action={
          <div className="flex flex-wrap gap-2">
            <Link href="/dashboard/products/new">
              <Button variant="outline" size="sm" className="rounded-full">
                <Plus className="w-4 h-4 mr-2" /> Add Product
              </Button>
            </Link>
            <Link href="/dashboard/pos">
              <Button size="sm" className="rounded-full">
                <Plus className="w-4 h-4 mr-2" /> Record Sale
              </Button>
            </Link>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={stat.label} className="border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
              <CardTitle className="text-[10px] font-bold">{stat.label}</CardTitle>
              <div className={cn("p-2 rounded-xl", stat.bgColor)}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display tabular-nums">
                {typeof stat.value === 'number' && stat.label.includes('Revenue') 
                  ? formatCurrency(stat.value, 'USDT') 
                  : stat.value}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-destructive" />
                )}
                <span className={cn(
                  "text-xs font-medium",
                  stat.trend === 'up' ? "text-green-500" : "text-destructive"
                )}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground font-normal ml-0.5">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Quick Activity Table */}
        <Card className="border-border/50 bg-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold font-display">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {[
                { label: 'Weekly Sales', value: '1,240 USDT', icon: TrendingUp },
                { label: 'Conversion Rate', value: '5.2%', icon: BarChart3 },
                { label: 'New Store Leads', value: '14', icon: Users },
                { label: 'System Health', value: '99.9%', icon: Settings },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold tabular-nums">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
