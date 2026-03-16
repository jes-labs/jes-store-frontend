'use client'

import React from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Package } from 'lucide-react'
import { formatCurrency } from '@/lib/utils/currency'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCartStore()
  const cartItem = items.find((item) => item.productId === product.id)
  const quantity = cartItem?.quantity || 0

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, 1)
  }

  const isLowStock = product.stock <= (product.lowStockAlert || 5) && product.stock > 0
  const isOutOfStock = product.stock === 0

  return (
    <Card 
      className={cn(
        "group overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer relative",
        quantity > 0 && "ring-2 ring-primary border-primary/50",
        isOutOfStock && "opacity-60 grayscale-[0.5] pointer-events-none"
      )}
      onClick={handleAdd}
    >
      {quantity > 0 && (
        <Badge className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground font-bold rounded-full h-6 w-6 flex items-center justify-center p-0 shadow-lg animate-in zoom-in duration-300">
          {quantity}
        </Badge>
      )}
      
      <div className="aspect-square relative bg-muted/30 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground/20">
            <Package size={48} />
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="font-bold uppercase tracking-widest text-[10px]">Out of Stock</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-3 space-y-1.5">
        <div className="space-y-0.5">
          <h3 className="font-bold text-sm truncate leading-tight">{product.name}</h3>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{product.sku}</p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-primary tabular-nums">
              {formatCurrency(product.price, 'USDT')}
            </span>
          </div>
          
          <Button 
            size="icon" 
            variant={quantity > 0 ? "default" : "secondary"}
            className={cn(
              "h-8 w-8 rounded-xl shadow-sm transition-all duration-300",
              quantity > 0 ? "scale-110" : "group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110"
            )}
            onClick={handleAdd}
          >
            <Plus size={16} strokeWidth={3} />
          </Button>
        </div>

        {isLowStock && !isOutOfStock && (
          <p className="text-[9px] font-bold text-amber-500 uppercase tracking-tighter flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />
            Only {product.stock} left
          </p>
        )}
      </CardContent>
    </Card>
  )
}
