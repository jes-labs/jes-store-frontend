'use client'

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  description?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  description,
  trend,
  className
}: MetricCardProps) {
  const isPositive = trend === 'up' || (change !== undefined && change > 0)
  const isNegative = trend === 'down' || (change !== undefined && change < 0)

  return (
    <Card className={cn("border-border/50 bg-card overflow-hidden group", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            <Icon size={24} />
          </div>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
              isPositive ? "bg-green-500/10 text-green-500" : 
              isNegative ? "bg-red-500/10 text-red-500" : 
              "bg-muted/50 text-muted-foreground"
            )}>
              {isPositive ? <TrendingUp size={12} /> : isNegative ? <TrendingDown size={12} /> : null}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold font-display tracking-tight text-foreground">{value}</h3>
          {description && (
            <p className="text-[10px] text-muted-foreground pt-1 italic">{description}</p>
          )}
        </div>

        {/* Decorative background element */}
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Icon size={120} />
        </div>
      </CardContent>
    </Card>
  )
}
