import type { PropResponse } from "../types/PropResponse";
import type { PropCategoria, CategoriaCreate, CategoriaUpdate, PropResumenCategoria } from "../types/categoria";

export default class CategoriaService {
  private baseUrl: string = "http://localhost:3000/api/categorias";

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
    data: PropCategoria[] | null; 
    isLoading: boolean; 
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<PropCategoria[]>>(
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

  public async getResumen(): Promise<{ 
    data: PropResumenCategoria | null; 
    isLoading: boolean; 
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<PropResumenCategoria>>(
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

  public async create(categoria: CategoriaCreate): Promise<{ 
    data: number | null; 
    isLoading: boolean; 
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<number>>(
        this.baseUrl,
        { 
          method: "POST", 
          body: JSON.stringify(categoria) 
        }
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

  public async update(id_categoria: number, categoria: CategoriaUpdate): Promise<{
    isLoading: boolean;
    hayError: boolean;
  }> {
    try {
      await this.request<PropResponse<null>>(
        `${this.baseUrl}/${id_categoria}`,
        { 
          method: "PUT", 
          body: JSON.stringify(categoria) 
        }
      );
      return {
        isLoading: false,
        hayError: false,
      };
    } catch (error) {
      return {
        isLoading: false,
        hayError: true,
      };
    }
  }

  public async delete(id_categoria: number): Promise<{
    isLoading: boolean;
    hayError: boolean;
  }> {
    try {
      await this.request<PropResponse<null>>(
        `${this.baseUrl}/${id_categoria}`,
        { 
          method: "DELETE", 
        }
      );
      return {
        isLoading: false,
        hayError: false,
      };
    } catch (error) {
      return {
        isLoading: false,
        hayError: true,
      };
    }
  }
}