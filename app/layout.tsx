import type React from "react"
import type { Metadata, Viewport } from "next"
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import ReactQueryProvider from "@/components/providers/ReactQueryProvider"
import AppKitProvider from "@/components/providers/AppKitProvider"
import { Toaster } from "@/components/ui/sonner"

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
})

const fontBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://jesstore.vercel.app'),
  title: {
    default: "JesStore - Web3 Store Management for African SMEs",
    template: "%s | JesStore"
  },
  description: "The smarter way to run your store on-chain. Inventory, POS, crypto payments (USDC/USDT), and receipt generation - all in one platform.",
  keywords: ["Web3", "POS", "Africa", "SME", "USDC", "USDT", "Stablecoin", "Store Management"],
  authors: [{ name: "JesStore Team" }],
  creator: "JesStore",
  icons: {
    icon: "/store.png",
    apple: "/store.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jesstore.vercel.app",
    title: "JesStore - Web3 Store Management for African SMEs",
    description: "Empowering African merchants with decentralized commerce tools. Instant settlements, zero commission, global reach.",
    siteName: "JesStore",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "JesStore Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JesStore - Web3 Store Management for African SMEs",
    description: "The decentralized OS for the next billion merchants.",
    images: ["/thumbnail.png"],
    creator: "@jesstore",
  },
}

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${fontHeading.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <AppKitProvider>
          <ReactQueryProvider>
            {children}
            <Toaster richColors closeButton position="bottom-right" />
          </ReactQueryProvider>
        </AppKitProvider>
      </body>
    </html>
  )
}
