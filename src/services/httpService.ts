import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

class HttpService {
  constructor() {
    // Configura interceptadores para adicionar token automaticamente
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Interceptador de requisição para adicionar token
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptador de resposta para tratar tokens expirados
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado ou inválido
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          
          // Redireciona para login se não estiver na página de login
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async request<T = any>(
    method: HttpMethod, 
    endpoint: string, 
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}/${endpoint}`;
    
    switch (method.toUpperCase()) {
      case 'GET':
        return await axios.get<T>(url, { params, ...config });
      case 'POST':
        return await axios.post<T>(url, params, config);
      case 'PUT':
        return await axios.put<T>(url, params, config);
      case 'DELETE':
        return await axios.delete<T>(url, { params, ...config });
      case 'PATCH':
        return await axios.patch<T>(url, params, config);
      default:
        throw new Error(`Método HTTP não suportado: ${method}`);
    }
  }

  // Métodos de conveniência
  async get<T = any>(endpoint: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>('GET', endpoint, params, config);
  }

  async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>('POST', endpoint, data, config);
  }

  async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  async delete<T = any>(endpoint: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>('DELETE', endpoint, params, config);
  }

  async patch<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, config);
  }
}

export const httpService = new HttpService();
