/**
 * Authentication types
 */

export interface User {
  id: string;
  email: string;
  fullName: string;
  walletAddress?: string;
  avatar?: string;
  role: 'owner' | 'staff';
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthClaims {
  sub: string;
  email: string;
  role: string;
  walletAddress?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  businessName?: string;
  email: string;
  password: string;
  walletAddress?: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}
