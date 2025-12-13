import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import type { Marca } from "../../types/marca";

interface FormDeleteProps {
  setShowFormDelete: (p: boolean) => void;
  data: Marca;
  refetch: () => void;
}

export default function FormDelete({
  setShowFormDelete,
  data,
  refetch,
}: FormDeleteProps) {
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = () => {
    if (confirmText.toLowerCase() === "eliminar") {
      // lógica para eliminar la categoría
      // ...

      // menciona el id y el nombre de la marca a eliminar
      console.log(`Marca "${data.nombre}" con ID: ${data.id} eliminada`);
      setShowFormDelete(false);
      setConfirmText("");
      refetch();
    }
  };

  const handleCancel = () => {
    setShowFormDelete(false);
    setConfirmText("");
  };

  const isDeleteEnabled = confirmText.toLowerCase() === "eliminar";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Confirmar Eliminación
            </h2>
          </div>
          <button
            onClick={handleCancel}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-slate-300">
            ¿Estás seguro de que deseas eliminar la marca{" "}
            <span className="font-bold text-white">
              "{data.nombre}"
            </span>
            ?
          </p>

          <p className="text-sm text-slate-400">
            Esta acción no se puede deshacer. Para confirmar, escribe{" "}
            <span className="font-mono text-red-400 font-bold">eliminar</span>{" "}
            en el campo de abajo.
          </p>

          <div>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Escribe 'eliminar' para confirmar"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors border border-slate-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={!isDeleteEnabled}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                isDeleteEnabled
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/50"
                  : "bg-slate-700 text-slate-500 cursor-not-allowed"
              }`}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
