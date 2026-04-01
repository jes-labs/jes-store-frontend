'use client'

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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { RevenueChart } from '@/components/features/analytics/RevenueChart'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useAuthStore } from '@/store/authStore'

export default function DashboardPage() {
  const { data: analytics, isLoading } = useAnalytics()
  const user = useAuthStore((s) => s.user)

  const stats = [
    {
      label: 'Total Revenue',
      value: analytics ? parseFloat(analytics.total_revenue ?? '0') : 0,
      change: analytics?.revenue_this_month ? `₦${parseFloat(analytics.revenue_this_month).toLocaleString()} this month` : '—',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      isCurrency: true,
    },
    {
      label: 'Total Orders',
      value: analytics?.total_orders ?? 0,
      change: '—',
      trend: 'up' as const,
      icon: ShoppingCart,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      isCurrency: false,
    },
    {
      label: 'Products',
      value: analytics?.total_products ?? 0,
      change: analytics?.low_stock_products?.length ? `${analytics.low_stock_products.length} low stock` : 'All stocked',
      trend: (analytics?.low_stock_products?.length ?? 0) > 0 ? 'down' as const : 'up' as const,
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      isCurrency: false,
    },
    {
      label: 'Total Customers',
      value: analytics?.total_customers ?? 0,
      change: '—',
      trend: 'up' as const,
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      isCurrency: false,
    },
  ]

  const greeting = user?.fullName ? `Good day, ${user.fullName.split(' ')[0]} 👋` : 'Good day 👋'

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <PageHeader
        title={greeting}
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
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
              <CardTitle className="text-[10px] font-bold">{stat.label}</CardTitle>
              <div className={cn("p-2 rounded-xl", stat.bgColor)}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display tabular-nums">
                {isLoading ? (
                  <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                ) : stat.isCurrency ? (
                  `₦${stat.value.toLocaleString()}`
                ) : (
                  stat.value
                )}
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Top Products */}
        <Card className="border-border/50 bg-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold font-display">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-10 bg-muted animate-pulse rounded" />
                ))}
              </div>
            ) : analytics?.top_products?.length ? (
              <div className="divide-y divide-border/50">
                {analytics.top_products.slice(0, 5).map((p: any) => (
                  <div key={p.product_id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium truncate max-w-[140px]">{p.product_name}</span>
                    </div>
                    <span className="text-sm font-bold tabular-nums">₦{parseFloat(p.revenue).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {[
                  { label: 'Net Profit', value: analytics ? `₦${parseFloat(analytics.net_profit ?? '0').toLocaleString()}` : '—', icon: TrendingUp },
                  { label: 'Total Expenses', value: analytics ? `₦${parseFloat(analytics.total_expenses ?? '0').toLocaleString()}` : '—', icon: BarChart3 },
                  { label: 'Customers', value: analytics?.total_customers ?? '—', icon: Users },
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
