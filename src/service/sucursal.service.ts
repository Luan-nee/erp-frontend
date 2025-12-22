import type { Sucursal, SucursalSelect } from "../models/sucursal.model";
import type { PropResponse } from "../types/PropResponse";

export default class SucursalService {
  private baseUrl: string = "http://localhost:3001/api/sucursales";
  
  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la petición");
    }
    return response.json();
  }

  async getSucursales(): Promise<{ 
    data: SucursalSelect[] | null; 
    isLoading: boolean; 
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<SucursalSelect[]>>(
        this.baseUrl,
        { method: "GET" }
      );
      return {
        data: response.info,
        isLoading: false,
        hayError: false,
      };
    } catch (error) {
      return {
        data: null,
        isLoading: false,
        hayError: true,
      };
    }
  }

  async getSucursalById(id: number): Promise<{ 
    data: Sucursal | null; 
    isLoading: boolean;
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<Sucursal>>(
        `${this.baseUrl}/${id}`,
        { method: "GET" }
      );
      return {
        data: response.info,
        isLoading: false,
        hayError: false,
      };
    }catch (error) {
      return {
        data: null,
        isLoading: false,
        hayError: true,
      };
    } 
  }
}