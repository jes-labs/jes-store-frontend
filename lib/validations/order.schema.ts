import { z } from 'zod'

/**
 * Order Validation Schema
 */
export const orderSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive('Quantity must be at least 1'),
    price: z.number().min(0),
  })).min(1, 'Order must have at least one item'),
  paymentMethod: z.enum(['cash', 'transfer', 'crypto', 'minipay']),
  total: z.number().min(0),
  discount: z.number().min(0).optional(),
})

export type OrderFormData = z.infer<typeof orderSchema>
