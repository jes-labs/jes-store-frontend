'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  AlertTriangle, 
  Terminal, 
  Search, 
  Filter, 
  Trash2, 
  Download,
  Info,
  ShieldAlert,
  Hash
} from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'

// Mock Data
const logs = [
  { id: '1', level: 'Error', source: 'Auth-API', event: '401 Unauthorized spike from IP 192.168.1.4', time: 'Just now' },
  { id: '2', level: 'Warning', source: 'RPCC-Node', event: 'Latency exceeded 250ms on Celo Mainnet', time: '5 mins ago' },
  { id: '3', level: 'Info', source: 'Inventory-Wk', event: 'Async re-indexing completed for 42 stores', time: '12 mins ago' },
  { id: '4', level: 'Critical', source: 'Postgres-DB', event: 'Connection pool near capacity (92%)', time: '22 mins ago' },
  { id: '5', level: 'Info', source: 'System', event: 'Weekly maintenance backup initiated', time: '45 mins ago' },
  { id: '6', level: 'Error', source: 'Payment-SVC', event: 'Contract call failed: insufficient gas', time: '1 hour ago' },
]

export default function SystemLogs() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black font-display tracking-tight text-white uppercase italic">System Diagnostics</h1>
          <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Platform-wide Event Streams & Trace logs</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-12 border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-bold uppercase tracking-widest px-6 rounded-xl flex items-center gap-2">
              <Download size={16} /> Export Logs
           </Button>
           <Button variant="ghost" className="h-12 text-destructive hover:bg-destructive/10 font-bold uppercase tracking-widest px-6 rounded-xl flex items-center gap-2">
              <Trash2 size={16} /> Clear Buffer
           </Button>
        </div>
      </div>

      {/* Terminal View */}
      <Card className="bg-[#050505] border-white/5 flex-1 shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
         {/* Terminal Header */}
         <div className="bg-[#0A0A0A] border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-green-500/30" />
               </div>
               <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.02] border border-white/5">
                  <Terminal size={12} className="text-white/40" />
                  <span className="text-[10px] font-mono text-white/40">jesstore-production-cluster-01</span>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
                  <input 
                    placeholder="Search stream..." 
                    className="pl-8 bg-transparent border-none text-[10px] font-mono text-white focus:outline-none w-48"
                  />
               </div>
               <div className="w-px h-4 bg-white/5" />
               <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase font-bold text-white/40">
                  <Filter size={12} className="mr-2" /> Level: All
               </Button>
            </div>
         </div>

         {/* Log Stream */}
         <CardContent className="p-0 flex-1 overflow-y-auto font-mono custom-scrollbar">
            <div className="flex flex-col">
               {logs.map((log, i) => (
                 <motion.div
                   key={log.id}
                   initial={{ opacity: 0, x: 5 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.05 }}
                   className="group flex items-start gap-6 px-6 py-3 hover:bg-white/[0.01] border-b border-white/[0.02] transition-all"
                 >
                    <div className="flex items-center gap-4 min-w-[120px] pt-0.5">
                       <span className="text-[10px] text-white/20">{log.time}</span>
                       <Badge className={cn(
                         "text-[9px] font-black uppercase px-2 py-0 h-4 rounded leading-none flex items-center",
                         log.level === 'Critical' ? "bg-red-500/20 text-red-500" :
                         log.level === 'Error' ? "bg-red-400/20 text-red-400" :
                         log.level === 'Warning' ? "bg-yellow-500/20 text-yellow-500" :
                         "bg-blue-500/20 text-blue-500"
                       )}>
                          {log.level}
                       </Badge>
                    </div>
                    <div className="flex items-center gap-3 pt-0.5">
                       <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">[{log.source}]</span>
                       <p className="text-[11px] text-white/80 leading-relaxed font-mono">
                          <span className="text-white/20 mr-2">$</span> {log.event}
                       </p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" size="icon" className="h-6 w-6 text-white/20 hover:text-white">
                          <Hash size={12} />
                       </Button>
                    </div>
                 </motion.div>
               ))}
               <div className="px-6 py-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] text-primary/40 italic">Waiting for incoming events...</span>
               </div>
            </div>
         </CardContent>

         {/* Terminal Footer */}
         <div className="bg-[#0A0A0A] border-t border-white/5 px-6 py-3 flex items-center justify-between text-[10px] text-white/40 uppercase tracking-widest font-bold">
            <div className="flex gap-6">
               <span className="flex items-center gap-2"><Info size={12} /> 1.2k events per/min</span>
               <span className="flex items-center gap-2"><ShieldAlert size={12} className="text-red-500" /> 2 Active Errors</span>
            </div>
            <span>Auto-scroll Enabled</span>
         </div>
      </Card>
    </div>
  )
}
