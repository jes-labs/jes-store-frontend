'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import { formatCurrency } from "@/lib/utils/currency"

const data = [
  { name: 'Jordan 1 Retro', sales: 42, revenue: 12500 },
  { name: 'Nike Dunk Low', sales: 38, revenue: 9800 },
  { name: 'Adidas Yeezy', sales: 25, revenue: 15600 },
  { name: 'New Balance 550', sales: 22, revenue: 4400 },
  { name: 'Crocs Classic', sales: 18, revenue: 1200 },
]

export function TopProductsChart() {
  return (
    <Card className="border-border/50 bg-card overflow-hidden h-full">
      <CardHeader className="border-b border-border/50 bg-muted/5">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Top Products by Units</CardTitle>
      </CardHeader>
      <CardContent className="p-6 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--foreground))' }}
              width={100}
            />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--muted) / 0.2)' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border) / 0.5)',
                borderRadius: '16px',
              }}
              formatter={(value: any, name: any) => [
                name === 'revenue' ? formatCurrency(Number(value), 'USDT') : value,
                name === 'revenue' ? 'Revenue' : 'Units Sold'
              ]}
            />
            <Bar dataKey="sales" radius={[0, 8, 8, 0]} barSize={24} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? 'hsl(var(--primary))' : `hsl(var(--primary) / ${0.8 - index * 0.15})`} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
