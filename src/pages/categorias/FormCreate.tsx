import { useState } from "react";
import Loading from "../../animation/Loading";
import type { CategoriaCreate } from "../../types/categoria";
import useFetch from "../../data/useFetch";

/* 
  TAREA:
  **se observar un componetarmiendo inadecuado cuando se guardar un producto**:
  el producto se guarda correctamente pero no aparece en la tabla de categorias, 
  se sospecha de falta recargar la tabla cuando se crea una nueva categoría.
*/

interface FormCreateProps {
  setShowFormCreate: (p: boolean) => void;
  refetchCategorias?: () => void;
  refetchResumen: () => void | undefined;
}

export default function FormCreate( { setShowFormCreate, refetchCategorias, refetchResumen }: FormCreateProps) {
  const [dataCategoria, setDataCategoria] = useState<CategoriaCreate>({
    nombre: "",
    descripcion: "",
  });

  const { data, isLoading, hayError, refetch, doAction: sendPost  } = useFetch<number>().postData(
    "http://localhost:3000/api/categorias",
    "crear categoría",
    dataCategoria
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataCategoria({
      ...dataCategoria,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Creando la Categoría:", dataCategoria);

    sendPost && sendPost();

    // logica en enviar datos al backend
    console.log("El nuevo ID de la categoría es:", data);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-lg">
        <div className="bg-gradient-to-r from-green-900 to-green-800 px-6 py-4 rounded-t-2xl border-b border-green-700">
          <h3 className="text-xl font-bold text-white">
            Crear nueva categoría
          </h3>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre de la categoría:
            </label>
            <input
              type="text"
              name="nombre"
              onChange={handleChange}
              placeholder="Ej: Neumáticos de Invierno"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción:
            </label>
            <textarea
              name="descripcion"
              onChange={handleChange}
              placeholder="Describe las características de esta categoría..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-750 rounded-b-2xl border-t border-gray-700 flex gap-3">
          <button
            onClick={() => setShowFormCreate(false)}
            className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors border border-gray-600"
          >
            Cancelar
          </button>
          <button
            // que no recargue la pagina 
            type="button"
            onClick={() => {
              // Lógica para guardar
              handleSubmit();
              setDataCategoria({ nombre: "", descripcion: "" });
              setShowFormCreate(false);
              refetchCategorias; // Llama a la función refetch para actualizar los datos
              refetchResumen;
            }}
            className="flex-1 flex justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg text-white font-medium transition-all shadow-lg"
          >
            {/* muestra el texto "Guardar, pero cuando se haya hecho click en ella debe cambiar a una animación de carga, cuando la carga se haya termiando recien se va cerrar la ventana" */}
            { isLoading ? (
              <Loading
                w={6}
                h={6}
                color="white"
              />
            ) : (
              <p>
                Guardar
              </p>
            )
            }
          </button>
        </div>
      </div>
    </div>
  );
}
