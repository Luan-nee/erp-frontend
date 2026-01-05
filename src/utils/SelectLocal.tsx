import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react'; // Opcional: para iconos similares a tu diseño
import type { SucursalSelect } from '../models/sucursal.model.ts';

interface Props {
  sucursales: SucursalSelect[] | null;
  onSelect: (sucursal: SucursalSelect) => void;
}

export default function SelectLocal({ sucursales, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SucursalSelect | null>(null);

  const handleSelect = (sucursal: SucursalSelect) => {
    setSelected(sucursal);
    setIsOpen(false);
    onSelect(sucursal);
  };

  return (
    <div className="relative w-full max-w-md text-gray-200">
      {/* Botón del Select */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2.5 bg-[#1e2530] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <MapPin size={18} className="text-gray-500" />
          <span className={selected ? "text-white" : "text-gray-500"}>
            {selected ? selected.nombre : "Seleccione una ubicación..."}
          </span>
        </div>
        <ChevronDown 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-2 overflow-hidden bg-[#1e2530] border border-gray-700 rounded-lg shadow-xl animate-in fade-in zoom-in duration-150">
          {sucursales?.map((sucursal) => (
            <li
              key={sucursal.id}
              onClick={() => handleSelect(sucursal)}
              className="px-4 py-3 cursor-pointer hover:bg-[#2a3441] border-b border-gray-800 last:border-none transition-colors"
            >
              <div className="font-semibold text-sm text-white">
                {sucursal.nombre}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {sucursal.direccion}
              </div>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                sucursal.tipo_sucursal === 'central' 
                ? 'bg-blue-900/40 text-blue-400' 
                : 'bg-gray-800 text-gray-400'
              }`}>
                {sucursal.tipo_sucursal}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};