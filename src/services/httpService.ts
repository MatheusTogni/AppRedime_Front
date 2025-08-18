import axios, { type AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

class HttpService {
  async request<T = any>(
    method: HttpMethod, 
    endpoint: string, 
    params?: any,
    config?: any
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
  async get<T = any>(endpoint: string, params?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.request<T>('GET', endpoint, params, config);
  }

  async post<T = any>(endpoint: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.request<T>('POST', endpoint, data, config);
  }

  async put<T = any>(endpoint: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  async delete<T = any>(endpoint: string, params?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.request<T>('DELETE', endpoint, params, config);
  }

  async patch<T = any>(endpoint: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, config);
  }
}

export const httpService = new HttpService();
