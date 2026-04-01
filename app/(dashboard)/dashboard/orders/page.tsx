'use client'

import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SearchInput } from '@/components/shared/SearchInput'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TableSkeleton } from '@/components/shared/LoadingSkeletons'
import { OrderTable } from '@/components/features/orders/OrderTable'
import { useOrders } from '@/hooks/useOrders'

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [status, setStatus] = useState('all')

  const { data: orders = [], isLoading } = useOrders()

  // Map backend snake_case fields → OrderTable shape
  const mappedOrders = useMemo(() => orders.map((o: any) => ({
    id: o.id,
    orderRef: o.order_ref ?? o.orderRef ?? o.id,
    customerName: o.customer_name ?? o.customerName ?? o.customer_id ?? '—',
    items: o.items?.length ?? o.item_count ?? o.items ?? 0,
    total: typeof o.total_amount === 'string' ? parseFloat(o.total_amount) : (o.total_amount ?? o.total ?? 0),
    paymentMethod: o.payment_method ?? o.paymentMethod ?? '',
    status: o.status ?? 'pending',
    date: o.created_at ?? o.createdAt ?? o.date ?? '',
    chain: o.chain ?? undefined,
  })), [orders])

  const filteredOrders = useMemo(() => {
    return mappedOrders.filter((order) => {
      const matchesSearch =
        order.orderRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = status === 'all' || order.status === status
      return matchesSearch && matchesStatus
    })
  }, [mappedOrders, searchQuery, status])

  return (
    <main className="space-y-8 animate-in fade-in duration-700">
      <PageHeader
        title="Orders"
        description="View and manage all sales orders"
      />

      <div className="space-y-4">
        <div className="max-w-md">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by order # or customer..."
          />
        </div>

        <Tabs value={status} onValueChange={setStatus} defaultValue="all">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg px-6 font-bold uppercase text-[10px] tracking-widest">All Orders</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-lg px-6 font-bold uppercase text-[10px] tracking-widest">Pending</TabsTrigger>
            <TabsTrigger value="confirmed" className="rounded-lg px-6 font-bold uppercase text-[10px] tracking-widest">Confirmed</TabsTrigger>
            <TabsTrigger value="delivered" className="rounded-lg px-6 font-bold uppercase text-[10px] tracking-widest">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled" className="rounded-lg px-6 font-bold uppercase text-[10px] tracking-widest">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={status} className="mt-6">
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <OrderTable orders={filteredOrders} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
