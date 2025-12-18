import type { PropResponse } from "../types/PropResponse";
import type { PropCategoria, CategoriaCreate, CategoriaUpdate } from "../types/categoria";

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
    let data: PropCategoria[] | null = null;
    let isLoading = true;
    let hayError = false;

    try {
      const response = await this.request<PropResponse<PropCategoria[]>>(
        this.baseUrl,
        { method: "GET" }
      );
      
      data = response.info;
      isLoading = false;
      
      return {
        data: data,
        isLoading: false,
        hayError: false,
      };
    } catch (error) {
      isLoading = false;
      hayError = true;
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
    let data: number | null = null;
    let isLoading = false;
    let hayError = false;

    isLoading = true;
    hayError = false;

    try {
      const response = await this.request<PropResponse<number>>(
        this.baseUrl,
        { 
          method: "POST", 
          body: JSON.stringify(categoria) 
        }
      );
      data = response.info;
      isLoading = false;
      return {
        data: data,
        isLoading: false,
        hayError: false,
      };
    } catch (error) {
      isLoading = false;
      hayError = true;
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
    let isLoading = false;
    let hayError = false;

    isLoading = true;
    hayError = false;

    try {
      await this.request<PropResponse<null>>(
        `${this.baseUrl}/${id_categoria}`,
        { 
          method: "PUT", 
          body: JSON.stringify(categoria) 
        }
      );
      isLoading = false;
      return {
        isLoading: false,
        hayError: false,
      };
    } catch (error) {
      isLoading = false;
      hayError = true;
      return {
        isLoading: false,
        hayError: true,
      };
    }
  }
}