import { useAppKitAccount, useAppKit } from '@reown/appkit/react'

/**
 * Wrapper around AppKit's account state.
 * address     — connected EVM address or undefined
 * isConnected — whether a wallet is connected
 * open        — opens the AppKit modal
 */
export function useWallet() {
  const { address, isConnected } = useAppKitAccount()
  const { open } = useAppKit()

  return {
    address: address as string | undefined,
    isConnected,
    connect: () => open({ view: 'Connect' }),
    disconnect: () => open({ view: 'Account' }),
  }
}
