# JesStore Full Build - Comprehensive TODO

## Phase 1: Foundation & Architecture
- [ ] **1.1** Create complete folder structure (no `src/` folder)
  - [ ] types/ with all domain models
  - [ ] lib/api/, lib/utils/, lib/validations/, lib/constants/
  - [ ] components/ui/, components/layout/, components/features/, components/landing/, components/shared/
  - [ ] hooks/ with all custom hooks
  - [ ] store/ with Zustand stores
  - [ ] app/ with all route groups

- [ ] **1.2** Update layout.tsx and globals.css
  - [ ] Import fonts (Inter for body, JetBrains Mono for monospace)
  - [ ] Define theme tokens (cyan primary, orange secondary)
  - [ ] Add animation utilities and hero glow effects

- [ ] **1.3** Set up providers and configuration
  - [ ] Create RootLayout with QueryClientProvider, Toaster, metadata
  - [ ] Configure next.config.mjs for optimizations
  - [ ] Set up environment variable schema

## Phase 2: Type System & API Layer
- [ ] **2.1** Create all TypeScript interfaces
  - [ ] api.ts (ApiResponse envelope types)
  - [ ] auth.ts (User, Session, Claims)
  - [ ] product.ts, order.ts, customer.ts, receipt.ts, analytics.ts, store.ts

- [ ] **2.2** Create API client and endpoints
  - [ ] lib/api/client.ts (Axios with interceptors)
  - [ ] lib/api/auth.ts, products.ts, orders.ts, customers.ts, receipts.ts, analytics.ts, stores.ts

- [ ] **2.3** Create Zod validation schemas
  - [ ] lib/validations/auth.schema.ts, product.schema.ts, order.schema.ts, store.schema.ts

- [ ] **2.4** Create React Query hooks
  - [ ] hooks/useAuth.ts, useStore.ts, useCart.ts, useProducts.ts, useOrders.ts, useCustomers.ts, useReceipts.ts, useAnalytics.ts

## Phase 3: Global State & Utilities
- [ ] **3.1** Create Zustand stores
  - [ ] store/authStore.ts (token, user, hydration)
  - [ ] store/cartStore.ts (POS cart items)
  - [ ] store/uiStore.ts (sidebar state, modals)

- [ ] **3.2** Create utility functions and constants
  - [ ] lib/utils/currency.ts, date.ts, receipt.ts, truncateAddress.ts
  - [ ] lib/constants/routes.ts, queryKeys.ts, config.ts

## Phase 4: Shared Components & Layout
- [ ] **4.1** Create layout components
  - [ ] components/layout/Sidebar.tsx (with responsive mobile nav)
  - [ ] components/layout/TopBar.tsx (with notifications, user dropdown)
  - [ ] components/layout/DashboardShell.tsx

- [ ] **4.2** Create shared components
  - [ ] components/shared/EmptyState.tsx, LoadingSpinner.tsx, ErrorBoundary.tsx
  - [ ] components/shared/DataTable.tsx (sortable/filterable)
  - [ ] components/shared/SearchInput.tsx, PageHeader.tsx, ConfirmDialog.tsx
  - [ ] components/shared/CopyButton.tsx, CryptoAddressBadge.tsx

- [ ] **4.3** Create public navigation
  - [ ] components/layout/PublicNav.tsx
  - [ ] components/layout/Footer.tsx

## Phase 5: Landing Page (with 3D Hero)
- [ ] **5.1** Build 3D hero section
  - [ ] components/landing/Hero3D.tsx (Three.js with floating dashboard + receipt + coins)
  - [ ] Floating animations, parallax on mouse move
  - [ ] Responsive fallback for mobile (simplified 2D)

- [ ] **5.2** Build landing page sections
  - [ ] components/landing/HeroSection.tsx (3D hero + text overlay + CTAs)
  - [ ] components/landing/FeaturesSection.tsx (6 features in 3-col grid)
  - [ ] components/landing/HowItWorksSection.tsx (3-step flow)
  - [ ] components/landing/PricingSection.tsx (3 tiers with toggle)
  - [ ] components/landing/TestimonialsSection.tsx (scrollable testimonials)
  - [ ] components/landing/IntegrationsSection.tsx (marquee logos)
  - [ ] components/landing/CTASection.tsx (full-width banner)
  - [ ] components/landing/FAQSection.tsx (8-item accordion)

- [ ] **5.3** Build app/(public) pages
  - [ ] app/(public)/page.tsx (main landing)
  - [ ] app/(public)/about/page.tsx
  - [ ] app/(public)/pricing/page.tsx
  - [ ] app/(public)/features/page.tsx
  - [ ] app/(public)/contact/page.tsx
  - [ ] app/(public)/store/[storeId]/page.tsx (public storefront)
  - [ ] app/(public)/receipts/[receiptId]/page.tsx (public receipt)

## Phase 6: Authentication
- [ ] **6.1** Build auth pages
  - [ ] app/(auth)/login/page.tsx with LoginForm
  - [ ] app/(auth)/register/page.tsx with RegisterForm
  - [ ] app/(auth)/forgot-password/page.tsx
  - [ ] app/(auth)/reset-password/page.tsx

- [ ] **6.2** Create auth components
  - [ ] components/features/auth/LoginForm.tsx
  - [ ] components/features/auth/RegisterForm.tsx
  - [ ] components/features/auth/WalletConnectButton.tsx

- [ ] **6.3** Create auth API routes
  - [ ] app/api/auth/login/route.ts
  - [ ] app/api/auth/register/route.ts
  - [ ] app/api/auth/forgot-password/route.ts
  - [ ] app/api/auth/reset-password/route.ts

- [ ] **6.4** Set up middleware
  - [ ] middleware.ts (protect /dashboard/* routes)

## Phase 7: Dashboard Shell
- [ ] **7.1** Create dashboard layout
  - [ ] app/(dashboard)/layout.tsx (with Sidebar, TopBar, DashboardShell)
  - [ ] app/(dashboard)/page.tsx (overview with stats + recent orders + alerts)

## Phase 8: Products Module
- [ ] **8.1** Create product feature components
  - [ ] components/features/products/ProductCard.tsx
  - [ ] components/features/products/ProductTable.tsx
  - [ ] components/features/products/ProductForm.tsx
  - [ ] components/features/products/StockBadge.tsx
  - [ ] components/features/products/ProductImageUpload.tsx

- [ ] **8.2** Build product pages
  - [ ] app/(dashboard)/dashboard/products/page.tsx (table with CRUD)
  - [ ] app/(dashboard)/dashboard/products/new/page.tsx
  - [ ] app/(dashboard)/dashboard/products/[id]/page.tsx

## Phase 9: POS Module (Critical)
- [ ] **9.1** Create POS components
  - [ ] components/features/pos/ProductGrid.tsx
  - [ ] components/features/pos/CartPanel.tsx
  - [ ] components/features/pos/CartItem.tsx
  - [ ] components/features/pos/CheckoutSummary.tsx
  - [ ] components/features/pos/PaymentMethodSelector.tsx

- [ ] **9.2** Create payment integration
  - [ ] components/payment/MiniPayButton.tsx
  - [ ] lib/utils/minipay.ts

- [ ] **9.3** Build POS page
  - [ ] app/(dashboard)/dashboard/pos/page.tsx (full POS interface)

- [ ] **9.4** Create order API
  - [ ] app/api/orders/create/route.ts

## Phase 10: Orders Module
- [ ] **10.1** Create order components
  - [ ] components/features/orders/OrderTable.tsx
  - [ ] components/features/orders/OrderStatusBadge.tsx
  - [ ] components/features/orders/OrderDetail.tsx
  - [ ] components/features/orders/OrderTimeline.tsx

- [ ] **10.2** Build order pages
  - [ ] app/(dashboard)/dashboard/orders/page.tsx
  - [ ] app/(dashboard)/dashboard/orders/[id]/page.tsx

## Phase 11: Customers Module
- [ ] **11.1** Create customer components
  - [ ] components/features/customers/CustomerTable.tsx
  - [ ] components/features/customers/CustomerCard.tsx
  - [ ] components/features/customers/CustomerDetail.tsx

- [ ] **11.2** Build customer pages
  - [ ] app/(dashboard)/dashboard/customers/page.tsx
  - [ ] app/(dashboard)/dashboard/customers/[id]/page.tsx

## Phase 12: Receipts Module
- [ ] **12.1** Create receipt components
  - [ ] components/features/receipts/ReceiptCard.tsx
  - [ ] components/features/receipts/ReceiptDocument.tsx (printable layout)
  - [ ] components/features/receipts/ReceiptShareButton.tsx

- [ ] **12.2** Build receipt pages
  - [ ] app/(dashboard)/dashboard/receipts/page.tsx
  - [ ] app/(dashboard)/dashboard/receipts/[id]/page.tsx

## Phase 13: Analytics Module
- [ ] **13.1** Create analytics components
  - [ ] components/features/analytics/RevenueChart.tsx
  - [ ] components/features/analytics/MetricCard.tsx
  - [ ] components/features/analytics/TopProductsTable.tsx
  - [ ] components/features/analytics/SalesTrendChart.tsx

- [ ] **13.2** Build analytics page
  - [ ] app/(dashboard)/dashboard/analytics/page.tsx

## Phase 14: Settings & Store Management
- [ ] **14.1** Create settings components
  - [ ] components/features/store/StoreLinkCard.tsx
  - [ ] components/features/store/StoreSettingsForm.tsx
  - [ ] components/features/store/StoreQRCode.tsx
  - [ ] components/settings/PaymentSettings.tsx

- [ ] **14.2** Build settings pages
  - [ ] app/(dashboard)/dashboard/store/page.tsx
  - [ ] app/(dashboard)/dashboard/settings/page.tsx

## Phase 15: Public Storefront
- [ ] **15.1** Build storefront components
  - [ ] components/features/storefront/StorefrontHeader.tsx
  - [ ] components/features/storefront/StorefrontProductGrid.tsx
  - [ ] components/features/storefront/CartSidebar.tsx
  - [ ] components/features/storefront/CheckoutFlow.tsx

- [ ] **15.2** Wire public store page
  - [ ] app/(public)/store/[storeId]/page.tsx (complete implementation)

## Phase 16: Polish & QA
- [ ] **16.1** Loading states
  - [ ] Add skeleton screens to all data-heavy pages
  - [ ] Create Skeleton component wrapper

- [ ] **16.2** Error states
  - [ ] Add error boundaries
  - [ ] Create error fallback UI

- [ ] **16.3** Empty states
  - [ ] Add illustrations
  - [ ] Create CTAs for empty product list, orders, customers

- [ ] **16.4** Responsive design audit
  - [ ] Test all pages at 320px, 375px, 768px, 1024px
  - [ ] Verify mobile nav, tables → cards, POS layout

- [ ] **16.5** Animations audit
  - [ ] Verify Framer Motion transitions
  - [ ] Test page transitions, modal animations
  - [ ] Verify `prefers-reduced-motion` support

- [ ] **16.6** Accessibility audit
  - [ ] Keyboard navigation on all interactive elements
  - [ ] Alt text on all images
  - [ ] ARIA labels on icon buttons
  - [ ] Focus management in modals

- [ ] **16.7** Build verification
  - [ ] `next build` passes zero errors
  - [ ] No `any` types, all types explicit
  - [ ] All forms validated with Zod
  - [ ] All links working, no 404s

## Documentation
- [ ] Update tasks/lessons.md with any learned patterns
- [ ] Verify README.md is comprehensive and accurate
