import { CopyButton } from './CopyButton'
import { truncateAddress } from '@/lib/utils/truncateAddress'

interface CryptoAddressBadgeProps {
  address: string
  showFull?: boolean
}

export function CryptoAddressBadge({ address, showFull = false }: CryptoAddressBadgeProps) {
  const displayAddress = showFull ? address : truncateAddress(address)

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted border border-border">
      <code className="text-xs text-muted-foreground font-mono">{displayAddress}</code>
      <CopyButton text={address} label="Copy" />
    </div>
  )
}
