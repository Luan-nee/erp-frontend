import { Package, TrendingDown, Store} from 'lucide-react';
import LocalList from '../layouts/LocalList';
import Table from '../components/Table';

const headerTable = ['Foto', 'Producto', 'Stock', 'Cantidad Máxima', 'Cantidad Mínima', 'Local'];

  const products = [
    { id: 1, name: 'Neumático Deportivo Premium', stock: '0000', maxQty: '00000', minQty: '00000', location: 'Almacén Central A-12' },
    { id: 2, name: 'Neumático Todo Terreno', stock: '0000', maxQty: '00000', minQty: '00000', location: 'Almacén Central B-08' },
    { id: 3, name: 'Neumático Comercial HD', stock: '0000', maxQty: '00000', minQty: '00000', location: 'Almacén Central C-15' },
    { id: 4, name: 'Neumático Económico', stock: '0000', maxQty: '00000', minQty: '00000', location: 'Almacén Central A-03' }
  ];

function Inventory() {
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">INVENTARIO / control de stock</h2>
              <div className="flex items-center gap-2 text-red-400">
                <TrendingDown className="w-5 h-5" />
                <span className="text-lg font-semibold">Productos con bajo stock</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors border border-gray-600">
                Central
              </button>
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors border border-gray-600">
                Sucursales
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Products Table */}
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <Table headerTable={headerTable}>
                  {products.map((product, idx) => (
                    <tr key={product.id} className={`hover:bg-gray-750 transition-colors ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-825'}`}>
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center shadow-lg border border-gray-600">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{product.name}</div>
                        <div className="text-sm text-gray-400 mt-1">SKU: NM-{product.id.toString().padStart(4, '0')}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-300 font-medium">{product.maxQty}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-300 font-medium">{product.minQty}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Store className="w-4 h-4 text-red-400" />
                          <span className="text-sm">{product.location}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Locations */}
      <LocalList />
    </div>
  );
}

export default Inventory;