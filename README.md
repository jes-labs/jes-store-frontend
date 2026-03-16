# JesStore - Web3 Store Management Platform

JesStore is a modern, Web3-native store management system built for African SMEs. It combines traditional POS functionality with blockchain-based payments, providing a seamless, affordable way for small business owners to manage inventory, process sales, and accept stablecoin payments (USDC/USDT) from any EVM-compatible chain.

## Features

### Core Functionality
- **Point of Sale (POS)**: Fast, intuitive transaction interface with product search and cart management
- **Inventory Management**: Track stock levels, reorder alerts, and product pricing
- **Analytics & Reporting**: Dashboard with sales trends, top products, and business metrics
- **Receipt Generation**: Print and digital receipts with transaction details

### Payment Methods
- **Cash**: Traditional fiat payment tracking for in-person sales
- **Stablecoins**: Support for USDC and USDT from any EVM-compatible chain (Polygon, Celo, Base, Ethereum, etc.)
- **Direct Crypto**: Support for native assets like CELO, MATIC, etc.

### Web3 Integration
- Multi-chain EVM support for settlement
- Stablecoin-first architecture (USDC/USDT)
- Low-cost transaction verification
- Smart contract-ready settlement layer

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Shadcn/UI** - High-quality component library
- **React Hook Form + Zod** - Form handling with validation
- **Framer Motion** - Smooth animations
- **React Query v5** - Server state management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Node.js** - JavaScript runtime

### State Management
- **Zustand** - Lightweight global state
- **React Query** - Server state sync

### Design System
- Dark mode optimized with custom color tokens
- Brand colors: Cyan primary, Orange secondary
- Responsive mobile-first design

## Project Structure

```
/app
  /auth              # Authentication pages
    /login           # Login form
    /register        # Registration
    /forgot-password # Password reset request
    /reset-password  # Password reset confirmation
  /dashboard         # Main application
    /pos             # Point of Sale
    /inventory       # Inventory management
    /analytics       # Reports and analytics
    /settings        # Store configuration
  /api               # Backend API routes
    /auth           # Auth endpoints
    /payment        # Payment processing
    
/components
  /landing          # Landing page sections
  /dashboard        # Dashboard components
  /pos              # POS components
  /inventory        # Inventory components
  /payment          # Payment integration
  /auth             # Auth UI components
  /ui               # Shadcn components
  
/lib
  /utils            # Utility functions
  /constants        # Constants and config
  /api              # API client
  /validations      # Zod schemas
  
/store             # Zustand stores
/hooks             # Custom React hooks
/types             # TypeScript types

/public            # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd jesstore

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Create a `.env.local` file with:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Web3/Blockchain Configuration
NEXT_PUBLIC_DEFAULT_CHAIN_ID=137
NEXT_PUBLIC_SUPPORTED_CHAINS=[137, 42220, 8453]
NEXT_PUBLIC_STORE_WALLET_ADDRESS=0x...

# Database (when integrated)
DATABASE_URL=your_database_url

# Email Service (for password reset)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_password
```

## Key Pages

### Landing Page (`/`)
- Hero section with call-to-action
- Feature highlights
- How it works guide
- Pricing tiers
- Customer testimonials
- FAQ section

### Authentication (`/auth/*`)
- Login with email/password
- Business account registration
- Password recovery flow
- Secure session management

### Dashboard (`/dashboard`)
- Overview with key metrics
- Quick action buttons
- Recent sales feed

### POS (`/dashboard/pos`)
- Product search and selection
- Shopping cart with quantity controls
- Tax calculation
- Multiple payment methods
- Receipt generation

### Inventory (`/dashboard/inventory`)
- Product listing with search
- Stock level tracking
- Low stock alerts
- Add/edit/delete products
- SKU management

### Analytics (`/dashboard/analytics`)
- Sales trends (chart ready)
- Top products
- Performance metrics

### Settings (`/dashboard/settings`)
- General account settings
- Store configuration
- Payment method setup
- Multi-chain wallet configuration

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Create account
- `POST /api/auth/forgot-password` - Request reset email
- `POST /api/auth/reset-password` - Complete password reset

### Payment
- `POST /api/payment/minipay` - MiniPay webhook receiver
- `POST /api/payment/verify` - Verify blockchain transaction

## Development

### Running Tests
```bash
pnpm test
```

### Building for Production
```bash
pnpm build
pnpm start
```

### Code Quality
```bash
pnpm lint
```

## Architecture Decisions

### Why Web3?
- **Low fees**: Celo transactions are 1000x cheaper than traditional payments
- **Fast**: Block time ~5 seconds vs 2-3 days for traditional transfers
- **Accessible**: No bank account needed, works with just a phone number
- **Transparent**: All transactions recorded on immutable ledger

### Why Stablecoins?
- **Universal Access**: Accept USDC/USDT from any EVM-compatible wallet
- **Instant Settlement**: No 2-3 day waiting periods like traditional payment processors
- **Low Fees**: Utilize L2s (Polygon, Base) or high-performance L1s (Celo) for sub-cent fees
- **Global Reach**: Accept payments from customers anywhere in the world

### Zustand for State
- Lightweight alternative to Redux
- Simple, intuitive API
- Perfect for medium-complexity apps
- Great DevX

### React Query for Data
- Automatic caching and synchronization
- Built-in refetch strategies
- Simplifies server state management
- Great for real-time data

## Security Considerations

- Passwords hashed with bcrypt
- JWT tokens in HTTP-only cookies
- CSRF protection on forms
- Input validation with Zod
- API rate limiting (ready for implementation)
- No sensitive data in localStorage

## Performance Optimizations

- Server-side rendering with Next.js
- Image optimization with next/image
- Code splitting and lazy loading
- CSS-in-JS with Tailwind (optimized)
- Caching strategies with React Query
- Optimistic UI updates

## Contributing

1. Follow the code structure in this README
2. Use TypeScript for all new code
3. Add form validation with Zod schemas
4. Test payment flows thoroughly
5. Document new API endpoints


## Support

For issues, questions, or feature requests, please open an issue on GitHub or contact support@jesstore.com

## Additional Resources

- [Celo Documentation](https://docs.celo.org)
- [MiniPay Documentation](https://minipay.build)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/UI Components](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
