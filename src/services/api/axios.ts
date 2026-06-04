/**
 * Author: Abhishek Kumar
 */

import axios, {
  AxiosError,
 
} from 'axios';
import type { InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { API_ENDPOINTS } from './endPoints';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 */
api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      window.location.href = API_ENDPOINTS.AUTH.LOGIN;
    }

    return Promise.reject(error);
  }
);

export default api;