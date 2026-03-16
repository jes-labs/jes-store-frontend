# Auth Routes Todo

- [x] **Infrastructure & Setup**
  - [x] Create `lib/validations/auth.schema.ts` (Zod schemas)
  - [x] Create `store/authStore.ts` (Zustand state management)
  - [x] Update `lib/constants/animation.ts` with auth-specific variants

- [x] **Auth Layout & Shell**
  - [x] Implement `components/auth/AuthBackground.tsx` (Animated blobs + grid)
  - [x] Overhaul `app/(auth)/layout.tsx` (Centered layout, JesStore logo)
  - [x] Refine `components/auth/AuthCard.tsx` (Glassmorphism, high contrast)
  - [x] Create `components/auth/FormInput.tsx` (Reusable form field with validation)

- [x] **Login Flow**
  - [x] Create `/app/(auth)/login/page.tsx`
  - [x] Implement `components/auth/LoginForm.tsx` (Email/Password + Zod)
  - [x] Implement `components/auth/WalletSignInButton.tsx` (Wagmi integration)

- [x] **Registration Flow**
  - [x] Create `/app/(auth)/register/page.tsx`
  - [x] Implement `components/auth/RegisterForm.tsx`
  - [x] Implement `PasswordStrength` indicator
  - [x] Implement "Auto-detect from wallet" logic

- [x] **Password Recovery**
  - [x] Create `/app/(auth)/forgot-password/page.tsx`
  - [x] Implement `ForgotPasswordForm.tsx` (with animated envelope SVG)
  - [x] Create `/app/(auth)/reset-password/page.tsx`
  - [x] Implement `ResetPasswordForm.tsx`

- [x] **Onboarding Flow (`/auth/onboarding`)**
  - [x] Create `/app/(auth)/onboarding/layout.tsx` (Wider shell)
  - [x] Implement `StepIndicator.tsx` (Progress track)
  - [x] Step 1: Store Name (Slug logic)
  - [x] Step 2: Wallet Connect (Education + Integration)
  - [x] Step 3: Store Setup (Logo upload + Category)
  - [x] Step 4: Complete (Celebration + Confetti)

- [x] **Middleware & Protection**
  - [x] Implement `middleware.ts` for route protection
  - [x] Test end-to-end auth redirects
