import type { PropResponse } from "../types/PropResponse";
import type { Colaborador, resumenColaboradores } from "../models/colaboradores.model.ts"

export default class ColaboradorService {
  private baseUrl: string = "http://localhost:3000/api/colaboradores";

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

  public async select(): Promise<{
    data: Colaborador[] | null;
    isLoading: boolean;
    hayError: boolean;
  }> {
    try {
      const response = await this.request<PropResponse<Colaborador[]>>(
        `${this.baseUrl}`,
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

  public async getResumen(): Promise<{ 
    data: resumenColaboradores | null; 
    isLoading: boolean;
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<resumenColaboradores>>(
        `${this.baseUrl}/resumen`,
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
}