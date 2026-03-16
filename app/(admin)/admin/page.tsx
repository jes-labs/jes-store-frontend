'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  TrendingUp, 
  Store, 
  Users, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Globe, 
  Server,
  Activity,
  Cpu
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts'

const data = [
  { name: 'Mon', volume: 12400, transactions: 420 },
  { name: 'Tue', volume: 15600, transactions: 580 },
  { name: 'Wed', volume: 13200, transactions: 490 },
  { name: 'Thu', volume: 18900, transactions: 720 },
  { name: 'Fri', volume: 22400, transactions: 890 },
  { name: 'Sat', volume: 26800, transactions: 1100 },
  { name: 'Sun', volume: 24500, transactions: 950 },
]

const storeGrowth = [
  { category: 'Fashion', count: 42 },
  { category: 'Electronics', count: 28 },
  { category: 'Groceries', count: 65 },
  { category: 'Dining', count: 19 },
  { category: 'Health', count: 12 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black font-display tracking-tight text-white uppercase italic">Ecosystem Overview</h1>
        <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Global Platform Performance Controller</p>
      </div>

      {/* High-Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Ecosystem Volume', value: '$14.2M', change: '+12.5%', icon: TrendingUp, color: 'text-primary' },
          { label: 'Active Business Nodes', value: '1,248', change: '+4.2%', icon: Store, color: 'text-blue-400' },
          { label: 'Total Shopper Wallets', value: '84.2k', change: '+28%', icon: Users, color: 'text-purple-400' },
          { label: 'Network Gas Efficiency', value: '99.9%', change: '+0.1%', icon: Zap, color: 'text-yellow-400' },
        ].map((item, i) => (
          <Card key={i} className="bg-[#0A0A0A] border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <item.icon size={64} />
             </div>
             <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                   <div className={cn("p-1.5 rounded-md bg-white/[0.03]", item.color)}>
                      <item.icon size={12} />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-black tracking-tighter text-white">{item.value}</span>
                   <span className="text-[10px] font-bold text-green-500 flex items-center">
                      <ArrowUpRight size={10} className="mr-0.5" /> {item.change}
                   </span>
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Volume Chart */}
        <Card className="lg:col-span-2 bg-[#0A0A0A] border-white/5 p-6">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/80">Platform Transaction Volume</h3>
                <p className="text-[10px] text-white/40 font-mono mt-1">Cross-store aggregated USDC/USDT settlements</p>
             </div>
             <div className="flex gap-2">
                <Badge variant="outline" className="rounded-md border-white/5 bg-white/[0.02] text-[10px] font-mono">7D</Badge>
                <Badge variant="outline" className="rounded-md border-white/5 bg-white/[0.02] text-[10px] font-mono opacity-50">30D</Badge>
             </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ADFA1D" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ADFA1D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{fill: '#ffffff40', fontSize: 10, fontWeight: 700}}
                   dy={10}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{fill: '#ffffff40', fontSize: 10, fontWeight: 700}}
                />
                <Tooltip 
                   contentStyle={{backgroundColor: '#0A0A0A', borderColor: '#ffffff10', borderRadius: '8px'}}
                   itemStyle={{fontSize: '10px', fontWeight: 700}}
                   labelStyle={{fontSize: '10px', color: '#ffffff40'}}
                />
                <Area type="monotone" dataKey="volume" stroke="#ADFA1D" strokeWidth={2} fillOpacity={1} fill="url(#volumeGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Store Distribution */}
        <Card className="bg-[#0A0A0A] border-white/5 p-6 space-y-8">
           <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/80">Category Distribution</h3>
              <p className="text-[10px] text-white/40 font-mono mt-1">Niche penetration analytics</p>
           </div>
           <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={storeGrowth}>
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {storeGrowth.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#ADFA1D', '#60a5fa', '#c084fc', '#fbbf24', '#f87171'][index % 5]} />
                    ))}
                  </Bar>
                  <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fill: '#ffffff40', fontSize: 9}} />
                  <Tooltip cursor={{fill: '#ffffff05'}} contentStyle={{backgroundColor: '#0A0A0A', border: 'none'}} />
                </BarChart>
              </ResponsiveContainer>
           </div>
           
           <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">System Sync</span>
                 </div>
                 <span className="text-[10px] font-mono text-white/40">12ms latency</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(173,250,29,0.6)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Registry Health</span>
                 </div>
                 <span className="text-[10px] font-mono text-white/40">Healthy</span>
              </div>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
         {/* Live Platform Feed */}
         <Card className="bg-[#0A0A0A] border-white/5">
            <CardHeader>
               <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Activity size={16} className="text-primary" />
                  Live Platform Logs
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {[
                 { time: '12:42:01', event: 'New Store Registered', details: 'Naija Tech Hub (Lagos, NG)', status: 'Success' },
                 { time: '12:41:45', event: 'High Volume Transaction', details: '$1,200 USDC from wallet 0x42...fB', status: 'Warning' },
                 { time: '12:40:12', event: 'API Key Rotated', details: 'Internal system: node-08', status: 'Info' },
                 { time: '12:38:50', event: 'Store Re-indexed', details: 'Amara\'s Fashion (Slug update)', status: 'Success' },
               ].map((log, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-4">
                       <span className="text-[9px] font-mono text-white/40">{log.time}</span>
                       <div>
                          <p className="text-[11px] font-bold text-white/80">{log.event}</p>
                          <p className="text-[9px] text-white/30">{log.details}</p>
                       </div>
                    </div>
                    <Badge variant="outline" className={cn(
                       "text-[8px] font-bold uppercase tracking-widest rounded px-1.5 py-0",
                       log.status === 'Success' ? "border-green-500/20 text-green-500 bg-green-500/5" :
                       log.status === 'Warning' ? "border-yellow-500/20 text-yellow-500 bg-yellow-500/5" :
                       "border-blue-500/20 text-blue-500 bg-blue-500/5"
                    )}>
                       {log.status}
                    </Badge>
                 </div>
               ))}
            </CardContent>
         </Card>

         {/* Network Utilization */}
         <Card className="bg-[#0A0A0A] border-white/5 p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 text-primary/10">
               <Cpu size={120} />
            </div>
            <div className="relative z-10 space-y-8">
               <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/80">Network Utilization</h3>
                  <p className="text-[10px] text-white/40 font-mono">Real-time resource allocation monitoring</p>
               </div>
               
               <div className="space-y-6">
                  {[
                    { label: 'Blockchain Propagation', value: 92, status: 'Optimal' },
                    { label: 'Storage Node Load', value: 45, status: 'Optimal' },
                    { label: 'Indexer Synchronicity', value: 99, status: 'Synced' },
                    { label: 'Platform API Uptime', value: 100, status: 'Active' },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-white/60">{stat.label}</span>
                          <span className="text-white">{stat.value}%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${stat.value}%` }}
                             transition={{ duration: 1.5, delay: i * 0.2 }}
                             className={cn(
                                "h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]",
                                stat.value > 90 ? "bg-primary" : stat.value > 70 ? "bg-yellow-400" : "bg-blue-400"
                             )} 
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </Card>
      </div>
    </div>
  )
}
