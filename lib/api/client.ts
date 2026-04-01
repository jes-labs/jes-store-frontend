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

  // Request interceptor: add auth token (skip for auth + public endpoints)
  axiosInstance.interceptors.request.use((axiosConfig) => {
    const url = axiosConfig.url ?? '';
    const isPublicRoute = url.startsWith('/auth/') || url.startsWith('/receipts/') || url.startsWith('/store/');
    // If caller explicitly set Authorization to empty string, honour it
    const callerExplicitlySkipped = axiosConfig.headers.Authorization === '';
    if (!isPublicRoute && !callerExplicitlySkipped) {
      const authStore = useAuthStore.getState();
      const token = authStore.accessToken;
      if (token) {
        axiosConfig.headers.Authorization = `Bearer ${token}`;
      }
    }

    return axiosConfig;
  });

  // Response interceptor: handle 401 by logging out (skip for auth endpoints)
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const url = (error.config?.url ?? '');
      const isAuthRoute = url.startsWith('/auth/');
      const isDashboardRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');
      if (error.response?.status === 401 && !isAuthRoute && isDashboardRoute) {
        const authStore = useAuthStore.getState();
        authStore.logout();
        window.location.href = '/login';
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
