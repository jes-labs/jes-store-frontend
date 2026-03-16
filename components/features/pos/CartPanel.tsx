'use client'

import React, { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { CartItem } from './CartItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  PackageSearch, 
  Trash2, 
  User, 
  Percent, 
  CreditCard, 
  Banknote, 
  Coins,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowRight,
  TrendingUp
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils/currency'
import { cn } from '@/lib/utils'

interface CartPanelProps {
  onComplete?: () => void
}

export function CartPanel({ onComplete }: CartPanelProps) {
  const { 
    items, 
    clear, 
    subtotal, 
    total, 
    itemCount, 
    discountType, 
    discountValue, 
    setDiscount,
    paymentMethod,
    setPaymentMethod,
    customerName,
    setCustomer,
    getDiscountAmount
  } = useCartStore()

  const [showDiscount, setShowDiscount] = useState(false)
  const [showCustomer, setShowCustomer] = useState(false)

  const handleCompleteSale = () => {
    if (onComplete) {
      onComplete()
    }
    console.log('Sale completed')
  }

  const paymentMethods = [
    { id: 'cash', label: 'Cash', icon: Banknote },
    { id: 'bank_transfer', label: 'Transfer', icon: CreditCard },
    { id: 'crypto', label: 'Crypto', icon: Coins },
  ]

  return (
    <div className="flex flex-col h-full bg-[#080808] text-white overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      {/* Terminal Header */}
      <div className="p-8 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-heading font-black uppercase tracking-tighter">Terminal Order</h2>
           </div>
           <Badge className="bg-primary text-black font-black px-3 py-1 rounded-full text-[10px]">
              {itemCount()} items
           </Badge>
        </div>
        <div className="flex gap-1">
           <div className="h-1 flex-1 rounded-full bg-primary" />
           <div className="h-1 flex-1 rounded-full bg-white/10" />
           <div className="h-1 flex-1 rounded-full bg-white/10" />
        </div>
        
        <div className="absolute top-8 right-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clear}
            className="h-10 w-10 rounded-xl text-white/30 hover:text-destructive hover:bg-destructive/10 transition-all"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {items.length > 0 ? (
          <div className="space-y-3 pb-4">
            {items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-white/20 space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center">
               <PackageSearch size={32} strokeWidth={1} />
            </div>
            <div className="text-center space-y-1">
               <p className="text-sm font-bold text-white/50 font-heading tracking-tight uppercase">Order is empty</p>
               <p className="text-[10px] text-white/20 max-w-[150px]">Select items from the terminal to begin billing.</p>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {/* Customer Section */}
          <div className="space-y-2">
            <button 
              onClick={() => setShowCustomer(!showCustomer)}
              className="flex items-center justify-between w-full p-3 rounded-2xl bg-muted/20 border border-border/30 hover:bg-muted/30 transition-all"
            >
              <div className="flex items-center gap-2">
                <User size={16} className="text-muted-foreground" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {customerName || 'Add Customer'}
                </span>
              </div>
              {showCustomer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showCustomer && (
              <div className="p-1 space-y-2 animate-in slide-in-from-top-2 duration-300">
                <Input 
                  placeholder="Customer name..." 
                  value={customerName}
                  onChange={(e) => setCustomer(e.target.value, '')}
                  className="bg-muted/30 border-transparent h-9 text-sm rounded-xl focus:bg-background transition-all"
                />
              </div>
            )}
          </div>

          {/* Discount Section */}
          <div className="space-y-2">
            <button 
              onClick={() => setShowDiscount(!showDiscount)}
              className="flex items-center justify-between w-full p-3 rounded-2xl bg-muted/20 border border-border/30 hover:bg-muted/30 transition-all"
            >
              <div className="flex items-center gap-2">
                <Percent size={16} className="text-muted-foreground" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {discountValue > 0 ? `Discount: ${discountValue}${discountType === 'percentage' ? '%' : ' USDT'}` : 'Apply Discount'}
                </span>
              </div>
              {showDiscount ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showDiscount && (
              <div className="p-1 space-y-3 animate-in slide-in-from-top-2 duration-300">
                <div className="flex gap-2">
                  <Button 
                    variant={discountType === 'fixed' ? 'default' : 'secondary'}
                    size="sm"
                    className="flex-1 rounded-lg font-bold text-[10px] uppercase tracking-wider h-8"
                    onClick={() => setDiscount('fixed', discountValue)}
                  >
                    Fixed
                  </Button>
                  <Button 
                    variant={discountType === 'percentage' ? 'default' : 'secondary'}
                    size="sm"
                    className="flex-1 rounded-lg font-bold text-[10px] uppercase tracking-wider h-8"
                    onClick={() => setDiscount('percentage', discountValue)}
                  >
                    Percent
                  </Button>
                </div>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  value={discountValue || ''}
                  onChange={(e) => setDiscount(discountType, parseFloat(e.target.value) || 0)}
                  className="bg-muted/30 border-transparent h-9 text-sm rounded-xl focus:bg-background transition-all font-mono"
                />
              </div>
            )}
          </div>

          <Separator className="bg-border/50" />

          {/* Payment Method Section */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Payment Method</h3>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                const isActive = paymentMethod === method.id
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border transition-all duration-300",
                      isActive 
                        ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_-5px_hsl(var(--primary))]" 
                        : "bg-muted/20 border-border/30 text-muted-foreground hover:bg-muted/30 hover:border-border"
                    )}
                  >
                    <Icon size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{method.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-8 border-t border-white/5 bg-white/[0.02] space-y-8">
        <div className="space-y-4">
           <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Total Value</span>
              <div className="flex flex-col items-end">
                 <span className="text-4xl font-black font-display text-white tracking-tighter leading-none">
                    <span className="text-primary text-2xl mr-1">$</span>
                    {total().toFixed(2)}
                 </span>
                 {discountValue > 0 && (
                   <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">
                      Discount Applied: -{formatCurrency(getDiscountAmount(), 'USDT')}
                   </span>
                 )}
              </div>
           </div>
           
           <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                 <TrendingUp className="w-3.5 h-3.5 text-primary" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Settlement Layer</span>
              </div>
              <span className="text-xs font-bold text-primary italic lowercase">~ {paymentMethod.replace('_', ' ')}</span>
           </div>
        </div>

        <Button 
          className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-black font-black text-lg shadow-[0_0_50px_rgba(var(--primary),0.3)] group transition-all"
          disabled={items.length === 0}
          onClick={handleCompleteSale}
        >
          FINALIZE BILL
          <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
