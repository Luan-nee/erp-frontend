import { useState } from 'react';
import { Package, Plus, Search, ShoppingCart, TrendingUp, Archive } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import LocalList from '../layouts/LocalList';
import useFetcher from '../data/useFetchet';
import type { PropProductoResumen } from '../types/producto';
import ProductCard from './productos/ProductCard';

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [selectIdSucursal, setSelectIdSucursal] = useState<number>(1); // por defecto seleccionamos la primera sucursal
  // const [showAddProduct, setShowAddProduct] = useState(false);

  const categories = ['Todos', 'Buscador', 'Suspensión', 'Frenos', 'Motor'];
  
  const { data: products, isLoading, hayError, refetch } = useFetcher(`http://localhost:3000/api/productos?id_sucursal=${selectIdSucursal}`,`productos de la sucursal ${selectIdSucursal}`);
  const productos = products as PropProductoResumen[];

  return (
    <div className="flex-1 flex overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">INVENTARIO / productos</h2>
              <p className="text-gray-400">Gestiona el catálogo de productos</p>
            </div>
            <button 
              // onClick={() => setShowAddProduct(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nuevo Producto
            </button>
          </div>
        </header>

        {/* Search and Filter Bar */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    filterCategory === cat
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            
            <MetricCard
              name="Total Productos"
              value={30}
              color="blue"
            >
              <Package className="w-8 h-8 text-white" />
            </MetricCard>

            
            <MetricCard
              name="Activos"
              value={10}
              color="green"
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </MetricCard>
            <MetricCard
              name="Inhabilitados"
              value={77}
              color="red"
            >
              <Archive className="w-8 h-8 text-white" />
            </MetricCard>

            <MetricCard
              name="Stock Total"
              value={170}
              color="purple"
            >
              <ShoppingCart className="w-8 h-8 text-white" />
            </MetricCard>
          </div>

          {/* Active Products */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold text-white">Productos Activos</h3>
              <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium border border-green-600/30">
                {(products as PropProductoResumen[]).filter(p => p.esta_habilitado === true).length} productos
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add Product Card */}
              <button 
                // onClick={() => setShowAddProduct(true)}
                className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-red-500 hover:bg-gray-750 transition-all group"
              >
                <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-red-400 transition-colors">
                  <Plus className="w-12 h-12 mb-3" />
                  <p className="font-semibold">Agregar Producto</p>
                </div>
              </button>

              {productos.map(product => (
                // <ProductCard key={product.id} {...product} />
                <ProductCard key={product.id} 
                  id={product.id}
                  sku={product.sku}
                  nombre={product.nombre}
                  descripcion={product.descripcion}
                  stock={product.stock} 
                  stock_minimo={product.stock_minimo}
                  porcentaje_ganancia={product.porcentaje_ganancia}
                  esta_habilitado={product.esta_habilitado}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar - Local List */}
      <LocalList setSelectIdSucursal={setSelectIdSucursal} selectIdSucursal={selectIdSucursal} />
    </div>
  );
}