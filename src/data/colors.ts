// src/api/coloresApi.ts
import type { PropResponse } from '../types/response'; // Importa ambos tipos
import type { PropColor } from '../types/color';

const API_URL = "http://localhost:3000/colores";

/**
 * Función asíncrona para obtener la lista de colores desde la API.
 * Siempre retorna un objeto estructurado ResponseColors.
 * * @returns {Promise<PropResponse>} Objeto con status, message e info (colores).
 */
export async function getColores(): Promise<PropResponse> {
  let response: Response | null = null;

  try {
    // 1. Realizar la solicitud GET
    response = await fetch(API_URL);
    
    // 2. Si la respuesta HTTP no es OK (ej. 404, 500)
    if (!response.ok) {
      return {
        status: response.status,
        message: `Error HTTP ${response.status}: ${response.statusText}`,
        info: [], // Devolvemos un arreglo vacío en caso de error
      };
    }

    // 3. Si la respuesta es exitosa (código 200)
    const data: PropColor[] = await response.json();
    
    return {
      status: response.status, // Debería ser 200
      message: "Colores obtenidos exitosamente.",
      info: data,
    };

  } catch (error) {
    // 4. Manejar errores de red (ej. CORS, servidor caído, URL incorrecta)
    const status = response ? response.status : 0;
    
    let errorMessage = "Error desconocido al obtener los datos.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }

    return {
      status: status,
      message: `Error de red o parseo: ${errorMessage}`,
      info: [], // Arreglo vacío en caso de fallo
    };
  }
}