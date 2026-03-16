'use client'

import React from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { ProductGrid } from '@/components/features/pos/ProductGrid'
import { CartPanel } from '@/components/features/pos/CartPanel'
import { ReceiptModal } from '@/components/features/pos/ReceiptModal'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ShoppingBag, LayoutGrid } from 'lucide-react'

// Mock products for development
const mockProducts = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    sku: 'IP13P-256-GR',
    price: 999.0,
    category: 'Electronics',
    stock: 12,
    images: ['https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 5,
    status: 'active' as const,
    isActive: true
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    sku: 'MBA-M2-512-SL',
    price: 1199.0,
    category: 'Electronics',
    stock: 3,
    images: ['https://images.unsplash.com/photo-1611186871348-71ce4fe473f6?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 5,
    status: 'active' as const,
    isActive: true
  },
  {
    id: '3',
    name: 'Nike Air Max 270',
    sku: 'NIKE-AM270-BLK',
    price: 150.0,
    category: 'Footwear',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 10,
    status: 'active' as const,
    isActive: true
  },
  {
    id: '4',
    name: 'Classic White T-Shirt',
    sku: 'TSHIRT-WHT-L',
    price: 25.0,
    category: 'Apparel',
    stock: 0,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 20,
    status: 'active' as const,
    isActive: true
  },
  {
    id: '5',
    name: 'Leather Wallet',
    sku: 'WALL-LTH-BRW',
    price: 45.0,
    category: 'Accessories',
    stock: 8,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 3,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '6',
    name: 'Sony WH-1000XM4',
    sku: 'SONY-XM4-BLK',
    price: 349.99,
    category: 'Electronics',
    stock: 15,
    images: ['https://images.unsplash.com/photo-1613531390499-199f19323df0?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 5,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '7',
    name: 'Denim Jacket',
    sku: 'DEN-JKT-BLUE',
    price: 89.0,
    category: 'Apparel',
    stock: 20,
    images: ['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 5,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '8',
    name: 'Mechanical Keyboard',
    sku: 'KBD-MECH-RGB',
    price: 129.0,
    category: 'Electronics',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 2,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '9',
    name: 'Cotton Polo Shirt',
    sku: 'POLO-CTN-NAV',
    price: 35.0,
    category: 'Apparel',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 10,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '10',
    name: 'Smart Watch Series 7',
    sku: 'SW-S7-BLK',
    price: 399.0,
    category: 'Electronics',
    stock: 7,
    images: ['https://images.unsplash.com/photo-1544117518-30df578096a4?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 3,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '11',
    name: 'Canvas Backpack',
    sku: 'BPK-CVS-GRY',
    price: 65.0,
    category: 'Accessories',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 5,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '12',
    name: 'Runners Mesh Shoes',
    sku: 'SHOE-RUN-WHT',
    price: 110.0,
    category: 'Footwear',
    stock: 18,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 5,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '13',
    name: 'Leather Belt',
    sku: 'BELT-LTH-BLK',
    price: 35.0,
    category: 'Accessories',
    stock: 12,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 5,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '14',
    name: 'Wireless Mouse',
    sku: 'MSE-WLS-GRY',
    price: 49.0,
    category: 'Electronics',
    stock: 8,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 3,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '15',
    name: 'Graphic Hoodie',
    sku: 'HD-GRP-BLK',
    price: 55.0,
    category: 'Apparel',
    stock: 15,
    images: ['https://images.unsplash.com/photo-1556821810-df1b51447639?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 5,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '16',
    name: 'Sun Glasses',
    sku: 'SUN-GLS-GLD',
    price: 125.0,
    category: 'Accessories',
    stock: 5,
    images: ['https://images.unsplash.com/photo-1511499767350-a1590fdb7301?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 2,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '17',
    name: 'Portable SSD 1TB',
    sku: 'SSD-1TB-GRY',
    price: 159.0,
    category: 'Electronics',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1597740985671-2a8a3b80f01b?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 3,
    status: 'active' as const,
    isActive: true,
  },
  {
    id: '18',
    name: 'Silk Scarf',
    sku: 'SCRF-SLK-RED',
    price: 30.0,
    category: 'Accessories',
    stock: 20,
    images: ['https://images.unsplash.com/photo-1582298538104-e220bdf5a92a?q=80&w=250&auto=format&fit=crop'],
    lowStockAlert: 5,
    status: 'active' as const,
    isActive: true,
  }
].map(p => ({
  ...p,
  storeId: (p as any).storeId || 'store-1',
  categoryId: (p as any).categoryId || 'cat-1',
  createdAt: (p as any).createdAt || new Date().toISOString(),
  updatedAt: (p as any).updatedAt || new Date().toISOString(),
  category: p.category as any
})) as any

export default function PosPage() {
  const { items, total, customerName, paymentMethod, clear } = useCartStore()
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState<any>(null)

  const handleCompleteSale = () => {
    const orderData = {
      id: Math.random().toString(36).substr(2, 9),
      reference: `RCP-${new Date().getTime().toString().substr(-6)}`,
      customerName,
      total: total(),
      paymentMethod,
      date: new Date().toISOString(),
      items: items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }))
    }
    
    setLastOrder(orderData)
    setIsReceiptOpen(true)
    clear()
  }

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-1000 pb-20">
      {/* Sticky Premium Header */}
      <div className="sticky top-0 z-40 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50 transition-all duration-300">
        <div className="flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <PageHeader 
            title="Terminal POS" 
            description="In-person sales terminal."
          />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-2xl h-12 px-6 bg-primary text-black font-black uppercase tracking-[0.2em] text-[10px] gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all">
                terminal POS
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <Badge variant="secondary" className="bg-black/10 border-none font-mono font-black ml-1 text-[8px] h-4">
                  {items.length}
                </Badge>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-[#080808] border-l border-white/5 p-0 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col">
              <SheetHeader className="sr-only">
                <SheetTitle>Active Order Terminal</SheetTitle>
              </SheetHeader>
              <CartPanel onComplete={handleCompleteSale} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full">
        {/* Product Selection Area - No longer min-h-0 or flex-col forced */}
        <ProductGrid products={mockProducts} />
      </div>

      {lastOrder && (
        <ReceiptModal 
          isOpen={isReceiptOpen} 
          onClose={() => setIsReceiptOpen(false)} 
          order={lastOrder} 
        />
      )}
    </div>
  )
}
