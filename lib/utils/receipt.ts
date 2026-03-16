/**
 * Receipt formatting utilities
 */

export const generateReceiptNumber = (): string => {
  // Format: RCP-YYYYMMDD-XXXXXX
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');

  return `RCP-${year}${month}${day}-${random}`;
};

export const parseReceiptNumber = (receiptNumber: string): {
  date: Date;
  random: string;
} | null => {
  const match = receiptNumber.match(/^RCP-(\d{8})-(\d{6})$/);
  if (!match) return null;

  const [, dateStr, random] = match;
  const year = parseInt(dateStr.slice(0, 4), 10);
  const month = parseInt(dateStr.slice(4, 6), 10) - 1;
  const day = parseInt(dateStr.slice(6, 8), 10);

  return {
    date: new Date(year, month, day),
    random,
  };
};

export const formatReceiptUrl = (receiptId: string): string => {
  return `/receipts/${receiptId}`;
};

/**
 * Generate a simple decorative barcode pattern from receipt number
 */
export const generateBarcodePattern = (receiptNumber: string): number[] => {
  // Use the numeric parts of receipt number to generate a pattern
  const digits = receiptNumber.replace(/\D/g, '');
  const pattern: number[] = [];

  for (let i = 0; i < digits.length; i++) {
    const digit = parseInt(digits[i], 10);
    // Each digit creates a pattern of bars (1-9)
    pattern.push(digit || 5); // 0 becomes 5
  }

  return pattern;
};
