import { apiClient } from './client'
import { LoginPayload, RegisterPayload, ResetPasswordPayload, Session } from '@/types/auth'
import { ApiResponse } from '@/types/api'

/**
 * Authentication Service
 */
export const authApi = {
  /**
   * Log in with email and password
   */
  login: async (payload: LoginPayload): Promise<ApiResponse<Session>> => {
    const response = await apiClient.post<ApiResponse<Session>>('/api/auth/login', payload)
    return response.data
  },

  /**
   * Register a new account
   */
  register: async (payload: RegisterPayload): Promise<ApiResponse<Session>> => {
    const response = await apiClient.post<ApiResponse<Session>>('/api/auth/register', payload)
    return response.data
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/api/auth/forgot-password', { email })
    return response.data
  },

  /**
   * Reset password with token
   */
  resetPassword: async (payload: ResetPasswordPayload): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/api/auth/reset-password', payload)
    return response.data
  },

  /**
   * Log out (clear tokens from backend if necessary)
   */
  logout: async (): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/api/auth/logout')
    return response.data
  },

  /**
   * Get current session profile
   */
  getProfile: async (): Promise<ApiResponse<Session['user']>> => {
    const response = await apiClient.get<ApiResponse<Session['user']>>('/api/auth/profile')
    return response.data
  },
}
