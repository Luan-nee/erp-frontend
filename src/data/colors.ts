// src/api/coloresApi.ts
import type { PropColor } from '../types/PropColor';
import type { PropResponse } from '../types/PropResponse';

const API_URL = "http://localhost:3000/api/colores";

export async function getColores(): Promise<PropColor[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error(`getColores: HTTP error ${response.status}`);
      throw new Error(`Failed to fetch colores: ${response.status}`);
    }

    const data = (await response.json()) as PropResponse;
    console.log('getColores - status:', response.status);
    console.log('getColores - data:', data);

    return data.info as PropColor[];
  } catch (error) {
    console.error('❌ Error al obtener datos del API de colores:', error);
    throw error;
  }
}