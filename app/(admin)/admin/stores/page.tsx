'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Store, 
  Search, 
  Filter, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  ShoppingBag,
  DollarSign
} from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'

// Mock Data
const stores = [
  { 
    id: '1', 
    name: "Amara's Fashion", 
    owner: "Amara Okonkwo", 
    category: "Boutique", 
    revenue: 45200, 
    orders: 124, 
    status: 'Active', 
    health: 'Healthy',
    location: 'Lagos, NG'
  },
  { 
    id: '2', 
    name: "Tech Haven", 
    owner: "Chidi Obi", 
    category: "Electronics", 
    revenue: 128500, 
    orders: 89, 
    status: 'Active', 
    health: 'Needs Attention',
    location: 'Abuja, NG'
  },
  { 
    id: '3', 
    name: "Groceries Express", 
    owner: "Fatima Yusuf", 
    category: "Groceries", 
    revenue: 8900, 
    orders: 342, 
    status: 'Pending', 
    health: 'Healthy',
    location: 'Kano, NG'
  },
  { 
    id: '4', 
    name: "Vintage Styles", 
    owner: "Kofi Mensah", 
    category: "Boutique", 
    revenue: 15400, 
    orders: 56, 
    status: 'Active', 
    health: 'Critical',
    location: 'Accra, GH'
  },
]

export default function StoresMonitoring() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black font-display tracking-tight text-white uppercase italic">Store Ecosystem</h1>
        <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Global Merchant Directory & Health Monitoring</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <Input 
              placeholder="Search by store name, owner, or ID..." 
              className="pl-10 h-11 bg-black/40 border-white/5 focus:border-primary/50 text-xs text-white"
            />
         </div>
         <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-11 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-bold uppercase tracking-widest">
               <Filter className="w-4 h-4 mr-2" /> Filter By
            </Button>
            <Button className="flex-1 md:flex-none h-11 bg-primary hover:bg-primary/90 text-black text-[10px] font-bold uppercase tracking-widest px-8">
               Export Data
            </Button>
         </div>
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 gap-4">
         {stores.map((store, i) => (
           <motion.div
             key={store.id}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: i * 0.1 }}
           >
              <Card className="bg-[#0A0A0A] border-white/5 hover:border-primary/20 transition-all duration-300 group">
                 <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                       {/* Identity */}
                       <div className="flex items-center gap-6 min-w-[300px]">
                          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-2xl font-black text-primary relative shadow-inner">
                             {store.name.charAt(0)}
                             <div className={cn(
                               "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0A0A0A] shadow-sm",
                               store.health === 'Healthy' ? "bg-green-500" : 
                               store.health === 'Critical' ? "bg-destructive animate-pulse" : "bg-yellow-500"
                             )} />
                          </div>
                          <div>
                             <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{store.name}</h3>
                                <Badge variant="outline" className="text-[8px] font-bold uppercase border-white/10 text-white/40">{store.id}</Badge>
                             </div>
                             <p className="text-xs text-white/40 flex items-center gap-2">
                                <span className="font-bold text-white/60">{store.owner}</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                {store.location}
                             </p>
                          </div>
                       </div>

                       {/* Metrics */}
                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
                          <div className="space-y-1">
                             <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Revenue</span>
                             <div className="flex items-center gap-2">
                                <DollarSign className="w-3 h-3 text-primary" />
                                <span className="text-sm font-mono font-bold text-white">${store.revenue.toLocaleString()}</span>
                             </div>
                          </div>
                          <div className="space-y-1">
                             <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Orders</span>
                             <div className="flex items-center gap-2">
                                <ShoppingBag className="w-3 h-3 text-blue-400" />
                                <span className="text-sm font-mono font-bold text-white">{store.orders}</span>
                             </div>
                          </div>
                          <div className="space-y-1">
                             <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">System Health</span>
                             <div className="flex items-center gap-2">
                                {store.health === 'Healthy' ? (
                                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                                ) : (
                                  <AlertCircle className="w-3 h-3 text-destructive" />
                                )}
                                <span className={cn(
                                  "text-[10px] font-bold uppercase",
                                  store.health === 'Healthy' ? "text-green-500" : "text-destructive"
                                )}>{store.health}</span>
                             </div>
                          </div>
                          <div className="space-y-1">
                             <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Status</span>
                             <div>
                                <Badge className={cn(
                                  "text-[8px] uppercase font-black px-2 py-0 h-4 rounded-full",
                                  store.status === 'Active' ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-white/40 border-white/10"
                                )}>
                                   {store.status}
                                </Badge>
                             </div>
                          </div>
                       </div>

                       {/* Action */}
                       <div className="flex items-center gap-3">
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all">
                             <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-blue-400/10 hover:border-blue-400/20 hover:text-blue-400 transition-all">
                             <TrendingUp className="w-4 h-4" />
                          </Button>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>
         ))}
      </div>
    </div>
  )
}
