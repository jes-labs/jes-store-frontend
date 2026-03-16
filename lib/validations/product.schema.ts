import { z } from 'zod'

/**
 * Product Validation Schema
 */
export const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  sku: z.string().min(3, 'SKU must be at least 3 characters').toUpperCase(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional().or(z.literal('')),
  price: z.number().positive('Price must be greater than 0'),
  costPrice: z.number().min(0).default(0),
  categoryId: z.string().min(1, 'Please select a category'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  lowStockAlert: z.number().int().min(0).default(5),
  images: z.array(z.string()).default([]),
  status: z.enum(['active', 'draft', 'out_of_stock']).default('active'),
  isActive: z.boolean().default(true),
})

export type ProductFormData = z.infer<typeof productSchema>
