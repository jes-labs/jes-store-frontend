/**
 * Currency formatting utilities
 * Amounts are stored in cents in the database
 */

export const formatCurrency = (
  amountInCents: number,
  currency: 'USDT' | 'USDC' | 'cUSD' = 'USDT',
  options?: { showSymbol?: boolean; decimals?: number }
): string => {
  const { showSymbol = true, decimals = 2 } = options || {};
  const amount = amountInCents / 100;

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  if (!showSymbol) return formatted;

  switch (currency) {
    case 'USDT':
      return `USDT ${formatted}`;
    case 'USDC':
      return `USDC ${formatted}`;
    case 'cUSD':
      return `cUSD ${formatted}`;
    default:
      return `$${formatted}`;
  }
};

export const formatUSD = (amountInCents: number): string => {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const centsToDollars = (amountInCents: number): number => {
  return Math.round((amountInCents / 100) * 100) / 100;
};

export const dollarsToCents = (dollars: number): number => {
  return Math.round(dollars * 100);
};
