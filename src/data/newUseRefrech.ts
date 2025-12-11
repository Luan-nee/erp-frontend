import { useState, useEffect, useCallback } from 'react';
import type { PropColor } from '../types/PropColor';
import type { PropResponse } from '../types/PropResponse';
import type { PropCategoria, PropResumenCategoria } from '../types/categoria';

// El nuevo tipo que devuelve el hook
interface FetcherResult<T> {
    data: T[];
    isLoading: boolean;
    hayError: boolean;
    refetch: () => void; // <--- Nueva función para forzar la re-ejecución
}

// Usamos el tipo genérico 'T' para tipar la data de forma flexible
export default function useFetcher<T = PropColor | PropCategoria | PropResumenCategoria>(
    url: string, 
    customMessage?: string
): FetcherResult<T> {
    
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hayError, setHayError] = useState<boolean>(false);
    
    // 1. NUEVO ESTADO: El disparador de re-ejecución
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    // Función que contiene toda la lógica de fetch, memorizada con useCallback
    const fetchData = useCallback(() => {
        setIsLoading(true);
        setHayError(false); // Reinicia el estado de error antes de intentar de nuevo
        
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const { status, info, message }: PropResponse = data;

                if (status >= 200 && status < 300) {
                    console.log(`✅ Éxito (${status}): obteniendo ${customMessage} exitosamente.`);
                    console.log(message);
                    // Aseguramos el tipado correcto usando 'info as T[]'
                    setData(info as T[]); 
                    setHayError(false);
                } else {
                    setHayError(true);
                    // Logs para otros errores (4xx, 5xx, etc.)
                    console.log(`❌ Error (${status}): Fallo en la petición.`);
                }
            })
            .catch((error) => {
                console.error('❌ Error de red o Backend inactivo:', error);
                setHayError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url, customMessage, refetchTrigger]); // 2. DEPENDENCIA CLAVE: refetchTrigger

    // 3. useEffect se dispara al montar, o cuando cambia la URL, o cuando se llama a refetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // 4. NUEVA FUNCIÓN: La función pública que el componente llama
    const refetch = () => {
        // Incrementa el trigger, forzando la re-ejecución de fetchData y el useEffect
        setRefetchTrigger(prev => prev + 1);
    };

    // 5. Devolvemos la función refetch junto con los datos
    return { data, isLoading, hayError, refetch };
}