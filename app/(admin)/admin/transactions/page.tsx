'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'

// Mock Data
const transactions = [
  { 
    id: 'TXN-8429-XM', 
    store: "Amara's Fashion", 
    amount: 120.50, 
    asset: 'USDC', 
    network: 'Celo',
    type: 'Inbound',
    status: 'Confirmed',
    time: '2 mins ago',
    hash: '0x42df...af82'
  },
  { 
    id: 'TXN-8430-PL', 
    store: "Tech Haven", 
    amount: 1450.00, 
    asset: 'USDT', 
    network: 'Polygon',
    type: 'Inbound',
    status: 'Pending',
    time: '5 mins ago',
    hash: '0x882a...91bc'
  },
  { 
    id: 'TXN-8431-KJ', 
    store: "Global Payout", 
    amount: 4200.00, 
    asset: 'USDC', 
    network: 'Celo',
    type: 'Outbound',
    status: 'Failed',
    time: '12 mins ago',
    hash: '0x1121...e342'
  },
  { 
    id: 'TXN-8432-WQ', 
    store: "Groceries Express", 
    amount: 15.20, 
    asset: 'cUSD', 
    network: 'Celo',
    type: 'Inbound',
    status: 'Confirmed',
    time: '18 mins ago',
    hash: '0x9923...112a'
  },
]

export default function TransactionLedger() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black font-display tracking-tight text-white uppercase italic">Platform Ledger</h1>
        <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Real-time Cross-chain Settlement Monitoring</p>
      </div>

      {/* Aggregate Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: '24h Total Volume', value: '$242,500', icon: Zap, color: 'text-primary' },
           { label: 'Settlement Efficiency', value: '99.2%', icon: ShieldCheck, color: 'text-blue-400' },
           { label: 'Active Inbounds', value: '42', icon: Clock, color: 'text-yellow-400' },
         ].map((stat, i) => (
           <Card key={i} className="bg-white/[0.02] border-white/5 overflow-hidden">
              <CardContent className="p-6">
                 <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-2xl bg-white/[0.03] border border-white/5", stat.color)}>
                       <stat.icon size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
                       <p className="text-2xl font-black text-white leading-tight">{stat.value}</p>
                    </div>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      {/* Search & Tooling */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-white/5 pb-8">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <Input 
              placeholder="Search by txn hash, store, or ID..." 
              className="pl-10 h-11 bg-white/[0.02] border-white/5 focus:border-primary/50 text-xs text-white rounded-xl"
            />
         </div>
         <div className="flex gap-2">
            <Button variant="outline" className="h-11 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-bold uppercase tracking-widest px-6">
               <Filter className="w-4 h-4 mr-2" /> Global Filter
            </Button>
         </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
         {transactions.map((txn, i) => (
           <motion.div
             key={txn.id}
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.05 }}
           >
              <div className="group bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-primary/10 transition-all duration-300">
                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Main Info */}
                    <div className="flex items-center gap-6">
                       <div className={cn(
                         "h-12 w-12 rounded-xl flex items-center justify-center border",
                         txn.type === 'Inbound' ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                       )}>
                          {txn.type === 'Inbound' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                       </div>
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <h4 className="text-sm font-bold text-white">{txn.id}</h4>
                             <Badge variant="outline" className="text-[8px] font-bold border-white/10 uppercase text-white/40">{txn.status}</Badge>
                          </div>
                          <p className="text-[10px] text-white/40 font-mono tracking-wider">{txn.hash}</p>
                       </div>
                    </div>

                    {/* Meta Data */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1 lg:max-w-2xl">
                       <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Store</span>
                          <p className="text-xs font-bold text-white/80">{txn.store}</p>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Asset & Chain</span>
                          <div className="flex items-center gap-2">
                             <span className="text-xs font-bold text-primary">{txn.asset}</span>
                             <span className="text-[10px] text-white/40 uppercase tracking-tighter">({txn.network})</span>
                          </div>
                       </div>
                       <div className="space-y-1 text-right lg:text-left">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Value</span>
                          <p className="text-sm font-black text-white font-mono">${txn.amount.toFixed(2)}</p>
                       </div>
                       <div className="space-y-1 hidden sm:block">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Timestamp</span>
                          <p className="text-xs text-white/60 flex items-center gap-1">
                             <Clock size={10} /> {txn.time}
                          </p>
                       </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                       <Button variant="ghost" size="icon" className="h-10 w-10 text-white/20 hover:text-white hover:bg-white/5">
                          <ExternalLink size={16} />
                       </Button>
                    </div>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  )
}
