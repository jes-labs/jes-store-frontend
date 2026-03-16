'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { requestMiniPayPayment, formatCeloAmount } from '@/lib/utils/minipay'
import { Smartphone } from 'lucide-react'

interface MiniPayButtonProps {
  amount: number
  onSuccess?: (transactionId: string) => void
  onError?: (error: Error) => void
}

export default function MiniPayButton({
  amount,
  onSuccess,
  onError,
}: MiniPayButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string>()

  const handlePayment = async () => {
    setIsProcessing(true)
    setStatus('processing')
    setError(undefined)

    try {
      const transaction = await requestMiniPayPayment(amount, 'cUSD', `ORDER-${Date.now()}`)

      if (transaction.status === 'completed') {
        setStatus('success')
        onSuccess?.(transaction.id)

        // Reset after 3 seconds
        setTimeout(() => {
          setStatus('idle')
          setIsProcessing(false)
        }, 3000)
      } else {
        throw new Error('Payment was not completed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed'
      setError(errorMessage)
      setStatus('error')
      onError?.(err instanceof Error ? err : new Error(errorMessage))
      setIsProcessing(false)
    }
  }

  if (status === 'success') {
    return (
      <Alert className="border-primary/20 bg-primary/5">
        <AlertDescription>
          ✓ Payment received via MiniPay
        </AlertDescription>
      </Alert>
    )
  }

  if (status === 'error') {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error || 'Payment failed'}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={isProcessing}
      className="w-full gap-2"
      variant="default"
    >
      <Smartphone className="w-4 h-4" />
      {isProcessing ? 'Processing...' : `Pay ${formatCeloAmount(amount, 'cUSD')} via MiniPay`}
    </Button>
  )
}
