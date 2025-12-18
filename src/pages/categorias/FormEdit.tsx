import { useMemo, useState } from "react";
import Loading from "../../animation/Loading";
import type {CategoriaUpdate, PropCategoria } from "../../types/categoria";
import { FolderOpen, X, Save } from "lucide-react";
import CategoriaService from "../../service/categoria.service";

interface FormCreateProps {
  setShowFormEdit: (p: boolean) => void;
  dataCategoria: PropCategoria;
  refetch?: () => void;
}

export default function FormEdit({
  setShowFormEdit,
  dataCategoria,
  refetch,
}: FormCreateProps) {
  const idCategoria: number = dataCategoria.id;
  const [formData, setFormData] = useState<CategoriaUpdate>({nombre: dataCategoria.nombre, descripcion: dataCategoria.descripcion});
  const categoriaService = useMemo(() => new CategoriaService(), []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsError(false)

    console.log("Editando la Categoría:", formData);
    const {isLoading, hayError} = await categoriaService.update(idCategoria, formData)
    
    setIsLoading(isLoading);
    setIsError(hayError)
    if (!hayError) {
      if (refetch) refetch();
      setShowFormEdit(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl border border-slate-700 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Editar Categoría
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Modifica la información de la categoría
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFormEdit(false)}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-6">
          {/* Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Nombre de Categoría <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: Electrónica, Ropa y Moda, etc."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Descripción <span className="text-red-400">*</span>
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe los productos que incluye esta categoría..."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            <p className="text-xs text-slate-400 mt-2">
              {formData.descripcion.length} caracteres
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowFormEdit(false)}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors border border-slate-600"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50"
            >
              { isLoading ? (
                <Loading
                  w={6}
                  h={6}
                  color="white"
                />
              ) : isError ? (
                <p>
                  Se produjo un error al Actualizar
                </p>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
