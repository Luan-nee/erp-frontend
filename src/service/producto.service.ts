import type { PropResponse } from "../types/PropResponse";
import type { ProductoSelect, ResumenProductos, ProductCreateMain, ProductoSelectById} from "../models/producto";

export default class ProductoService {
  private baseUrl: string = "http://localhost:3000/api/productos";

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  public async getById(id_sucursal: number, id_producto: number): Promise<{
    data: ProductoSelectById | null;
    isLoading: boolean;
    hayError: boolean;
  }> {
    try {
      const response = await this.request<PropResponse<ProductoSelectById>>(
        `${this.baseUrl}/${id_sucursal}/${id_producto}`,
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

  public async getDetallesProductos(id_sucursal: number): Promise<{ 
    data: ProductoSelect[] | null; 
    isLoading: boolean;
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<ProductoSelect[]>>(
        `${this.baseUrl}/${id_sucursal}`,
        { method: "GET" }
      );
      console.log("Respuesta del servicio de productos:", response.info);
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

  public async getResumenProductos(id_sucursal: number): Promise<{ 
    data: ResumenProductos | null; 
    isLoading: boolean;
    hayError: boolean; 
  }> {
    try { 
      const response = await this.request<PropResponse<ResumenProductos>>(
        `${this.baseUrl}/resumen/${id_sucursal}`,
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

  public async createProducto(productoData: ProductCreateMain): Promise<{ 
    data: ProductoSelect | null; 
    isLoading: boolean;
    hayError: boolean; 
  }> {
    try {
      const response = await this.request<PropResponse<ProductoSelect>>(
        this.baseUrl,
        {
          method: "POST",
          body: JSON.stringify(productoData),
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
}