import { Plus } from 'lucide-react';
import LocalItem from '../components/LocalItem';
import { useState } from 'react';

interface Location { 
  name: string;
  address: string;
  type: string;
}

export default function LocalList() {
  
  const locations: Location[] = [
    { name: 'Central Lima', address: 'Av. Industrial 1234', type: 'central' },
    { name: 'Sucursal Norte', address: 'Calle Los Pinos 567', type: 'sucursales' },
    { name: 'Sucursal Este', address: 'Jr. Comercio 890', type: 'sucursales' },
    { name: 'Sucursal Sur', address: 'Av. Arequipa 432', type: 'sucursales' },
    { name: 'Depósito Principal', address: 'Panamericana Sur Km 12', type: 'central' }
  ];

  const [selectTipoSucursal, setSelectTipoSucursal] = useState<string>("central")
  const [selectLocal, setSelectLocal] = useState<{ type: string ; idx: number } | null>({
    type: locations[0].type,
    idx: 0
  });

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-bold text-white mb-1">Adminitrar Locales</h3>
        <p className="text-sm text-gray-400">Gestiona tus sucursales</p>
      </div>

      <div className="flex gap-2 p-4 border-b border-gray-700">
        {/* bg-gray-700 text-gray-300 */}
        <button 
        onClick={() => setSelectTipoSucursal("central")}
        className={`flex-1 px-4 py-2 ${ selectTipoSucursal === "central" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"} rounded-lg font-medium`}>
          Central
        </button>
        <button 
        onClick={() => setSelectTipoSucursal("sucursales")}
        className={`flex-1 px-4 py-2 ${ selectTipoSucursal === "sucursales" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"} rounded-lg font-medium`}>
          Sucursales
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        
        {locations
          .filter((location) => location.type === selectTipoSucursal)
          .map((location, idx) => (
          <LocalItem
            name={location.name}
            address={location.address}
            idx={idx}
            onSelect={setSelectLocal}
            isSelected={selectLocal?.idx === idx && selectLocal?.type === location.type}
            type={location.type}
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Agregar Local
        </button>
      </div>
    </div>
  );
}
