'use client'

import { useState } from 'react'
import { MetricCard } from "@/components/features/analytics/MetricCard"
import { RevenueChart } from "@/components/features/analytics/RevenueChart"
import { TopProductsChart } from "@/components/features/analytics/TopProductsChart"
import { PageHeader } from "@/components/shared/PageHeader"
import { DollarSign, ShoppingBag, Users, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAnalytics } from '@/hooks/useAnalytics'

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d')
  const { data: analytics, isLoading } = useAnalytics()

  const totalRevenue = analytics ? `₦${parseFloat(analytics.total_revenue ?? '0').toLocaleString()}` : '—'
  const totalOrders = analytics?.total_orders?.toString() ?? '—'
  const totalCustomers = analytics?.total_customers?.toString() ?? '—'
  const netProfit = analytics ? `₦${parseFloat(analytics.net_profit ?? '0').toLocaleString()}` : '—'

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight">Analytics</h1>
          <p className="text-muted-foreground pt-1">Deep dive into your store&apos;s performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px] rounded-xl border-border/50 bg-card">
              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border/50">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-xl font-bold px-6">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={isLoading ? '…' : totalRevenue}
          change={0}
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="Total Orders"
          value={isLoading ? '…' : totalOrders}
          change={0}
          icon={ShoppingBag}
          trend="up"
        />
        <MetricCard
          title="Total Customers"
          value={isLoading ? '…' : totalCustomers}
          change={0}
          icon={Users}
          trend="up"
        />
        <MetricCard
          title="Net Profit"
          value={isLoading ? '…' : netProfit}
          change={0}
          icon={TrendingUp}
          trend={parseFloat(analytics?.net_profit ?? '0') >= 0 ? 'up' : 'down'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <TopProductsChart topProducts={analytics?.top_products} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
