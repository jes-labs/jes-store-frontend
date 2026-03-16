'use client'

import React from 'react'
import Image from 'next/image'
import { CartItem as CartItemType, useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Package } from 'lucide-react'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="flex gap-4 group bg-white/[0.02] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 animate-in slide-in-from-right-4">
      <div className="w-20 h-24 rounded-xl bg-muted/10 overflow-hidden relative shrink-0 border border-white/5 shadow-inner">
        {item.product.images?.[0] ? (
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white/10">
            <Package size={24} />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-black text-white line-clamp-1 group-hover:text-primary transition-colors">{item.product.name}</h4>
            <span className="text-sm font-black text-primary ml-2">${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-white/20 tracking-widest">
              {typeof item.product.category === 'string' ? item.product.category : item.product.category.name}
            </span>
            <span className="text-[9px] font-mono text-white/10">#{item.product.sku}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center bg-black/40 rounded-xl overflow-hidden border border-white/10 h-9 p-0.5">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-lg hover:bg-white/5 text-white/40 hover:text-white"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            >
              <Minus size={12} />
            </Button>
            <span className="px-3 text-xs font-mono font-black text-white min-w-[2.5rem] text-center">
              {item.quantity}
            </span>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-lg hover:bg-white/5 text-white/40 hover:text-white"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            >
              <Plus size={12} />
            </Button>
          </div>
          
          <button 
            onClick={() => removeItem(item.productId)}
            className="text-[10px] font-black text-destructive/40 hover:text-destructive uppercase tracking-[0.2em] px-2 py-1 rounded-lg hover:bg-destructive/5 transition-all"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
