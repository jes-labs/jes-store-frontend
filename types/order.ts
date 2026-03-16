/**
 * Order types
 */

export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';
export type DeliveryStatus = 'pending' | 'processing' | 'dispatched' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed';
export type PaymentMethod = 'cash' | 'bank_transfer' | 'crypto';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number; // in cents
  lineTotal: number; // in cents
}

export interface Order {
  id: string;
  storeId: string;
  orderRef: string; // Human-readable reference
  customerName?: string;
  customerEmail?: string;
  items: OrderItem[];
  subtotal: number; // in cents
  discount: number; // in cents
  total: number; // in cents
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'completed' | 'failed';
  transactionHash?: string; // For crypto payments
  status: OrderStatus;
  deliveryStatus: DeliveryStatus;
  trackingNumber?: string;
  deliveryTimeline: Array<{
    status: DeliveryStatus;
    location?: string;
    description: string;
    timestamp: string;
  }>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  customerName?: string;
  customerEmail?: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  discount: number;
  paymentMethod: PaymentMethod;
  transactionHash?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentMethod?: PaymentMethod;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}
