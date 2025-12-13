import { useState } from 'react';
import { X, Edit, Package, Tag, BarChart3, History, Info } from 'lucide-react';

interface Product {
  id: number;
  id_sucursal: number;
  sku: string;
  nombre: string;
  descripcion: string;
  color_id: number;
  categoria_id: number;
  marca_id: number;
  porcentaje_ganancia: number;
  stock: number;
  stock_minimo: number;
  estaInhabilitado: boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export default function ProductDetailView() {
  const [isOpen, setIsOpen] = useState(true);
  
  // Datos de ejemplo
  const product: Product = {
    id: 1,
    id_sucursal: 1,
    sku: 'P000001',
    nombre: 'Soporte de Motor Premium',
    descripcion: 'Soporte de motor de alta calidad para un rendimiento óptimo.',
    color_id: 2,
    categoria_id: 3,
    marca_id: 1,
    porcentaje_ganancia: 35.5,
    stock: 10,
    stock_minimo: 20,
    estaInhabilitado: false,
    fecha_creacion: '2023-10-01T05:00:00',
    fecha_actualizacion: '2023-12-13T10:30:00'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stockStatus = product.stock <= product.stock_minimo ? 'bajo' : 'normal';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex items-center justify-center">
      {isOpen && (
        <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl border border-slate-700 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-700 to-red-600 p-6 flex items-center justify-between sticky top-0 z-10 rounded-t-xl">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{product.nombre}</h1>
                <p className="text-red-100 text-sm">SKU: {product.sku}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Span 2 */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información General */}
              <div className="bg-slate-700 bg-opacity-50 rounded-lg p-5 border border-slate-600">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-bold text-white">Información General</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Nombre del Producto
                    </label>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white">
                      {product.nombre}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-1 block flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Descripción
                    </label>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white">
                      {product.descripcion}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        SKU
                      </label>
                      <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono">
                        {product.sku}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-slate-400 mb-1 block flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        ID Sucursal
                      </label>
                      <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white">
                        {product.id_sucursal}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clasificación */}
              <div className="bg-slate-700 bg-opacity-50 rounded-lg p-5 border border-slate-600">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-bold text-white">Clasificación</h2>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Categoría ID
                    </label>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white">
                      {product.categoria_id}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-1 block flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Marca ID
                    </label>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white">
                      {product.marca_id}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-1 block flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      Color ID
                    </label>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white">
                      {product.color_id}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm text-slate-400 mb-1 block flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Porcentaje de Ganancia
                  </label>
                  <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white">
                    {product.porcentaje_ganancia}%
                  </div>
                </div>
              </div>

              {/* Historial */}
              <div className="bg-slate-700 bg-opacity-50 rounded-lg p-5 border border-slate-600">
                <div className="flex items-center gap-2 mb-4">
                  <History className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-bold text-white">Historial</h2>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block flex items-center gap-2">
                      <History className="w-4 h-4" />
                      Fecha de Creación
                    </label>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white">
                      {formatDate(product.fecha_creacion)}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-1 block flex items-center gap-2">
                      <History className="w-4 h-4" />
                      Última Actualización
                    </label>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white">
                      {formatDate(product.fecha_actualizacion)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Estado */}
              <div className="bg-slate-700 bg-opacity-50 rounded-lg p-5 border border-slate-600">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <h2 className="text-lg font-bold text-white">Estado</h2>
                </div>
                
                <div className={`${
                  product.estaInhabilitado 
                    ? 'bg-red-900 bg-opacity-50 border-red-700' 
                    : 'bg-green-900 bg-opacity-50 border-green-700'
                } border rounded-lg p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      product.estaInhabilitado ? 'bg-red-500' : 'bg-green-500'
                    }`}></div>
                    <span className={`font-bold ${
                      product.estaInhabilitado ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {product.estaInhabilitado ? 'Inactivo' : 'Activo'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    {product.estaInhabilitado 
                      ? 'Este producto no está disponible para venta' 
                      : 'Este producto está disponible para venta'}
                  </p>
                </div>
              </div>

              {/* Inventario */}
              <div className="bg-slate-700 bg-opacity-50 rounded-lg p-5 border border-slate-600">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-bold text-white">Inventario</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">
                      Stock Actual
                    </label>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white text-2xl font-bold">
                      {product.stock}
                    </div>
                  </div>

                  {stockStatus === 'bajo' && (
                    <div className="bg-yellow-900 bg-opacity-50 border border-yellow-700 rounded-lg p-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <span className="text-sm text-yellow-200 font-medium">Stock Bajo</span>
                    </div>
                  )}

                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">
                      Stock Mínimo
                    </label>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white">
                      {product.stock_minimo}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Nivel de reorden</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}