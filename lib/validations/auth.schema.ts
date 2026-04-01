import { z } from 'zod'

export const loginSchema = z.object({
  wallet_address: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Enter a valid EVM wallet address (0x + 40 hex chars)'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  user_name: z.string()
    .min(2, 'Enter your full name')
    .max(100, 'Name is too long'),
  email: z.string()
    .email('Enter a valid email address'),
  wallet_address: z.string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Enter a valid EVM wallet address (0x + 40 hex chars)'),
  phone_number: z.string().optional().or(z.literal('')),
  agreedToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms to continue' }),
  }),
})

export type RegisterFormValues = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter the email address on your account'),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'Include an uppercase letter')
    .regex(/[0-9]/, 'Include a number'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
