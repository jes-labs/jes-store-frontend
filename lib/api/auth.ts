import { apiClient } from './client'
import { LoginPayload, RegisterPayload, LoginResponse, RegisterResponse } from '@/types/auth'

/**
 * Authentication Service
 * Backend routes: POST /auth/register, POST /auth/login
 */
export const authApi = {
  /**
   * Log in with wallet address
   * Returns { token, user, role } — no ApiResponse wrapper
   */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', payload)
    return response.data
  },

  /**
   * Register a new wallet/account
   * Returns flat user object — no token on register
   */
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>('/auth/register', payload)
    return response.data
  },
}
