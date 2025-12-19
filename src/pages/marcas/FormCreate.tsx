import { useMemo, useState } from "react";
import MarcaService from "../../service/marca.service";
import type { MarcaCreate } from "../../models/marca";
import Loading from "../../animation/Loading";

interface FormCreateProps {
  setShowFormCreate: (p: boolean) => void;
  refetchMarcas: () => void;
  refetchResumen: () => Promise<void>;
}

export default function FormCreate( { setShowFormCreate, refetchMarcas, refetchResumen }: FormCreateProps) {
  const [dataMarca, setDataMarca] = useState<MarcaCreate>({
    nombre: "",
    descripcion: "",
  });

  const marcaService = useMemo(() => new MarcaService(), []); 

  const [idNewMarca, setIdNewMarca] = useState<number | null>(null);
  const [marcaLoading, setMarcaLoading] = useState<boolean>(false);
  const [marcaError, setMarcaError] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataMarca({
      ...dataMarca,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // 1. Iniciamos carga
    setMarcaLoading(true);
    setMarcaError(false);
    
    console.log("Creando la Marca:", dataMarca);
    const {data, isLoading, hayError } = await marcaService.create(dataMarca);
    
    setIdNewMarca(data);
    setMarcaLoading(isLoading);
    setMarcaError(hayError);

    if (!hayError) {
      if (refetchMarcas) refetchMarcas();
      if (refetchResumen) refetchResumen();
      setShowFormCreate(false);
      console.log("Marca creada con ID:", idNewMarca);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-lg">
        <div className="bg-gradient-to-r from-green-900 to-green-800 px-6 py-4 rounded-t-2xl border-b border-green-700">
          <h3 className="text-xl font-bold text-white">
            Crear nueva Marca
          </h3>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre de la marca:
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
              placeholder="Describe las características de esta marca..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-750 rounded-b-2xl border-t border-gray-700 flex gap-3">
          <button
            type="button"
            disabled={marcaLoading} 
            onClick={() => setShowFormCreate(false)}
            className={`
              flex-1 px-6 py-3 rounded-lg font-medium transition-colors border 
              ${marcaLoading 
                ? 'bg-slate-500 text-slate-300 border-slate-500 cursor-not-allowed opacity-70' // Estilos desactivado
                : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600 cursor-pointer' // Estilos activo
              }
            `}
          >
            Cancelar
          </button>
          <button
            // que no recargue la pagina 
            type="button"
            onClick={() => {
              // Lógica para guardar
              handleSubmit();
            }}
            className="flex-1 flex justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg text-white font-medium transition-all shadow-lg"
          >
            { marcaLoading ? (
              <Loading
                w={6}
                h={6}
                color="white"
              />
            ) : marcaError ? (
              <p>
                Se produjo un error al Crear
              </p>
            ) : (
              <p>
                Crear
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
