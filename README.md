# JesStore - Web3 Store Management Platform

JesStore is a modern, Web3-native store management system built for African SMEs. It combines traditional POS functionality with blockchain-based payments via Celo's MiniPay, providing a seamless, affordable way for small business owners to manage inventory, process sales, and accept crypto payments.

## Features

### Core Functionality
- **Point of Sale (POS)**: Fast, intuitive transaction interface with product search and cart management
- **Inventory Management**: Track stock levels, reorder alerts, and product pricing
- **Analytics & Reporting**: Dashboard with sales trends, top products, and business metrics
- **Receipt Generation**: Print and digital receipts with transaction details

### Payment Methods
- **Cash**: Traditional payment tracking
- **Card**: Credit/debit card processing (extensible)
- **MiniPay**: Celo blockchain payments via phone number - no account needed
- **Crypto**: Direct Celo (CELO) and Celo Dollar (cUSD) payments

### Web3 Integration
- Built on Celo blockchain for fast, low-cost transactions
- MiniPay integration for accessible mobile payments
- Crypto wallet support for store receivables
- Smart contract-ready architecture

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

# Celo/MiniPay Configuration
NEXT_PUBLIC_MINIPAY_APP_ID=your_app_id
NEXT_PUBLIC_CELO_NETWORK=testnet
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
- MiniPay/Celo wallet config

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

## TODO - Next Steps for Implementation

### Backend Integration
- [ ] Connect to database (PostgreSQL/MongoDB)
- [ ] Implement user authentication with JWT
- [ ] Create product and order models
- [ ] Set up payment processing

### Celo/MiniPay
- [ ] Integrate ContractKit for blockchain interaction
- [ ] Set up Celo wallet management
- [ ] Implement transaction verification
- [ ] Configure webhook receivers

### Features
- [ ] Receipt printing functionality
- [ ] Email notifications
- [ ] Multi-currency support
- [ ] Advanced analytics and reports
- [ ] Bulk inventory import/export
- [ ] Staff management and permissions

### Testing
- [ ] Unit tests for utilities
- [ ] Integration tests for API
- [ ] E2E tests for critical flows
- [ ] Payment transaction testing

## Architecture Decisions

### Why Web3?
- **Low fees**: Celo transactions are 1000x cheaper than traditional payments
- **Fast**: Block time ~5 seconds vs 2-3 days for traditional transfers
- **Accessible**: No bank account needed, works with just a phone number
- **Transparent**: All transactions recorded on immutable ledger

### Why MiniPay?
- **Familiar UX**: Uses phone numbers instead of wallet addresses
- **Mobile-first**: Optimized for smartphones in emerging markets
- **No downloads**: Works directly in Safari/Chrome
- **Single click**: Seamless payment experience

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

## License

[Your License Here]

## Support

For issues, questions, or feature requests, please open an issue on GitHub or contact support@jesstore.com

## Additional Resources

- [Celo Documentation](https://docs.celo.org)
- [MiniPay Documentation](https://minipay.build)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/UI Components](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
