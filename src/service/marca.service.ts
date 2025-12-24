import type { PropResponse } from "../types/PropResponse";
import type { PropMarca, MarcaCreate, MarcaUpdate, PropResumenMarca, Marca } from "../models/marca";

export default class MarcaService {
  private baseUrl: string = "http://localhost:3000/api/marcas";

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
    data: Marca[] | null;
    isLoading: boolean;
    hayError: boolean;
  }> {
    try {
      const response = await this.request<PropResponse<Marca[]>>(
        `${this.baseUrl}/select`,
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

  public async get(): Promise<{ 
    data: PropMarca[] | null; 
    isLoading: boolean; 
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<PropMarca[]>>(
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
    data: PropResumenMarca | null; 
    isLoading: boolean; 
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<PropResumenMarca>>(
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

  public async create(marca: MarcaCreate): Promise<{ 
    data: number | null; 
    isLoading: boolean; 
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<number>>(
        this.baseUrl,
        { 
          method: "POST", 
          body: JSON.stringify(marca) 
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

  public async update(id_marca: number, marca: MarcaUpdate): Promise<{
    isLoading: boolean;
    hayError: boolean;
  }> {
    try {
      await this.request<PropResponse<null>>(
        `${this.baseUrl}/${id_marca}`,
        { 
          method: "PUT", 
          body: JSON.stringify(marca) 
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