'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, polygon, celo } from '@reown/appkit/networks'

const projectId = process.env.NEXT_PUBLIC_APP_KIT_APP_ID!

const metadata = {
  name: 'JesStore',
  description: 'Web3 Store Management for African SMEs',
  url: 'https://jesstore.vercel.app',
  icons: ['/store.png'],
}

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [celo, polygon, mainnet],
  defaultNetwork: celo,
  projectId,
  metadata,
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': 'hsl(var(--primary))',
    '--w3m-border-radius-master': '12px',
  },
})

export default function AppKitProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
