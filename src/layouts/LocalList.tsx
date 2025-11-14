import { Plus } from 'lucide-react';
import LocalItem from '../components/LocalItem';

interface Location { 
  name: string;
  address: string;
}

export default function LocalList() {

  const locations: Location[] = [
    { name: 'Central Lima', address: 'Av. Industrial 1234' },
    { name: 'Sucursal Norte', address: 'Calle Los Pinos 567' },
    { name: 'Sucursal Este', address: 'Jr. Comercio 890' },
    { name: 'Sucursal Sur', address: 'Av. Arequipa 432' },
    { name: 'Depósito Principal', address: 'Panamericana Sur Km 12' }
  ];

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-bold text-white mb-1">
          Administrar Locales
        </h3>
        <p className="text-sm text-gray-400">Gestiona tus sucursales</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {locations.map((location, idx) => (
          <LocalItem
            key={idx}
            idx={idx}
            name={location.name}
            address={location.address}
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
