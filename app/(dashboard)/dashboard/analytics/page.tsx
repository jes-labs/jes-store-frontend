'use client'

import { MetricCard } from "@/components/features/analytics/MetricCard"
import { RevenueChart } from "@/components/features/analytics/RevenueChart"
import { TopProductsChart } from "@/components/features/analytics/TopProductsChart"
import { PageHeader } from "@/components/shared/PageHeader"
import { DollarSign, ShoppingBag, Users, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight">Analytics</h1>
          <p className="text-muted-foreground pt-1">Deep dive into your store's performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30d">
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
          value="$45,231.89" 
          change={12.5} 
          icon={DollarSign} 
          trend="up"
        />
        <MetricCard 
          title="Total Orders" 
          value="1,284" 
          change={8.2} 
          icon={ShoppingBag} 
          trend="up"
        />
        <MetricCard 
          title="New Customers" 
          value="482" 
          change={-3.1} 
          icon={Users} 
          trend="down"
        />
        <MetricCard 
          title="Avg. Order Value" 
          value="$35.22" 
          change={2.4} 
          icon={TrendingUp} 
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <TopProductsChart />
        </div>
      </div>
    </div>
  )
}
