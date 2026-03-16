'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  UserCircle2,
  Mail,
  Wallet,
  Shield,
  Ban
} from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'

// Mock Data
const users = [
  { id: '1', name: 'Super Admin', email: 'admin@jesstore.com', role: 'Super Admin', status: 'Active', wallet: 'jesstore.eth' },
  { id: '2', name: 'Amara Okonkwo', email: 'amara@fashion.io', role: 'Merchant', status: 'Active', wallet: 'amara.celo' },
  { id: '3', name: 'Chidi Obi', email: 'chidi@tech.com', role: 'Merchant', status: 'Flagged', wallet: 'chidi.eth' },
  { id: '4', name: 'Sarah Jones', email: 'sarah@support.com', role: 'Platform Staff', status: 'Active', wallet: 'sarah.jes' },
  { id: '5', name: 'Kaseem Mike', email: 'mike@test.com', role: 'Merchant', status: 'Suspended', wallet: 'mike.celo' },
]

export default function UserManagement() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-black font-display tracking-tight text-white uppercase italic">Platform Users</h1>
          <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Global Identity & Access Control</p>
        </div>
        <Button className="h-12 bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest px-6 rounded-xl flex items-center gap-2">
           <UserPlus size={18} /> Provision User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Total Identities', value: '4,281', icon: Users, color: 'text-white' },
           { label: 'Active Merchants', value: '1,248', icon: UserCircle2, color: 'text-primary' },
           { label: 'Privileged Staff', value: '12', icon: Shield, color: 'text-blue-400' },
           { label: 'Suspended Accounts', value: '5', icon: Ban, color: 'text-red-400' },
         ].map((stat, i) => (
           <Card key={i} className="bg-white/[0.02] border-white/5 group hover:border-white/10 transition-all">
              <CardContent className="p-6">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{stat.label}</p>
                       <p className="text-2xl font-black text-white">{stat.value}</p>
                    </div>
                    <div className={cn("p-2 rounded-lg bg-white/[0.03]", stat.color)}>
                       <stat.icon size={16} />
                    </div>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search by name, email, or wallet..." 
              className="pl-10 h-11 bg-white/[0.02] border-white/10 focus:border-primary/50 text-xs text-white rounded-xl"
            />
         </div>
         <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-11 border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-bold uppercase tracking-widest px-6">
               <Filter className="w-4 h-4 mr-2" /> Role Filter
            </Button>
         </div>
      </div>

      {/* User Table Header */}
      <div className="hidden lg:grid grid-cols-5 gap-4 px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
         <div className="col-span-2">User Identity</div>
         <div>Role</div>
         <div>Status</div>
         <div className="text-right">Action</div>
      </div>

      {/* User List */}
      <div className="space-y-2">
         {users.map((user, i) => (
           <motion.div
             key={user.id}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.05 }}
           >
              <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 lg:grid lg:grid-cols-5 lg:items-center gap-4 group hover:border-primary/20 transition-all">
                 <div className="col-span-2 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-white/5 to-white/[0.1] border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                       {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                       <span className="text-[13px] font-bold text-white group-hover:text-primary transition-colors">{user.name}</span>
                       <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[10px] text-white/40 flex items-center gap-1"><Mail size={10} /> {user.email}</span>
                          <span className="text-[10px] text-white/40 flex items-center gap-1 font-mono"><Wallet size={10} /> {user.wallet}</span>
                       </div>
                    </div>
                 </div>

                 <div className="mt-4 lg:mt-0">
                    <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest border-white/10 text-white/60 bg-white/[0.03]">
                       {user.role}
                    </Badge>
                 </div>

                 <div className="mt-2 lg:mt-0">
                    <Badge className={cn(
                      "text-[9px] font-black uppercase px-2 py-0 h-4 rounded-full",
                      user.status === 'Active' ? "bg-green-500/10 text-green-500" :
                      user.status === 'Flagged' ? "bg-yellow-500/10 text-yellow-500" :
                      "bg-destructive/10 text-destructive"
                    )}>
                       {user.status}
                    </Badge>
                 </div>

                 <div className="flex justify-end mt-4 lg:mt-0">
                    <Button variant="ghost" size="icon" className="text-white/20 hover:text-white hover:bg-white/5">
                       <MoreVertical size={16} />
                    </Button>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  )
}
