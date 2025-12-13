import { ChevronRight, MapPin } from "lucide-react";

interface LocalItemProps {
  id: number;
  nombre: string;
  direccion: string;
  tipo_sucursal: string;
  setSelectIdSucursal: (id: number | null) => void;
  isSelected: boolean;
}

export default function LocalItem({ id, nombre, direccion, tipo_sucursal, setSelectIdSucursal, isSelected }: LocalItemProps  ) {
  return (
    <button
      type="button"
      key={id}
      className={`bg-gray-750 hover:bg-gray-700 rounded-lg p-2 border transition-all cursor-pointer group flex items-center justify-between w-full ${isSelected ? "border-red-400" : "border-gray-600"}`}
      onClick={() => {setSelectIdSucursal(id); console.log("Sucursal seleccionada ID:", id);}}
    >
      <MapPin className="w-5 h-5 text-red-400" />
      <div className="flex flex-col items-start justify-between flex-1 mx-3">
        <span className="font-semibold text-white">{nombre}</span>
        <p className="text-sm text-gray-400 ">{direccion}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
    </button>
  );
}
