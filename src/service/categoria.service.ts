import type { PropResponse } from "../types/PropResponse";
import type { PropCategoria, CategoriaCreate } from "../types/categoria";

export default class CategoriaService {
  private baseUrl: string = "http://localhost:3000/api/categorias";
  public isLoading: boolean = false;
  public hayError: boolean = false;
  public data: PropCategoria[] | null = null;

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
    this.isLoading = true;
    this.hayError = false;

    try {
      const response = await this.request<PropResponse<PropCategoria[]>>(
        this.baseUrl,
        { method: "GET" }
      );
      
      this.data = response.info;
      this.isLoading = false;
      
      return {
        data: this.data,
        isLoading: false,
        hayError: false,
      };
    } catch (error) {
      this.isLoading = false;
      this.hayError = true;
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

    this.isLoading = true;
    this.hayError = false;

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
}