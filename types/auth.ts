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
  wallet_address: string;
}

export interface RegisterPayload {
  wallet_address: string;
  user_name: string;
  email: string;
  phone_number?: string;
  house_address?: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

// Backend response shapes (snake_case from API)
export interface BackendUser {
  id: string;
  email: string;
  user_name: string;
  wallet_address?: string;
  phone_number?: string;
  house_address?: string;
}

export interface LoginResponse {
  token: string;
  user: BackendUser;
  role: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  user_name: string;
  wallet_address?: string;
  phone_number?: string;
  house_address?: string;
}
