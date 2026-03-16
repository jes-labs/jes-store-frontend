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
import { MoreHorizontal, Eye, FileText, ShoppingCart } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils/currency'
import { format } from 'date-fns'
import { EmptyState } from '@/components/shared/EmptyState'

export interface Order {
  id: string
  orderRef: string
  customerName: string
  items: number
  total: number
  paymentMethod: string
  status: 'paid' | 'pending' | 'cancelled'
  date: string
  chain?: string
}

interface OrderTableProps {
  orders: Order[]
  onView?: (id: string) => void
}

export function OrderTable({ orders, onView }: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <EmptyState 
        title="No orders yet"
        description="When customers purchase from your store, their orders will appear here for management."
        icon={ShoppingCart}
        actionLabel="Record Sale"
        actionHref="/dashboard/pos"
      />
    )
  }

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-500 border-none hover:bg-green-500/20'
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-none hover:bg-amber-500/20'
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-none hover:bg-destructive/20'
      default:
        return 'bg-muted text-muted-foreground border-none'
    }
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-muted/20 transition-colors group">
              <TableCell>
                <span className="font-mono text-[11px] font-bold text-green-500 tracking-tight">
                  {order.orderRef}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-medium text-sm">{order.customerName}</span>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[10px] font-bold h-5 px-1.5 rounded-md">
                  {order.items} {order.items === 1 ? 'item' : 'items'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-tight">{formatCurrency(order.total, 'USDT')}</span>
                  {order.chain && (
                    <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">{order.chain}</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={cn("text-[10px] font-bold uppercase tracking-wider h-5", getStatusStyle(order.status))}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-[11px] text-muted-foreground font-medium">
                  {format(new Date(order.date), 'MMM d, yyyy')}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => onView?.(order.id)} className="cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Receipt
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
