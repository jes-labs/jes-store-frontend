'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Package, 
  Eye, 
  AlertTriangle,
  ArrowUpDown,
  Layers,
  Activity
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils/currency'
import { EmptyState } from '@/components/shared/EmptyState'
import { toast } from 'sonner'
import Image from 'next/image'

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  costPrice?: number
  stock: number
  lowStockThreshold: number
  active: boolean
  imageUrl?: string
  status?: 'active' | 'inactive' | 'out_of_stock' | 'draft'
}

interface ProductTableProps {
  products: Product[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const handleToggleStatus = (id: string, current: boolean) => {
    toast.success(`Product ${current ? 'deactivated' : 'activated'} successfully`)
  }

  if (products.length === 0) {
    return (
      <EmptyState 
        title="No products found"
        description="Your store catalog is empty. Start by adding your first product to begin selling."
        icon={Package}
        actionLabel="Add Product"
        actionHref="/dashboard/products/new"
      />
    )
  }

  return (
    <div className="rounded-[2rem] border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/30 border-b border-border/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px] text-[10px] font-black uppercase tracking-[0.15em] py-5">Item</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.15em]">
              <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                Product Details <ArrowUpDown className="w-3 h-3" />
              </div>
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.15em]">
              <div className="flex items-center gap-1">
                <Layers className="w-3 h-3" /> Catalog
              </div>
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.15em]">Valuation</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.15em]">Inventory</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.15em]">
               <div className="flex items-center gap-1">
                <Activity className="w-3 h-3" /> Status
              </div>
            </TableHead>
            <TableHead className="text-right text-[10px] font-black uppercase tracking-[0.15em]">Mgmt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-muted/10 transition-colors group border-b border-border/20 last:border-0">
              <TableCell className="py-4">
                <div className="relative w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center overflow-hidden border border-border/50 shadow-inner group-hover:border-primary/30 transition-colors">
                  {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <Package className="w-6 h-6 text-muted-foreground/30" />
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-destructive/60 backdrop-blur-[2px] flex items-center justify-center">
                       <span className="text-[8px] font-black text-white uppercase rotate-[-12deg]">Sold Out</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{product.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-tighter">ID: {product.sku}</span>
                    <Badge variant="outline" className="text-[8px] h-3.5 px-1 font-black bg-muted/30 border-none uppercase">USDT</Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">{product.category}</span>
                  <div className="flex gap-1">
                    <Badge className="bg-primary/5 text-primary text-[8px] font-black uppercase border-none h-4 px-1">Featured</Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-black text-sm tabular-nums text-foreground">{formatCurrency(product.price, 'USDT')}</span>
                  {product.costPrice && (
                    <span className="text-[9px] font-bold text-muted-foreground/50 uppercase">Margin: {Math.round(((product.price - product.costPrice) / product.price) * 100)}%</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-sm font-black tabular-nums font-mono",
                      product.stock <= product.lowStockThreshold ? "text-destructive" : "text-foreground"
                    )}>
                      {product.stock.toString().padStart(2, '0')}
                    </span>
                    {product.stock <= product.lowStockThreshold && product.stock > 0 && (
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive animate-pulse" />
                    )}
                  </div>
                  <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        product.stock <= product.lowStockThreshold ? "bg-destructive" : "bg-green-500"
                      )} 
                      style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }} 
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Switch 
                    checked={product.active} 
                    onCheckedChange={() => handleToggleStatus(product.id, product.active)}
                  />
                  <Badge 
                    className={cn(
                      "text-[9px] font-black uppercase tracking-[0.1em] h-5 border-none px-2",
                      product.active 
                        ? "bg-green-500/10 text-green-500 shadow-[0_0_10px_-5px_hsl(var(--green-500))]" 
                        : "bg-muted text-muted-foreground/60"
                    )}
                  >
                    {product.active ? 'Visible' : 'Hidden'}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card border-border/50 rounded-2xl shadow-2xl p-1.5 backdrop-blur-xl">
                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-2">Quick Actions</DropdownMenuLabel>
                    <DropdownMenuItem 
                      onClick={() => onEdit?.(product.id)} 
                      className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-primary/10 focus:text-primary"
                    >
                      <Edit className="w-4 h-4 mr-3 opacity-60" />
                      <span className="text-xs font-bold">Edit Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-primary/10 focus:text-primary">
                      <Eye className="w-4 h-4 mr-3 opacity-60" />
                      <span className="text-xs font-bold">View in Store</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50 my-1.5" />
                    <DropdownMenuItem 
                      onClick={() => onDelete?.(product.id)} 
                      className="text-destructive focus:text-destructive cursor-pointer rounded-xl py-2.5 px-3 focus:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-3 opacity-60" />
                      <span className="text-xs font-bold">Delete Product</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
