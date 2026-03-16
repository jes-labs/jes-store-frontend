# Dashboard Implementation Todo

## Pre-flight Checks
- [x] Build passing (`pnpm build`)
- [x] Broken imports repaired
- [x] Shared components standardized (`PageHeader`, `SearchInput`, `OrderStatusBadge`)
- [x] Product schema updated with SKU and visibility

## POS / Record Sale (`/dashboard/pos`)
- [x] Refine `cartStore.ts` (add discount types, chain selection)
- [x] Create `ProductGrid` component
- [x] Create `CartPanel` component
- [x] Create `PaymentMethodSelector` (integrated into CartPanel)
- [x] Create `CheckoutSummary` (integrated into CartPanel)
- [x] Create `ReceiptModal`
- [x] Implement POS page layout

## Products Management
- [x] `ProductTable` implemented
- [x] `ProductForm` basic implementation
- [x] `ProductImageUpload` component
- [x] Refine `ProductForm` with image upload and category combobox
- [ ] Implement Edit Product functionality (Page wrapper)

## Orders & Customers
- [x] `OrderTable` implemented
- [x] `CustomerTable` implemented
- [x] `OrderDetail` page
- [x] `CustomerDetail` page
- [x] Order timeline and payment proof visualization

## Analytics & Receipts
- [x] `ReceiptCard` implemented
- [x] Revenue and Top Products charts
- [x] Analytics overview metrics
- [x] Store settings and share link

## Final Polish
- [x] Responsive layout refinements
- [ ] Loading skeletons for all major views (Deferred to post-MVP)
- [ ] Empty states with illustrations and CTAs (Deferred to post-MVP)
- [x] Premium glassmorphism and animations
