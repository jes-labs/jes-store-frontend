'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard, DollarSign, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaymentMethodSelectProps {
  value: 'cash' | 'card' | 'minipay'
  onChange: (method: 'cash' | 'card' | 'minipay') => void
}

const methods = [
  {
    id: 'cash',
    name: 'Cash',
    icon: DollarSign,
    description: 'Pay with physical cash',
  },
  {
    id: 'card',
    name: 'Card',
    icon: CreditCard,
    description: 'Credit/Debit card payment',
  },
  {
    id: 'minipay',
    name: 'MiniPay',
    icon: Smartphone,
    description: 'Celo blockchain payment',
  },
]

export default function PaymentMethodSelect({
  value,
  onChange,
}: PaymentMethodSelectProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Select Payment Method</label>
      <div className="grid grid-cols-3 gap-3">
        {methods.map((method) => {
          const Icon = method.icon
          const isSelected = value === method.id

          return (
            <Button
              key={method.id}
              variant={isSelected ? 'default' : 'outline'}
              className={cn(
                'flex flex-col items-center justify-center h-24 gap-2',
                isSelected && 'ring-2 ring-primary'
              )}
              onClick={() => onChange(method.id as 'cash' | 'card' | 'minipay')}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium text-center">{method.name}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
