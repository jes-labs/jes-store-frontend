'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SearchInput } from '@/components/shared/SearchInput'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data
const mockOrders: any[] = [
  {
    id: '1',
    orderRef: 'ORD-20260315-001',
    customerName: 'John Doe',
    date: new Date().toISOString(),
    items: 3,
    total: 125.5,
    paymentMethod: 'MiniPay (USDC)',
    status: 'completed' as const,
  },
  {
    id: '2',
    orderRef: 'ORD-20260315-002',
    customerName: 'Jane Smith',
    date: new Date(Date.now() - 86400000).toISOString(),
    items: 1,
    total: 50.0,
    paymentMethod: 'Cash',
    status: 'paid' as const,
  },
  {
    id: '3',
    orderRef: 'ORD-20260315-003',
    customerName: 'Mike Johnson',
    date: new Date(Date.now() - 172800000).toISOString(),
    items: 5,
    total: 250.75,
    paymentMethod: 'Bank Transfer',
    status: 'pending' as const,
  },
]

import { useEffect } from 'react'
import { TableSkeleton } from '@/components/shared/LoadingSkeletons'
import { OrderTable } from '@/components/features/orders/OrderTable'

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = status === 'all' || order.status === status

    return matchesSearch && matchesStatus
  })

  return (
    <main className="space-y-8 animate-in fade-in duration-700">
      <PageHeader
        title="Orders"
        description="View and manage all sales orders"
      />

      {/* Filters */}
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
            <TabsTrigger value="paid" className="rounded-lg px-6 font-bold uppercase text-[10px] tracking-widest">Paid</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg px-6 font-bold uppercase text-[10px] tracking-widest">Completed</TabsTrigger>
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
