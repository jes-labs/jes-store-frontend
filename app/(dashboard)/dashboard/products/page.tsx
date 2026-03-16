'use client'

import { useState, useEffect, useMemo } from 'react'
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
  Layers,
  Archive,
  Filter
} from 'lucide-react'
import { ProductTable, Product } from '@/components/features/products/ProductTable'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// Mock data - in production, fetch from API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    sku: 'IP13P-256-GR',
    category: 'Electronics',
    price: 999,
    costPrice: 750,
    stock: 15,
    lowStockThreshold: 5,
    active: true,
    imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=250&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'AirPods Pro',
    sku: 'APRO-2-WHT',
    category: 'Electronics',
    price: 249,
    costPrice: 150,
    stock: 2,
    lowStockThreshold: 5,
    active: true,
    imageUrl: 'https://images.unsplash.com/photo-1588423770674-f25994a4c21a?q=80&w=250&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'MacBook Air',
    sku: 'MBA-M2-512',
    category: 'Computers',
    price: 1199,
    costPrice: 900,
    stock: 0,
    lowStockThreshold: 2,
    active: true,
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-71ce4fe473f6?q=80&w=250&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Leather Wallet',
    sku: 'WALL-LTH-BRN',
    category: 'Accessories',
    price: 45,
    costPrice: 15,
    stock: 45,
    lowStockThreshold: 10,
    active: false,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=250&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Classic T-Shirt',
    sku: 'TSH-WHT-L',
    category: 'Apparel',
    price: 25,
    costPrice: 8,
    stock: 120,
    lowStockThreshold: 20,
    active: true,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=250&auto=format&fit=crop',
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const stats = useMemo(() => ({
    total: mockProducts.length,
    active: mockProducts.filter(p => p.active).length,
    lowStock: mockProducts.filter(p => p.stock > 0 && p.stock <= p.lowStockThreshold).length,
    outOfStock: mockProducts.filter(p => p.stock === 0).length,
  }), [])

  const filteredProducts = mockProducts.filter((product) => {
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

  return (
    <main className="space-y-8 animate-in fade-in duration-1000">
      <PageHeader
        title="Inventory"
        description="Configure your digital catalog and monitor stock levels across chains."
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
                <p className="text-2xl font-black tabular-nums">{stat.value.toString().padStart(2, '0')}</p>
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
              className="rounded-2xl h-11 bg-muted/30 border-none px-4"
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
              products={filteredProducts}
              onEdit={(id) => {
                // Handle edit
              }}
              onDelete={(id) => {
                // Handle delete
              }}
            />
          </div>
        )}
      </div>
    </main>
  )
}
