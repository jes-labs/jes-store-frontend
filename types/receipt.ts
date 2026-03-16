/**
 * Receipt types
 */

export interface ReceiptItem {
  productName: string;
  quantity: number;
  unitPrice: number; // in cents
  lineTotal: number; // in cents
}

export interface Receipt {
  id: string;
  receiptNumber: string; // RCP-YYYYMMDD-XXXXXX format
  storeId: string;
  storeName: string;
  orderId: string;
  customerName?: string;
  items: ReceiptItem[];
  subtotal: number; // in cents
  discount: number; // in cents
  total: number; // in cents
  paymentMethod: 'cash' | 'bank_transfer' | 'crypto';
  transactionHash?: string;
  createdAt: string;
  expiresAt?: string; // For time-limited sharing
}
