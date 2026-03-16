'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Flag, 
  Coins, 
  Globe, 
  Bell, 
  Save, 
  RefreshCcw,
  Zap,
  Lock,
  MessageSquare,
  Search
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'

export default function GlobalConfig() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black font-display tracking-tight text-white uppercase italic">Global NEXUS config</h1>
          <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Platform variables, feature flags & fee structures</p>
        </div>
        <div className="flex gap-2">
           <Button variant="ghost" className="h-10 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest gap-2">
              <RefreshCcw size={14} /> Revert Changes
           </Button>
           <Button className="h-10 bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest px-8 rounded-xl gap-2">
              <Save size={14} /> Update Platform
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Config */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0A0A0A] border-white/5 shadow-2xl overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center justify-between">
                 <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                   <Flag className="w-5 h-5 text-primary" /> Feature Flags
                 </CardTitle>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/20" />
                    <input className="bg-transparent border-none text-[10px] font-mono text-white/60 focus:outline-none w-32" placeholder="Search flags..." />
                 </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-white/5">
              {[
                { label: 'Public Storefront Beta', desc: 'Enable the redesigned e-commerce store page for all users', active: true, tag: 'UI_UX' },
                { label: 'Stablecoin Payout (Automatic)', desc: 'Enable auto-settlement to merchant wallets at midnight GMT', active: false, tag: 'SETTLEMENT' },
                { label: 'MiniPay Integration', desc: 'Enable Opera MiniPay specialized redirection for mobile', active: true, tag: 'PAYMENT' },
                { label: 'Anonymous Checkout', desc: 'Allow shoppers to buy without mandatory registration', active: true, tag: 'ECOMMERCE' },
                { label: 'Multi-Asset POS', desc: 'Enable secondary assets (CELO, WETH) on merchant POS', active: false, tag: 'POS' },
              ].map((flag, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-white/[0.01] transition-all group">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                       <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{flag.label}</h4>
                       <Badge variant="outline" className="text-[7px] font-black tracking-widest border-white/10 text-white/30 h-4">{flag.tag}</Badge>
                    </div>
                    <p className="text-xs text-white/40 italic leading-relaxed">{flag.desc}</p>
                  </div>
                  <Switch checked={flag.active} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#0A0A0A] border-white/5">
             <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                   <Coins className="w-5 h-5 text-blue-400" /> Platform Fee Engine
                </CardTitle>
                <CardDescription className="text-white/40 text-xs italic font-mono">Global transaction surcharge control</CardDescription>
             </CardHeader>
             <CardContent className="space-y-6 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Merchant Take Rate (%)</p>
                      <div className="relative">
                         <Input defaultValue="0.5" className="h-12 bg-black/40 border-white/5 text-lg font-black text-white font-mono pl-4 focus:ring-1 focus:ring-primary/40" />
                         <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-black">%</span>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Network Gas Surcharge (USDT)</p>
                      <div className="relative">
                         <Input defaultValue="0.05" className="h-12 bg-black/40 border-white/5 text-lg font-black text-white font-mono pl-4 focus:ring-1 focus:ring-primary/40" />
                         <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-black">$</span>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Global Metadata */}
        <div className="space-y-6">
           <Card className="bg-primary/5 border-primary/20 shadow-xl overflow-hidden">
              <div className="p-4 bg-primary/10 border-b border-primary/20 flex items-center gap-2">
                 <Zap size={16} className="text-primary animate-pulse" />
                 <span className="text-[10px] font-black uppercase text-primary tracking-widest italic">Instant Variables</span>
              </div>
              <CardContent className="p-6 space-y-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Platform Name</label>
                       <Input defaultValue="JesStore Nexus" className="bg-black/40 border-white/5 h-10 text-xs font-bold text-white focus:border-primary/50" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Master RPC URL</label>
                       <Input defaultValue="https://celo-mainnet.infura.io/v3/..." className="bg-black/40 border-white/5 h-10 text-[10px] font-mono text-white/60" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Support Webhook</label>
                       <Input defaultValue="https://discord.com/api/webhooks/..." className="bg-black/40 border-white/5 h-10 text-[10px] font-mono text-white/60" />
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Card className="bg-[#050505] border-white/5 border-dashed">
              <CardHeader className="pb-0">
                 <CardTitle className="text-xs font-bold text-white/60 uppercase tracking-widest">System Locking</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Lock size={16} className="text-red-500" />
                       <span className="text-xs font-bold text-white/90">Maintenance Mode</span>
                    </div>
                    <Switch />
                 </div>
                 <p className="text-[10px] text-white/20 italic italic leading-relaxed">Instantly disables all public storefronts and POS systems for emergency maintenance.</p>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
