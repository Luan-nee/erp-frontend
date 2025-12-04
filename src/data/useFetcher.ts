import { useState, useEffect } from 'react';
import type { PropColor } from '../types/PropColor';
import type { PropResponse } from '../types/PropResponse';

export function useFetcher(url: string, customMessage?: string) {
  const [data, setData] = useState<PropColor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hayError, setHayError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { status, info, message }: PropResponse = data;
        // Maneja el status de la API
        if (status >= 200 && status < 300) {
          // 2xx Códigos de éxito (OK, Created, No Content, etc.)
          console.log(`✅ Éxito (${status}): La petición a los ${customMessage} se completó correctamente.`);
          console.log(message);
          setData(info as PropColor[]);
          setHayError(false);
        } else if (status >= 300 && status < 400) {
          // 3xx Códigos de redirección (Moved Permanently, Found, etc.)
          setHayError(true);
          console.log(`⚠️ Redirección (${status}): Se necesita una acción adicional para completar la petición.`);
          console.log("La URL o recurso solicitado ha cambiado. Sigue la nueva ubicación.");
        } else if (status >= 400 && status < 500) {
          setHayError(true);
          // 4xx Códigos de error del cliente (Bad Request, Unauthorized, Not Found, etc.)
          console.log(`❌ Error del Cliente (${status}): Hubo un problema con la petición enviada.`);
          // Puedes añadir una sub-condición para los más comunes:
          if (status === 401) {
            console.log("Acceso no autorizado. Revisa tus credenciales (token/clave API).");
          } else if (status === 404) {
            console.log("Recurso no encontrado. La URL que intentas acceder no existe.");
          } else if (status === 403) {
            console.log("Acceso prohibido. No tienes permiso para este recurso.");
          } else {
            console.log("Revisa los datos, formato o permisos de tu solicitud.");
          }
        } else if (status >= 500 && status < 600) {
          setHayError(true);
          // 5xx Códigos de error del servidor (Internal Server Error, Service Unavailable, etc.)
          console.log(`🚨 Error del Servidor (${status}): La API falló al intentar procesar la petición.`);
          console.log("Esto suele ser un problema en el lado de la API. Intenta de nuevo más tarde.");
        } else {
          setHayError(true);
          // Para códigos no estándar o inesperados
          console.log(`❓ Estado Desconocido (${status}): Código de estado HTTP no reconocido.`);
          console.log("La respuesta podría no ser un código de estado HTTP estándar.");
        }
      })
      .catch((error) => {
        console.error('Error 500 en el backend, avisado desde el frontend:', error);
        setHayError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, hayError };
}