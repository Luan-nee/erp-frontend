import { useState } from "react";

interface FormCreateProps {
  setShowFormCreate: (p: boolean) => void;
  setAction: (p: boolean) => void;
}

export default function FormCreate( { setShowFormCreate, setAction }: FormCreateProps) {
  const [dataCategoria, setDataCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataCategoria({
      ...dataCategoria,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // implementar lógica para guardar la nueva categoría
    // ...
    
    console.log("Categoría actualizada:", dataCategoria);
    setAction(true);
    setShowFormCreate(false);
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
            onClick={() => {
              // Lógica para guardar
              setShowFormCreate(false);
              setDataCategoria({ nombre: "", descripcion: "" });
              handleSubmit();
            }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg text-white font-medium transition-all shadow-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
