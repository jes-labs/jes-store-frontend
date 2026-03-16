import { Spinner } from '@/components/ui/spinner'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

export function LoadingSpinner({ size = 'md', message = 'Loading...' }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Spinner className={sizeMap[size]} />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}
