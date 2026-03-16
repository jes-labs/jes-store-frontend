'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Cpu, 
  Database, 
  HardDrive, 
  Waves,
  Zap,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from '@/lib/utils'

export default function PlatformHealth() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black font-display tracking-tight text-white uppercase italic">System Vitals</h1>
        <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Real-time resource utilization & cluster health</p>
      </div>

      {/* Main Health Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {[
           { label: 'Platform Core', status: 'Healthy', uptime: '99.99%', load: 12, icon: Activity, color: 'text-primary' },
           { label: 'API Gateway', status: 'Healthy', uptime: '99.98%', load: 45, icon: Zap, color: 'text-blue-400' },
           { label: 'Database Cluster', status: 'Optimizing', uptime: '100%', load: 78, icon: Database, color: 'text-orange-400' },
           { label: 'Static Assets', status: 'Degraded', uptime: '98.4%', load: 92, icon: HardDrive, color: 'text-red-400' },
         ].map((service, i) => (
           <Card key={i} className="bg-white/[0.02] border-white/5 hover:border-white/10 transition-all overflow-hidden relative group">
              <CardContent className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className={cn("p-2 rounded-lg bg-white/[0.03]", service.color)}>
                       <service.icon size={18} />
                    </div>
                    <Badge className={cn(
                      "text-[8px] font-black uppercase px-2 py-0 h-4 rounded-full",
                      service.status === 'Healthy' ? "bg-green-500/10 text-green-500" :
                      service.status === 'Optimizing' ? "bg-blue-500/10 text-blue-400" :
                      "bg-red-500/10 text-red-400"
                    )}>
                       {service.status}
                    </Badge>
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{service.label}</h3>
                    <div className="flex items-center justify-between text-[10px] text-white/40 font-mono">
                       <span>Uptime: {service.uptime}</span>
                       <span>Load: {service.load}%</span>
                    </div>
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                    <div className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      service.load > 80 ? "bg-red-500" : service.load > 50 ? "bg-orange-400" : "bg-primary"
                    )} style={{ width: `${service.load}%` }} />
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Detailed Utilization */}
         <Card className="bg-[#0A0A0A] border-white/5 lg:p-4">
            <CardHeader>
               <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary" /> Compute & Memory Trace
               </CardTitle>
               <CardDescription className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Global average per instance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 mt-4">
               {[
                 { label: 'Master CPU Utilization', value: '42%', trend: 'up', points: [20, 35, 30, 45, 42] },
                 { label: 'Memory Allocation', value: '12.4GB / 32GB', trend: 'stable', points: [80, 80, 81, 80, 80] },
                 { label: 'Disk I/O Latency', value: '0.8ms', trend: 'down', points: [1.2, 1.0, 0.9, 0.8, 0.8] },
               ].map((metric, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{metric.label}</p>
                          <p className="text-xl font-black text-white font-mono">{metric.value}</p>
                       </div>
                       <div className="text-right">
                          <div className={cn(
                            "flex items-center gap-1 text-[10px] font-bold uppercase",
                            metric.trend === 'up' ? "text-red-400" : metric.trend === 'down' ? "text-green-500" : "text-blue-400"
                          )}>
                             {metric.trend === 'up' ? <TrendingUp size={12} /> : metric.trend === 'down' ? <TrendingDown size={12} /> : <Clock size={12} />}
                             {metric.trend}
                          </div>
                       </div>
                    </div>
                    {/* Visual bar graph representation */}
                    <div className="flex items-end gap-1.5 h-12 pt-2">
                       {metric.points.map((p, idx) => (
                         <div 
                           key={idx} 
                           className="flex-1 bg-white/[0.03] rounded-t-sm relative group cursor-crosshair"
                           style={{ height: `${(p / Math.max(...metric.points)) * 100}%` }}
                         >
                            <div className="absolute inset-x-0 bottom-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                       ))}
                    </div>
                 </div>
               ))}
            </CardContent>
         </Card>

         {/* Health Advisories */}
         <Card className="bg-[#0A0A0A] border-white/5 space-y-4">
            <CardHeader>
               <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Waves className="w-5 h-5 text-blue-400" /> Platform Advisories
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {[
                 { level: 'Critical', msg: 'Primary asset storage node responding slowly in USE-2 region.', time: '12m ago', icon: AlertTriangle, color: 'text-red-400' },
                 { level: 'Info', msg: 'Auto-scaling for worker-cluster-beta completed successfully.', time: '45m ago', icon: CheckCircle2, color: 'text-green-500' },
                 { level: 'Warning', msg: 'Database connection pool reaching upper limit for JesStore-POS.', time: '1h ago', icon: AlertTriangle, color: 'text-yellow-500' },
               ].map((adv, i) => (
                 <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                    <div className={cn("mt-1", adv.color)}>
                       <adv.icon size={18} />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-1">
                          <span className={cn("text-[10px] font-black uppercase tracking-widest", adv.color)}>{adv.level}</span>
                          <span className="text-[9px] text-white/20 font-mono">{adv.time}</span>
                       </div>
                       <p className="text-xs text-white/70 leading-relaxed italic">{adv.msg}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-white/20 hover:text-white">
                       <ArrowRight size={14} />
                    </Button>
                 </div>
               ))}
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
