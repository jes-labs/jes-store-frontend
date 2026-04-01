'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/PageHeader'
import { SearchInput } from '@/components/shared/SearchInput'
import { TableSkeleton } from '@/components/shared/LoadingSkeletons'
import {
  Plus,
  Package,
  AlertTriangle,
  CheckCircle2,
  Archive,
  Filter
} from 'lucide-react'
import { ProductTable, Product as TableProduct } from '@/components/features/products/ProductTable'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useProducts, useDeleteProduct } from '@/hooks/useProducts'
import { Product } from '@/types/product'
import { toast } from 'sonner'
import { getApiErrorMessage } from '@/lib/utils/handleApiError'

/** Map backend Product → ProductTable's Product shape */
function toTableProduct(p: Product): TableProduct {
  return {
    id: p.id,
    name: p.name ?? (p as any).product_name ?? '',
    sku: p.sku ?? '',
    category: typeof p.category === 'string' ? p.category : (p.category as any)?.name ?? '',
    price: typeof p.price === 'string' ? parseFloat(p.price as any) : (p.price ?? 0),
    costPrice: typeof p.costPrice === 'string' ? parseFloat(p.costPrice as any) : p.costPrice,
    stock: p.stock ?? (p as any).quantity ?? 0,
    lowStockThreshold: p.lowStockAlert ?? (p as any).low_stock_alert ?? 5,
    active: p.isActive ?? (p as any).is_active ?? true,
    imageUrl: p.image ?? (p.image_cid ? `https://ipfs.io/ipfs/${p.image_cid}` : undefined),
  }
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const router = useRouter()

  const { data: products = [], isLoading } = useProducts()
  const { mutate: deleteProduct } = useDeleteProduct()

  const tableProducts = useMemo(() => products.map(toTableProduct), [products])

  const stats = useMemo(() => ({
    total: tableProducts.length,
    active: tableProducts.filter(p => p.active).length,
    lowStock: tableProducts.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold).length,
    outOfStock: tableProducts.filter(p => p.stock === 0).length,
  }), [tableProducts])

  const filtered = tableProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && product.active) ||
      (activeTab === 'low_stock' && product.stock > 0 && product.stock <= product.lowStockThreshold) ||
      (activeTab === 'out_of_stock' && product.stock === 0) ||
      (activeTab === 'inactive' && !product.active)

    return matchesSearch && matchesTab
  })

  const handleDelete = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => toast.success('Product removed'),
      onError: (err) => toast.error(getApiErrorMessage(err)),
    })
  }

  return (
    <main className="space-y-8 animate-in fade-in duration-1000">
      <PageHeader
        title="Inventory"
        description="Configure your digital catalog and monitor stock levels."
        action={
          <Link href="/dashboard/products/new">
            <Button className="gap-2 rounded-2xl h-11 px-6 shadow-xl shadow-primary/20">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </Link>
        }
      />

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: stats.total, icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Active in Store', value: stats.active, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Low Inventory', value: stats.lowStock, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Stock Out', value: stats.outOfStock, icon: Archive, color: 'text-destructive', bg: 'bg-destructive/10' },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card/30 backdrop-blur-md overflow-hidden relative group hover:border-primary/30 transition-all duration-500">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-black tabular-nums">
                  {isLoading ? (
                    <span className="inline-block h-8 w-8 bg-muted animate-pulse rounded" />
                  ) : (
                    stat.value.toString().padStart(2, '0')
                  )}
                </p>
              </div>
              <div className={cn("p-3 rounded-2xl", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        {/* Filters & Tabs */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center bg-card/30 p-4 rounded-[2rem] border border-border/50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
            <TabsList className="bg-muted/30 p-1.5 rounded-2xl gap-1">
              {[
                { id: 'all', label: 'All Catalog' },
                { id: 'active', label: 'Active' },
                { id: 'low_stock', label: 'Low Stock' },
                { id: 'out_of_stock', label: 'Sold Out' },
                { id: 'inactive', label: 'Hidden' },
              ].map(tab => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-4 w-full lg:w-96">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Filter by SKU or Name..."
              className="rounded-2xl h-full w-full bg-muted/30 border-none"
            />
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl border-border/50 bg-muted/30">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Table */}
        {isLoading ? (
          <div className="space-y-4">
            <TableSkeleton />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <ProductTable
              products={filtered}
              onEdit={(id) => router.push(`/dashboard/products/${id}`)}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </main>
  )
}
