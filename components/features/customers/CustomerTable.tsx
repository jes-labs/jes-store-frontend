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
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoreHorizontal, ExternalLink, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatCurrency } from '@/lib/utils/currency'
import { format } from 'date-fns'
import { EmptyState } from '@/components/shared/EmptyState'

export interface Customer {
  id: string
  name: string
  email: string
  walletAddress?: string
  totalOrders: number
  totalSpent: number
  lastPurchase: string
}

interface CustomerTableProps {
  customers: Customer[]
  onView?: (id: string) => void
}

export function CustomerTable({ customers, onView }: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <EmptyState 
        title="No customers found"
        description="Your customer base is currently empty. They will be automatically added after their first purchase."
        icon={Users}
      />
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Wallet</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Last Purchase</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} className="hover:bg-muted/20 transition-colors group">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 text-[10px] font-bold ring-1 ring-border">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{customer.name}</span>
                    <span className="text-[10px] text-muted-foreground">{customer.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {customer.walletAddress ? (
                  <code className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded border border-border/50 text-muted-foreground">
                    {customer.walletAddress.slice(0, 6)}...{customer.walletAddress.slice(-4)}
                  </code>
                ) : (
                  <span className="text-[10px] text-muted-foreground italic">No wallet</span>
                )}
              </TableCell>
              <TableCell>
                <span className="text-sm font-bold">{customer.totalOrders}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-bold tracking-tight">{formatCurrency(customer.totalSpent, 'USDT')}</span>
              </TableCell>
              <TableCell>
                <span className="text-[11px] text-muted-foreground font-medium">
                  {format(new Date(customer.lastPurchase), 'MMM d, yyyy')}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem onClick={() => onView?.(customer.id)} className="cursor-pointer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Profile
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
