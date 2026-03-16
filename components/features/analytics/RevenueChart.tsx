'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { formatCurrency } from "@/lib/utils/currency"

const data = [
  { name: 'Mon', revenue: 4200, orders: 12 },
  { name: 'Tue', revenue: 3800, orders: 8 },
  { name: 'Wed', revenue: 5500, orders: 15 },
  { name: 'Thu', revenue: 4800, orders: 11 },
  { name: 'Fri', revenue: 7200, orders: 22 },
  { name: 'Sat', revenue: 8500, orders: 28 },
  { name: 'Sun', revenue: 6400, orders: 18 },
]

export function RevenueChart() {
  return (
    <Card className="border-border/50 bg-card overflow-hidden h-full">
      <CardHeader className="border-b border-border/50 bg-muted/5">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Revenue Analytics</CardTitle>
      </CardHeader>
      <CardContent className="p-6 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.3)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border) / 0.5)',
                borderRadius: '16px',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)'
              }}
              labelStyle={{ fontSize: 12, fontWeight: 800, color: 'hsl(var(--primary))', marginBottom: '4px' }}
              itemStyle={{ fontSize: 11, fontWeight: 600 }}
              formatter={(value: any) => [formatCurrency(Number(value), 'USDT'), 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#revenueGradient)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
