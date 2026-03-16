'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Key, 
  UserCheck, 
  ShieldAlert, 
  Activity,
  Smartphone,
  Globe,
  RefreshCw,
  MoreVertical
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from '@/lib/utils'

export default function SecurityManagement() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black font-display tracking-tight text-white uppercase italic">Security & Governance</h1>
        <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Platform authentication, access control & threat monitoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Controls */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0A0A0A] border-white/5 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Global Authentication Policies
              </CardTitle>
              <CardDescription className="text-white/40 text-xs italic font-mono">Enforce security standards across all platform endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: 'Multi-Factor Authentication', desc: 'Require MFA for all merchant and admin accounts', status: true },
                { title: 'Wallet-Only Login', desc: 'Disable email/password login, enforcing web3-native auth', status: false },
                { title: 'Session Hijack Protection', desc: 'Real-time monitoring for suspicious session transitions', status: true },
                { title: 'Rate Limiting (API)', desc: 'Adaptive throttling for public-facing route handlers', status: true },
              ].map((policy, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{policy.title}</h4>
                    <p className="text-xs text-white/40 italic">{policy.desc}</p>
                  </div>
                  <Switch checked={policy.status} />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="bg-[#0A0A0A] border-white/5">
                <CardHeader className="pb-2">
                   <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-400" /> API Keys
                   </CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-[10px] text-white/40 mb-4 leading-relaxed font-mono">Manage global service keys for Celo, Polygon, and internal workers.</p>
                   <Button variant="outline" className="w-full h-10 border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest hover:bg-white/5">
                      Configure Keys
                   </Button>
                </CardContent>
             </Card>
             <Card className="bg-[#0A0A0A] border-white/5">
                <CardHeader className="pb-2">
                   <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-orange-400" /> Threat Intel
                   </CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-[10px] text-white/40 mb-4 leading-relaxed font-mono">Automatic IP blacklisting and DDoS mitigation reports.</p>
                   <Button variant="outline" className="w-full h-10 border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest hover:bg-white/5">
                      View Audit logs
                   </Button>
                </CardContent>
             </Card>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
             <CardHeader>
                <CardTitle className="text-sm font-black uppercase text-primary italic tracking-tight">Access Token Health</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                   <div>
                      <span className="text-2xl font-black text-white leading-none">99.8%</span>
                      <p className="text-[9px] text-primary/60 font-bold uppercase mt-1">Validity Rate</p>
                   </div>
                   <Activity className="w-8 h-8 text-primary/20" />
                </div>
                <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                   <div className="h-full w-[99.8%] bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                </div>
             </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/5 overflow-hidden">
             <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/60">Active Sessions</h3>
             </div>
             <div className="divide-y divide-white/5">
                {[
                  { user: 'Admin-01', ip: '192.168.1.1', device: 'macOS / Brave', location: 'Lagos' },
                  { user: 'Support-04', ip: '45.12.89.2', device: 'Windows / Chrome', location: 'Accra' },
                  { user: 'Dev-Root', ip: 'local', device: 'Tunnel / CLI', location: 'Internal' },
                ].map((session, i) => (
                  <div key={i} className="p-4 flex items-center gap-3 hover:bg-white/[0.02] transition-all">
                     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <UserCheck className="w-4 h-4 text-white/40" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                           <span className="text-[11px] font-bold text-white uppercase">{session.user}</span>
                           <Badge className="text-[8px] bg-green-500/10 text-green-500 border-green-500/20 px-1 py-0 h-3">LIVE</Badge>
                        </div>
                        <p className="text-[9px] text-white/30 font-mono truncate">{session.device} • {session.location}</p>
                     </div>
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
