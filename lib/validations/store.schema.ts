import { z } from 'zod'

/**
 * Store Validation Schema
 */
export const storeSchema = z.object({
  name: z.string().min(2, 'Store name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
  category: z.string().min(1, 'Please select a category'),
  logo: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  walletAddress: z.string().min(42, 'Invalid wallet address').optional(),
  socials: z.object({
    instagram: z.string().optional(),
    twitter: z.string().optional(),
  }).optional(),
})

export type StoreFormData = z.infer<typeof storeSchema>
