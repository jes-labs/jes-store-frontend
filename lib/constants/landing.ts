/**
 * JesStore Landing Page Copy
 * Centralized content for all public-facing sections
 */

export const siteConfig = {
  name: 'JesStore',
  tagline: 'The smarter way to run your store on-chain',
  description: 'Manage inventory, record sales, generate receipts, and accept USDC/USDT stablecoin payments. Built for modern African businesses.',
}

export const brands = [
  "FashionHub Lagos", 
  "TechVault Accra", 
  "StyleWave NG", 
  "GadgetCity GH", 
  "KikoMarket KE", 
  "CryptoShop SA"
]

export const features = [
  { 
    icon: 'Package',      
    title: 'Smart Inventory',       
    description: 'Track stock, get low-stock alerts, manage categories, and never oversell again.', 
    color: 'green', 
    stat: '99.9% accuracy' 
  },
  { 
    icon: 'ShoppingCart', 
    title: 'Point of Sale',          
    description: 'Sell in-person or online. Add items, apply discounts, and close sales in seconds.', 
    color: 'blue', 
    stat: '< 10s per sale' 
  },
  { 
    icon: 'Receipt',      
    title: 'Auto Receipts',          
    description: 'Every sale auto-generates a branded receipt with a shareable WhatsApp link.', 
    color: 'gold', 
    stat: 'Instant generation' 
  },
  { 
    icon: 'Users',        
    title: 'Customer CRM',           
    description: 'Track purchase history, contact details, and lifetime value per customer.', 
    color: 'green', 
    stat: '360° view' 
  },
  { 
    icon: 'BarChart3',    
    title: 'Business Analytics',     
    description: 'Real-time revenue, profit, top products, and growth trends — always live.', 
    color: 'blue', 
    stat: 'Real-time data' 
  },
  { 
    icon: 'Wallet',       
    title: 'Stablecoin Payments',    
    description: 'Accept USDC and USDT on any EVM chain. Direct wallet settlement — no bank needed.', 
    color: 'gold', 
    stat: 'Any EVM chain' 
  },
] as const

export const pricingTiers = [
  {
    name: 'Starter', 
    monthlyPrice: 0, 
    annualPrice: 0,
    description: 'For solo sellers just getting started.',
    badge: null, 
    highlighted: false,
    ctaText: 'Start for Free', 
    ctaVariant: 'outline' as const,
    features: [
      { text: '1 store', included: true },
      { text: 'Up to 50 products', included: true },
      { text: 'Basic POS', included: true },
      { text: 'Receipt generation', included: true },
      { text: 'Up to 100 customers', included: true },
      { text: 'USDC/USDT on any EVM chain', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Staff accounts', included: false },
    ],
  },
  {
    name: 'Pro', 
    monthlyPrice: 19, 
    annualPrice: 15,
    description: 'For growing stores that need more power.',
    badge: 'Most Popular', 
    highlighted: true,
    ctaText: 'Start Pro Trial', 
    ctaVariant: 'default' as const,
    features: [
      { text: '1 store', included: true },
      { text: 'Unlimited products', included: true },
      { text: 'Full POS + discount codes', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Unlimited customers', included: true },
      { text: 'Multi-chain payments', included: true },
      { text: 'WhatsApp receipt sharing', included: true },
      { text: 'Staff accounts', included: false },
    ],
  },
  {
    name: 'Growth', 
    monthlyPrice: 49, 
    annualPrice: 39,
    description: 'For businesses scaling across locations.',
    badge: null, 
    highlighted: false,
    ctaText: 'Contact Sales', 
    ctaVariant: 'outline' as const,
    features: [
      { text: 'Up to 3 stores', included: true },
      { text: 'Unlimited products', included: true },
      { text: 'Full POS + discount codes', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Unlimited customers', included: true },
      { text: 'Multi-chain payments', included: true },
      { text: 'Custom receipt branding', included: true },
      { text: 'Staff accounts + controls', included: true },
    ],
  },
] as const

export const testimonials = [
  { name: 'Amara Okonkwo',  business: 'Amara\'s Fashion, Lagos',       initials: 'AO', color: 'green', rating: 5,
    quote: 'JesStore changed how I manage my boutique. Receipts alone save me 2 hours every day.' },
  { name: 'Kwame Asante',   business: 'TechVault, Accra',              initials: 'KA', color: 'blue',  rating: 5,
    quote: 'Getting paid in USDC eliminates exchange rate stress. Perfect for my cross-border sales.' },
  { name: 'Fatima Bello',   business: 'FatimaStyle, Abuja',            initials: 'FB', color: 'gold',  rating: 5,
    quote: 'Customers trust me more because of the professional receipt links I share on WhatsApp.' },
  { name: 'Emeka Nwosu',    business: 'GadgetCity, Port Harcourt',     initials: 'EN', color: 'green', rating: 5,
    quote: 'Went from paper receipts to a full dashboard in one weekend. Genuinely that simple.' },
  { name: 'Ngozi Adeyemi',  business: 'NgoziBakes, Ibadan',            initials: 'NA', color: 'blue',  rating: 5,
    quote: 'Analytics showed my Tuesday sales are always low. I run promos on Tuesdays now — it works!' },
  { name: 'Tunde Bakare',   business: 'TundeTech, Kano',               initials: 'TB', color: 'gold',  rating: 5,
    quote: 'Accepting USDT opened up international customers. JesStore made that possible for me.' },
  { name: 'Adaeze Eze',     business: 'AdaBeauty, Enugu',              initials: 'AE', color: 'green', rating: 5,
    quote: 'The POS is blazing fast. I close 3× more sales per hour than my old manual system.' },
  { name: 'Seun Oladele',   business: 'SeunWear, Ibadan',              initials: 'SO', color: 'blue',  rating: 5,
    quote: 'Payments go directly to my wallet. No waiting for bank transfers to clear.' },
] as const

export const integrations = [
  { name: 'Ethereum',        category: 'Chain',       dotColor: '#627EEA' },
  { name: 'Polygon',         category: 'Chain',       dotColor: '#8247E5' },
  { name: 'Base',            category: 'Chain',       dotColor: '#0052FF' },
  { name: 'Arbitrum',        category: 'Chain',       dotColor: '#28A0F0' },
  { name: 'BNB Chain',       category: 'Chain',       dotColor: '#F3BA2F' },
  { name: 'Optimism',        category: 'Chain',       dotColor: '#FF0420' },
  { name: 'Avalanche',       category: 'Chain',       dotColor: '#E84142' },
  { name: 'USDC',            category: 'Stablecoin',  dotColor: '#2775CA' },
  { name: 'USDT',            category: 'Stablecoin',  dotColor: '#26A17B' },
  { name: 'MetaMask',        category: 'Wallet',      dotColor: '#F6851B' },
  { name: 'WalletConnect',   category: 'Wallet',      dotColor: '#3B99FC' },
  { name: 'Coinbase Wallet', category: 'Wallet',      dotColor: '#0052FF' },
  { name: 'Rainbow',         category: 'Wallet',      dotColor: '#8B5CF6' },
  { name: 'WhatsApp',        category: 'Sharing',     dotColor: '#25D366' },
  { name: 'Pinata',          category: 'Storage',     dotColor: '#E91E8C' },
  { name: 'IPFS',            category: 'Storage',     dotColor: '#65C2CB' },
] as const

export const faqs = [
  {
    question: 'How do I accept payments in crypto?',
    answer: 'Once you connect your wallet (MetaMask, MiniPay, etc.), JesStore automatically generates product links. When a customer adds an item, they can pay in USDT or USDC, and the funds go directly to your wallet.'
  },
  {
    question: 'Do I need a bank account?',
    answer: 'No. JesStore settles all payments directly to your non-custodial wallet. You can then use P2P platforms or exchanges to convert to local currency if needed.'
  },
  {
    question: 'Is it safe for my customers?',
    answer: 'Yes. Customers pay directly from their own wallets using industry-standard protocols. We never hold their funds — they go straight from the customer to you.'
  },
  {
    question: 'Can I use this for a physical shop?',
    answer: 'Absolutely. Our POS (Point of Sale) is built for speed. You can record sales on your phone or laptop while serving customers in-person.'
  },
  {
    question: 'How do customers get their receipts?',
    answer: 'After every sale, you can generate a professional receipt link that you can share instantly via WhatsApp, Email, or SMS.'
  },
  {
    question: 'What fees does JesStore charge?',
    answer: 'We don\'t take a cut of your sales. We charge a simple monthly subscription for the platform. The only other fees are standard blockchain gas fees paid by the customer.'
  },
  {
    question: 'Which blockchain networks do you support?',
    answer: 'We support all major EVM chains including Celo, Polygon, Base, Arbitrum, Ethereum Mainnet, and BNB Chain.'
  },
  {
    question: 'Does this work on mobile?',
    answer: 'Yes, JesStore is fully responsive and optimized for mobile screens, making it perfect for store owners on the go.'
  }
] as const
