/**
 * Axios API client with interceptors for auth header injection and token refresh
 */

import axios, { AxiosError, AxiosInstance } from 'axios';
import { config } from '../constants/config';
import { useAuthStore } from '@/store/authStore';

let axiosInstance: AxiosInstance | null = null;

export const getAxiosInstance = (): AxiosInstance => {
  if (axiosInstance) return axiosInstance;

  axiosInstance = axios.create({
    baseURL: config.apiUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor: add auth token
  axiosInstance.interceptors.request.use((axiosConfig) => {
    const authStore = useAuthStore.getState();
    const token = authStore.accessToken;

    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }

    return axiosConfig;
  });

  // Response interceptor: handle 401 and token refresh
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest) {
        const authStore = useAuthStore.getState();
        const refreshToken = authStore.refreshToken;

        if (refreshToken && !originalRequest.url?.includes('/api/auth/refresh')) {
          try {
            // Attempt to refresh token
            // TODO: Implement actual refresh logic or mock endpoint in app/api/auth/refresh/route.ts
            const response = await axios.post(
              `${config.apiUrl}/api/auth/refresh`,
              { refreshToken },
              { timeout: 5000 }
            );

            const { accessToken } = response.data;
            authStore.setAccessToken(accessToken);

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return axiosInstance!(originalRequest);
          } catch {
            // Token refresh failed, logout user
            authStore.logout();
            window.location.href = '/login';
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const apiClient = {
  get: <T = any>(url: string, config?: any) => getAxiosInstance().get<T>(url, config),
  post: <T = any>(url: string, data?: any, config?: any) => getAxiosInstance().post<T>(url, data, config),
  put: <T = any>(url: string, data?: any, config?: any) => getAxiosInstance().put<T>(url, data, config),
  patch: <T = any>(url: string, data?: any, config?: any) => getAxiosInstance().patch<T>(url, data, config),
  delete: <T = any>(url: string, config?: any) => getAxiosInstance().delete<T>(url, config),
};
