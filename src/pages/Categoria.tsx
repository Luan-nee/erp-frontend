import { useState } from 'react';
import { Package, BarChart3, FolderOpen, Plus, Search, Tag, Edit3, Trash2 } from 'lucide-react';
import Table from '../components/Table';
import MetricCard from '../components/MetricCard';
import type { PropCategoria, PropResumenCategoria } from '../types/categoria';
import useFetcher from '../data/useFetcher';

function Categories() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const headerTable = [
    '',
    'Categoría',
    'Descripción',
    'Cant. de productos',
    'Acciones'
  ];

  const { data: categories, isLoading, hayError } = useFetcher("http://localhost:3000/api/categorias", "categorías");
  const { data: resumen, isLoading: resumenLoading, hayError: resumenError } = useFetcher("http://localhost:3000/api/resumen-categorias", "resumen categorías");

  const filteredCategories = (categories as PropCategoria[]).filter(cat => 
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">INVENTARIO / categorías</h2>
              <p className="text-gray-400">Gestiona las categorías de tus productos</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nueva Categoría
            </button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* Categories Table */}
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <Table headerTable={headerTable}>
                {filteredCategories.map((category, idx) => (
                    <tr key={category.id} className={`hover:bg-gray-750 transition-colors ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-825'}`}>
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                          <FolderOpen className="w-5 h-5 text-white" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="text-white font-semibold text-lg">{category.nombre}</div>
                            <div className="text-xs text-gray-400 mt-1">ID: CAT-{category.id.toString().padStart(3, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300 text-sm">{category.descripcion}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Tag className="w-4 h-4 text-red-400" />
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {category.cantidad_productos}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors shadow-md group relative">
                            <Edit3 className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Editar
                            </span>
                          </button>
                          <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors shadow-md group relative">
                            <Trash2 className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Eliminar
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </Table>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <MetricCard
              name="Total Categorías"
              value={(resumen as PropResumenCategoria[])[0]?.total_categorias || 0}
              color="red"
            >
              <FolderOpen className="w-6 h-6 text-white" />
            </MetricCard>


            <MetricCard
              name="Total Productos"
              value={(resumen as PropResumenCategoria[])[0]?.total_productos || 0}
              color="green"
            >
              <Package className="w-6 h-6 text-white" />
            </MetricCard>


            <MetricCard
              name="Promedio por Categoría"
              value={(resumen as PropResumenCategoria[])[0]?.promedio_categoria || 0}
              color="blue"
            >
              <BarChart3 className="w-6 h-6 text-white" />
            </MetricCard>
            
          </div>
        </div>
      </div>

      {/* Create Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-lg">
            <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4 rounded-t-2xl border-b border-red-700">
              <h3 className="text-xl font-bold text-white">Crear nueva categoría</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre de la categoría:
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ej: Neumáticos de Invierno"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción:
                </label>
                <textarea
                  value={categoryDesc}
                  onChange={(e) => setCategoryDesc(e.target.value)}
                  placeholder="Describe las características de esta categoría..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-750 rounded-b-2xl border-t border-gray-700 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors border border-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Lógica para guardar
                  setShowCreateModal(false);
                  setCategoryName('');
                  setCategoryDesc('');
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;