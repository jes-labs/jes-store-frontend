'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/PageHeader'
import { ArrowLeft, Download, Printer, Share2 } from 'lucide-react'

export default function ReceiptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  // In production, fetch receipt from API
  const receipt = {
    id: id,
    number: 'RCP-20260315-00001',
    date: new Date(),
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    items: [
      { id: 1, name: 'Product 1', qty: 2, price: 25.0, total: 50.0 },
      { id: 2, name: 'Product 2', qty: 1, price: 50.0, total: 50.0 },
      { id: 3, name: 'Product 3', qty: 1, price: 25.5, total: 25.5 },
    ],
    subtotal: 125.5,
    tax: 0,
    discount: 0,
    total: 125.5,
    paymentMethod: 'MiniPay (USDC)',
    txHash: '0x1234567890abcdef',
  }

  return (
    <main className="space-y-8">
      <PageHeader
        title={receipt.number}
        action={
          <Link href="/dashboard/receipts">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      {/* Receipt Document */}
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-12 print:border-0 print:p-0">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-2">JesStore</div>
          <div className="text-muted-foreground">Receipt</div>
        </div>

        {/* Receipt Details */}
        <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
          <div>
            <div className="text-muted-foreground">Receipt Number</div>
            <div className="font-mono font-semibold mt-1">{receipt.number}</div>
          </div>
          <div className="text-right">
            <div className="text-muted-foreground">Date</div>
            <div className="font-semibold mt-1">{receipt.date.toLocaleDateString()}</div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="text-sm">
            <div className="font-semibold">{receipt.customer.name}</div>
            <div className="text-muted-foreground">{receipt.customer.email}</div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8 border-y border-border py-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2">Item</th>
                <th className="text-right py-2">Qty</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {receipt.items.map((item) => (
                <tr key={item.id} className="border-b border-muted">
                  <td className="py-3">{item.name}</td>
                  <td className="text-right">{item.qty}</td>
                  <td className="text-right">${item.price.toFixed(2)}</td>
                  <td className="text-right">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="space-y-2 mb-8 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${receipt.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>${receipt.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold border-t border-border pt-2 mt-2">
            <span>Total</span>
            <span>${receipt.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-muted/50 p-4 rounded text-sm mb-8">
          <div className="text-muted-foreground mb-2">Payment Method</div>
          <div className="font-mono">{receipt.paymentMethod} • {receipt.txHash}</div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border">
          <p>Powered by JesStore</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center print:hidden max-w-2xl mx-auto">
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.print()}
          className="gap-2"
        >
          <Printer className="w-4 h-4" />
          Print
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share on WhatsApp
        </Button>
      </div>
    </main>
  )
}
