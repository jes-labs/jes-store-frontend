/**
 * Environment variables and configuration
 */

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // Crypto
  celoNetwork: {
    rpcUrl: process.env.NEXT_PUBLIC_CELO_RPC_URL || 'https://forno.celo.org',
    chainId: 42220,
  },

  // Feature flags
  features: {
    cryptoPayments: process.env.NEXT_PUBLIC_CRYPTO_PAYMENTS !== 'false',
    analytics: process.env.NEXT_PUBLIC_ANALYTICS !== 'false',
  },

  // Pagination defaults
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },

  // Low stock thresholds
  inventory: {
    defaultLowStockAlert: 5,
  },

  // Receipt settings
  receipt: {
    expirationDays: 90,
  },
};

export const getApiUrl = (): string => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.API_URL || config.apiUrl;
  }
  // Client-side
  return config.apiUrl;
};
