import axios from "axios";
import { getAuth } from "@services/authStorageService";

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): Record<string, string> {
    const auth = getAuth();
    const token = auth?.token;

    const headers: Record<string, string> = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  async get<T = any>(url: string, config?: any): Promise<T> {
    const headers = { ...this.getAuthHeaders(), ...(config?.headers || {}) };
    const response: any = await axios.get(`${this.baseUrl}${url}`, {
      ...config,
      headers,
    });

    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const headers = { ...this.getAuthHeaders(), ...(config?.headers || {}) };
    const response: any = await axios.post(`${this.baseUrl}${url}`, data, {
      ...config,
      headers,
    });

    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const headers = { ...this.getAuthHeaders(), ...(config?.headers || {}) };
    const response: any = await axios.put(`${this.baseUrl}${url}`, data, {
      ...config,
      headers,
    });
    return response.data;
  }

  async delete<T = any>(url: string, config?: any): Promise<T> {
    const headers = { ...this.getAuthHeaders(), ...(config?.headers || {}) };
    const response: any = await axios.delete(`${this.baseUrl}${url}`, {
      ...config,
      headers,
    });
    return response.data;
  }
}
