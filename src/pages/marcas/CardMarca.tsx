import { Edit3, Tag, Trash2 } from "lucide-react";

interface CardMarcaProps {
  id: number;
  nombre: string;
  descripcion: string;
  cant_productos: number;
  setIdMarcaDelete: (id: number) => void;
  setIdMarcaEdit: (id: number) => void;
  showDeleteModal: (p: boolean) => void;
  showEditModal: (p: boolean) => void;
}

export default function CardMarca({id, nombre, descripcion, cant_productos, setIdMarcaDelete, setIdMarcaEdit, showDeleteModal, showEditModal}: CardMarcaProps) {
  return (
    <div
      key={id}
      className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden hover:shadow-2xl hover:border-red-500/50 transition-all group"
    >
      {/* Brand Header */}
      <div className="flex flex-row justify-between bg-gradient-to-br from-red-900/50 to-red-800/30 p-6 border-b border-gray-700">
        <h3 className="text-2xl font-bold text-white mb-1">
          {nombre}
        </h3>
        <div className="flex items-center justify-end mb-4">
          <div className="flex gap-2">
            <button 
            onClick={() => { setIdMarcaEdit(id); showEditModal(true); }}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors shadow-md">
              <Edit3 className="w-4 h-4" />
            </button>
            <button 
            onClick={() => { setIdMarcaDelete(id); showDeleteModal(true); }}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors shadow-md">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Brand Info */}
      <div className="p-6">
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {descripcion}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="mt-3 text-xs text-gray-500">
            ID: {id}
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Productos:</span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {cant_productos}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}