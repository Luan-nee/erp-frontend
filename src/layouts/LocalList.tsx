import { Plus } from 'lucide-react';
import LocalItem from '../components/LocalItem';
import { useState } from 'react';
import useFetcher from '../data/useFetchet';
import type { PropSucursal } from '../types/sucursal';
import Loading from '../animation/Loading';

interface LocalListProps {
  setSelectIdSucursal: (id: number) => void;
  selectIdSucursal: number | null;
}

export default function LocalList({ setSelectIdSucursal, selectIdSucursal }: LocalListProps) {

  const { data, isLoading: sucursalesLoading, hayError: sucursalesError, refetch: refetchSucursales } = useFetcher('http://localhost:3001/api/sucursales', 'sucursales');

  const sucursales = data as PropSucursal[];
  const [selectTipoSucursal, setSelectTipoSucursal] = useState<string>("central")

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
        onClick={() => setSelectTipoSucursal("sucursal")}
        className={`flex-1 px-4 py-2 ${ selectTipoSucursal === "sucursal" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"} rounded-lg font-medium`}>
          Sucursales
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sucursalesLoading ? (
          // diseña un apartado que diga cargando haciendo uso del componente Loading
          <div className="flex flex-col items-center justify-center">
            <Loading 
              w={12} 
              h={12}
              color="red"
            />
            <p className="text-gray-400 mt-2">Cargando sucursales...</p>
          </div>
        ) : sucursalesError ? (
          // crea un apartado que diga error al cargar las sucursales con un botón para recargar los datos de las sucursales
          <div className="flex flex-col items-center justify-center">
            <p className="text-red-500 mb-2">Error al cargar las sucursales.</p>
            <button
              onClick={refetchSucursales}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : (
          sucursales.filter((local) => local.tipo_sucursal === selectTipoSucursal)
            .map((local, idx) => (
            <LocalItem
              key={idx}
              id={local.id}
              nombre={local.nombre}
              direccion={local.direccion}
              setSelectIdSucursal={setSelectIdSucursal}
              isSelected={selectIdSucursal === local.id}
            />
          ))
        )
        }
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
