import { useState, useEffect, useCallback } from "react";

// estructura que retorna el fetchData
// { data, isLoading, hayError, refetch }

// estructura que retorna el updateData
// { response, hayError, message }

export type PropResponse<T> = {
  status: number;
  message: string;
  info: T | null;
};

export type EndpointReturn<T> = {
  data: T | null;
  isLoading: boolean;
  hayError: boolean;
  refetch: () => void;
};

export default function useFetch<T>() {
  const [data, setData] = useState< T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hayError, setHayError] = useState<boolean>(false);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  async function request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  function getData(url: string, customMessage: string): EndpointReturn<T> {
    const fetchData = useCallback(async () => {
      setIsLoading(true);
      setHayError(false);
      try {
        const response = await request<PropResponse<T>>(url, { method: "GET" });
        setData(response.info);
        console.log(
          `✅ Éxito: obteniendo ${customMessage} exitosamente.`,
          response.message
        );
      } catch (error) {
        console.error(`❌ Error al obtener ${customMessage}:`, error);
        setHayError(true);
      } finally {
        setIsLoading(false);
      }
    }, [url, refetchTrigger]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const refetch = () => setRefetchTrigger((prev) => prev + 1);

    return { data, isLoading, hayError, refetch };
  };

  function updateData(url:string, customMessage:string, body: any): EndpointReturn<T> {
    const updateData = useCallback(
      async () => {
        setIsLoading(true);
        setHayError(false);
        try {
          const response = await request<PropResponse<T>>(url, { 
            method: "PUT",
            body: JSON.stringify(body)
          });
          setData(response.info);
          console.log(
            `✅ Éxito: actualizando ${customMessage} exitosamente.`,
            response.message
          );
        } catch (error) {
          console.error(`❌ Error al actualizar ${customMessage}:`, error);
          setHayError(true);
        } finally {
          setIsLoading(false);
        }
      }, [url]
    );
    // la IA me recomienda usar [url, body]

    useEffect(() => {
      updateData();
    }, [updateData]);

    const refetch = () => setRefetchTrigger((prev) => prev + 1);

    return {data, isLoading, hayError, refetch};
  }

  function postData(url: string, customMessage: string, body: any): EndpointReturn<T> {
    const postData = useCallback(async () => {
      setIsLoading(true);
      setHayError(false);
      try {
        const response = await request<PropResponse<T>>(url, { 
          method: "POST",
          body: JSON.stringify(body)
        });
        setData(response.info);
        console.log(
          `✅ Éxito: creando ${customMessage} exitosamente.`,
          response.message
        );
      }catch (error) {
        console.error(`❌ Error al crear ${customMessage}:`, error);
        setHayError(true);
      }
      finally {
        setIsLoading(false);
      }
    }, [url]);

    useEffect(() => {
      postData();
    }, [postData]);

    const refetch = () => setRefetchTrigger((prev) => prev + 1);

    return { data, isLoading, hayError, refetch };
  }

  function deleteData(url: string, customMessage: string): EndpointReturn<T> {
    const deleteData = useCallback(async () => {
      setIsLoading(true);
      setHayError(false);
      try {
        const response = await request<PropResponse<T>>(url, { method: "DELETE" });
        setData(response.info);
        console.log(
          `✅ Éxito: eliminando ${customMessage} exitosamente.`,
          response.message
        );
      } catch (error) {
        console.error(`❌ Error al eliminar ${customMessage}:`, error);
        setHayError(true);
      } finally {
        setIsLoading(false);
      }
    }, [url]);

    useEffect(() => {
      deleteData();
    }, [deleteData]);

    const refetch = () => setRefetchTrigger((prev) => prev + 1);

    return { data, isLoading, hayError, refetch };
  }

  return { getData, updateData, postData, deleteData };
}
