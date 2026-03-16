'use client'

import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  Package, 
  Wallet, 
  ArrowUpRight, 
  TrendingUp, 
  MapPin, 
  Search,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * DashboardMockup
 * High-fidelity admin dashboard visualization for JesStore
 */
export default function DashboardMockup() {
  return (
    <div className="w-full h-full bg-[#050505] rounded-xl overflow-hidden flex shadow-inner">
      {/* Sidebar Mockup */}
      <div className="hidden sm:flex flex-col w-56 border-r border-white/5 bg-[#0A0A0A] p-4 gap-6">
        <div className="flex items-center gap-2 px-2">
           <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-[10px] font-black text-black">J</div>
           <span className="text-xs font-bold text-white tracking-tight uppercase">Admin Console</span>
        </div>

        <nav className="flex-1 space-y-1">
           <SidebarItem icon={LayoutDashboard} label="Overview" active />
           <SidebarItem icon={Users} label="Merchants" />
           <SidebarItem icon={Package} label="All Products" />
           <SidebarItem icon={Wallet} label="Settlements" />
           <SidebarItem icon={MapPin} label="Geographics" />
           <SidebarItem icon={BarChart3} label="Global Stats" />
        </nav>

        <div className="space-y-1 border-t border-white/5 pt-4">
           <SidebarItem icon={Settings} label="Settings" />
           <SidebarItem icon={LogOut} label="Log Out" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
         {/* Top Header */}
         <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#080808]">
            <div className="flex items-center gap-4 flex-1">
               <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <div className="w-full h-8 bg-white/5 rounded-lg border border-white/10 hidden md:block" />
               </div>
            </div>
            <div className="flex items-center gap-4">
               <Bell className="w-4 h-4 text-muted-foreground" />
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 border border-white/10" />
            </div>
         </header>

         {/* Dashboard Content */}
         <div className="flex-1 p-6 space-y-6 overflow-hidden">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <StatCard 
                 label="Total Merchants" 
                 value="1,428" 
                 trend="+12%" 
                 icon={Users}
                 color="text-primary"
               />
               <StatCard 
                 label="Global Revenue" 
                 value="$2.4M" 
                 trend="+24%" 
                 icon={TrendingUp}
                 color="text-secondary"
               />
               <StatCard 
                 label="On-Chain Stores" 
                 value="8,912" 
                 trend="+8%" 
                 icon={Package}
                 color="text-orange-400"
               />
            </div>

            {/* Main Visual: Chart & Geo Data */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
               {/* Sales Graph Mockup */}
               <div className="xl:col-span-2 glass-card p-4 sm:p-6 rounded-2xl border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-[10px] sm:text-sm font-bold text-white uppercase tracking-widest">Growth Analytics</h3>
                     <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                     </div>
                  </div>
                  <div className="h-24 sm:h-32 flex items-end gap-1 sm:gap-2 px-1 sm:px-2">
                     {[40, 60, 45, 90, 75, 55, 100, 80, 65, 85].map((h, i) => (
                       <motion.div 
                         key={i}
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         transition={{ delay: 0.1 * i, duration: 1 }}
                         className="flex-1 bg-gradient-to-t from-primary/40 to-primary/5 rounded-t-sm" 
                       />
                     ))}
                  </div>
               </div>

               {/* Geo Distribution Mockup */}
               <div className="glass-card p-4 sm:p-6 rounded-2xl border-white/5 space-y-4">
                  <h3 className="text-[10px] sm:text-sm font-bold text-white uppercase tracking-widest">Top Locations</h3>
                  <div className="space-y-4 pt-2">
                     <GeoItem city="Lagos, NG" percentage={45} color="bg-primary" />
                     <GeoItem city="Accra, GH" percentage={28} color="bg-secondary" />
                     <GeoItem city="Nairobi, KE" percentage={15} color="bg-orange-400" />
                  </div>
               </div>
            </div>

            {/* Recent Activity Table Mockup */}
            <div className="glass-card rounded-2xl border-white/5 overflow-hidden">
               <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Real-time Settlement Hub</h3>
               </div>
               <div className="p-4 space-y-3">
                  <ActivityRow store="FashionHub" amount="1,240 USDC" network="Polygon" status="Cleared" />
                  <ActivityRow store="TechVault" amount="840 USDT" network="Base" status="Pending" />
                  <ActivityRow store="StyleWave" amount="2,100 USDC" network="Optimism" status="Cleared" />
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon: Icon, label, active = false }: any) {
  return (
    <div className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer",
      active ? "bg-primary/10 text-primary border border-primary/5 shadow-inner" : "text-muted-foreground hover:text-white hover:bg-white/5"
    )}>
       <Icon className="w-4 h-4" />
       {label}
    </div>
  )
}

function StatCard({ label, value, trend, icon: Icon, color }: any) {
  return (
    <div className="glass-card p-5 rounded-2xl border-white/5 space-y-2">
       <div className="flex items-center justify-between">
          <Icon className={cn("w-4 h-4", color)} />
          <span className="text-[10px] text-primary font-bold">{trend}</span>
       </div>
       <div className="space-y-0.5">
          <div className="text-xl font-heading font-bold text-white">{value}</div>
          <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">{label}</div>
       </div>
    </div>
  )
}

function GeoItem({ city, percentage, color }: any) {
  return (
    <div className="space-y-1.5">
       <div className="flex justify-between text-[10px] font-bold text-white">
          <span>{city}</span>
          <span>{percentage}%</span>
       </div>
       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={cn("h-full rounded-full", color)} 
          />
       </div>
    </div>
  )
}

function ActivityRow({ store, amount, network, status }: any) {
  return (
    <div className="flex items-center justify-between text-[10px] py-1.5 border-b border-white/[0.02] last:border-0 group/row">
       <div className="flex items-center gap-3 w-1/3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          <span className="font-bold text-white uppercase tracking-tight truncate">{store}</span>
       </div>
       <span className="font-mono text-muted-foreground w-1/4 text-center">{amount}</span>
       <span className="hidden sm:inline-block bg-white/5 px-2 py-0.5 rounded text-white/40 truncate">{network}</span>
       <span className={cn(
         "px-2 py-0.5 rounded font-bold uppercase tracking-[0.1em] text-center",
         status === "Cleared" ? "text-primary bg-primary/5" : "text-amber-400 bg-amber-400/5"
       )}>{status}</span>
    </div>
  )
}
