import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

// API client configuration
const apiClient = axios.create({
  baseURL: (import.meta as any).env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

// Types for our API client
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || 'An error occurred',
      status: error.response?.status || 500,
      errors: (error.response?.data as any)?.errors,
    };
    return Promise.reject(apiError);
  }
);

// API client wrapper
export const api = {
  // GET request
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await apiClient.get(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  // POST request
  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await apiClient.post(
        url,
        data,
        config
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await apiClient.put(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await apiClient.delete(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },

  // Custom request
  request: async <T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await apiClient(config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  },
};
