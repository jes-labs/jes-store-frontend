'use client'

import React, { useState } from 'react'
import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { SearchInput } from '@/components/shared/SearchInput'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Package } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const categories = ['all', ...Array.from(new Set(products.map(p =>
    typeof p.category === 'string' ? p.category : p.category.name
  )))]

  const filteredProducts = products.filter(product => {
    const productName = product.name.toLowerCase()
    const productSku = product.sku.toLowerCase()
    const searchTerm = search.toLowerCase()
    const matchesSearch = productName.includes(searchTerm) || productSku.includes(searchTerm)

    const productCategory = typeof product.category === 'string' ? product.category : product.category.name
    const matchesCategory = category === 'all' || productCategory === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col bg-card border border-border/50 rounded-[2rem] overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-5 border-b border-border/50 bg-muted/20 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search products or SKU..."
            className="flex-1"
          />
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <Tabs value={category} onValueChange={setCategory} className="w-full">
            <TabsList className="bg-muted/30 p-1 rounded-xl inline-flex">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat as string}
                  value={cat as string}
                  className="rounded-lg px-4 py-1.5 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  {cat as string}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      <div className="p-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-1">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="h-16 w-16 bg-muted/30 rounded-3xl flex items-center justify-center text-muted-foreground">
              <Package size={32} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">No products found</h3>
              <p className="text-sm text-muted-foreground max-w-[250px]">
                Try adjusting your search or category filters to find what you're looking for.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
