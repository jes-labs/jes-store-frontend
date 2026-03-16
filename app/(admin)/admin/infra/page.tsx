'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Server, 
  Zap, 
  Globe, 
  Database, 
  Cloud, 
  Activity,
  ArrowUpRight,
  Wifi,
  History,
  Terminal,
  Cpu
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'

// Mock Node Data
const nodes = [
  { name: 'Celo Mainnet Node', provider: 'Helius / Alchemy', status: 'Healthy', latency: '42ms', load: '12%', role: 'RPC_RELAY' },
  { name: 'Polygon Global Worker', provider: 'Infura', status: 'Healthy', latency: '68ms', load: '45%', role: 'AUTH_GATE' },
  { name: 'Index-Worker-NG', provider: 'Internal VPS', status: 'Healthy', latency: '12ms', load: '82%', role: 'DATA_SYNC' },
  { name: 'Staging Relay', provider: 'Local Node', status: 'Degraded', latency: '850ms', load: '92%', role: 'STAGING_TEST' },
]

export default function InfraManagement() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black font-display tracking-tight text-white uppercase italic">Nexus Infrastructure</h1>
        <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Multi-chain RPC nodes & distributed platform services</p>
      </div>

      {/* Global Status Banner */}
      <Card className="bg-[#0A0A0A] border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.05)] overflow-hidden">
         <CardContent className="p-0">
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/5">
               {[
                 { label: 'Network Uptime', value: '99.998%', trend: '+0.01%', icon: Wifi, color: 'text-primary' },
                 { label: 'Mean Latency', value: '34.2ms', trend: '-2ms', icon: Zap, color: 'text-blue-400' },
                 { label: 'Active RPCs', value: '24', trend: 'Stable', icon: Server, color: 'text-white' },
                 { label: 'Throughput', value: '1.2k req/s', trend: '+12%', icon: Activity, color: 'text-orange-400' },
               ].map((stat, i) => (
                 <div key={i} className="flex-1 p-6 space-y-2 group hover:bg-white/[0.01] transition-all">
                    <div className="flex items-center justify-between mb-2">
                       <stat.icon size={16} className={cn("opacity-40", stat.color)} />
                       <Badge className="text-[8px] bg-white/5 text-white/40 border-white/10 uppercase">{stat.trend}</Badge>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
                       <p className="text-2xl font-black text-white">{stat.value}</p>
                    </div>
                 </div>
               ))}
            </div>
         </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Node List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 flex items-center gap-2">
                <Database className="w-4 h-4" /> Cluster Management
             </h3>
             <Button variant="ghost" className="h-8 text-[10px] uppercase font-bold text-primary">Add Node</Button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
             {nodes.map((node, i) => (
               <motion.div
                 key={node.name}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                >
                  <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:border-white/10 transition-all cursor-default">
                     <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center border",
                          node.status === 'Healthy' ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-red-500/10 border-red-500/20 text-red-500 animate-pulse"
                        )}>
                           <Cloud size={18} />
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-sm font-bold text-white">{node.name}</h4>
                              <Badge className="text-[7px] font-black uppercase bg-white/5 border-white/10 text-white/40 px-1 py-0 h-3 leading-none">{node.role}</Badge>
                           </div>
                           <p className="text-[10px] text-white/30 font-mono italic">{node.provider}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-8 text-center hidden md:flex">
                        <div className="space-y-0.5">
                           <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Latency</p>
                           <p className="text-[11px] font-mono font-bold text-white/80">{node.latency}</p>
                        </div>
                        <div className="space-y-0.5 min-w-[60px]">
                           <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Load</p>
                           <div className="flex items-center gap-2">
                              <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                 <div className={cn(
                                   "h-full rounded-full",
                                   parseInt(node.load) > 80 ? "bg-red-500" : "bg-primary"
                                 )} style={{ width: node.load }} />
                              </div>
                              <span className="text-[9px] font-mono text-white/40">{node.load}</span>
                           </div>
                        </div>
                     </div>

                     <Button variant="ghost" size="icon" className="h-8 w-8 text-white/20 hover:text-white group-hover:bg-white/5">
                        <ArrowUpRight size={14} />
                     </Button>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Console / Events */}
        <div className="space-y-6">
           <Card className="bg-[#050505] border-white/5 h-full min-h-[400px] flex flex-col">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Terminal size={14} /> RPC Event Stream
                 </h3>
                 <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="flex-1 p-4 font-mono text-[10px] space-y-2 text-white/40 custom-scrollbar overflow-y-auto">
                 <p><span className="text-green-500">[21:40:12]</span> SUCCESS: Block mined on Celo #184291</p>
                 <p><span className="text-blue-400">[21:40:15]</span> SYSTEM: Distributed garbage collection completed</p>
                 <p><span className="text-primary">[21:40:18]</span> FETCH: Exchange rates updated (CoinGecko SDK)</p>
                 <p><span className="text-yellow-500">[21:40:22]</span> WARN: Latency spike detected on EMEA relay</p>
                 <p><span className="text-white/20">[21:40:25]</span> TRACE: Health check passed for 14 active nodes</p>
                 <p className="animate-pulse">_</p>
              </div>
              <div className="p-4 bg-white/[0.02] border-t border-white/5">
                 <Button variant="ghost" size="sm" className="w-full text-[9px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <History size={12} /> View History
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  )
}
