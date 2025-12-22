import type { PropColor } from "../models/color";
import type { PropResponse } from "../types/PropResponse";

export default class ColorService {
  private baseUrl: string = "http://localhost:3000/api/colores";

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

  public async get(): Promise<{ 
    data: PropColor[] | null; 
    isLoading: boolean;
    hayError: boolean; 
  }> {
    try { 
      const response = await this.request<PropResponse<PropColor[]>>(
        this.baseUrl,
        { method: "GET" }
      );
      return {
        data: response.info,
        isLoading: false,
        hayError: false,
      };
    }
    catch (error) {
      return {
        data: null,
        isLoading: false,
        hayError: true,
      };
    }
  }

  public async getById(id: number): Promise<{ 
    data: PropColor | null; 
    isLoading: boolean;
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<PropColor>>(
        `${this.baseUrl}/${id}`,
        { method: "GET" }
      );
      return {
        data: response.info,
        isLoading: false,
        hayError: false,
      };
    }
    catch (error) {
      return {
        data: null,
        isLoading: false,
        hayError: true,
      };
    } 
  }
}