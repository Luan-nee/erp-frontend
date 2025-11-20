import { useState } from 'react';
import { Package, Plus, Search, ShoppingCart, TrendingUp, Archive } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import LocalList from '../layouts/LocalList';
// import ProductCard from '../layouts/ProductCard';
import ProductCardTest from '../layouts/ProductCard-test';
import ProductDetailModal from '../modals/ProductDetailModal';

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  discount: string;
  price: number;
  image: string;
  status: 'active' | 'disabled';
}

interface ApiProduct {
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

const api_product: ApiProduct[] = [
  {
    id: 1,
    id_sucursal: 1,
    sku: 'P000001',
    nombre: 'Soporte de Motor Premium',
    descripcion: 'Soporte de motor de alta calidad para un rendimiento óptimo.',
    color_id: 2,
    categoria_id: 3,
    marca_id: 1,
    porcentaje_ganancia: 0.30,
    stock: 10,
    stock_minimo: 20,
    estaInhabilitado: true,
    fecha_creacion: '2023-10-01T10:00:00Z',
    fecha_actualizacion: '2023-10-10T15:30:00Z',
  },
  {
    id: 2,
    id_sucursal: 1,
    sku: 'P000002',
    nombre: 'Aceite para Motor Sintético 10W-40',
    descripcion: 'Aceite sintético de alto rendimiento ideal para motocicletas deportivas.',
    color_id: 1,
    categoria_id: 2,
    marca_id: 4,
    porcentaje_ganancia: 0.25,
    stock: 80,
    stock_minimo: 15,
    estaInhabilitado: false,
    fecha_creacion: '2023-09-15T12:20:00Z',
    fecha_actualizacion: '2023-10-05T09:00:00Z',
  },
  {
    id: 3,
    id_sucursal: 2,
    sku: 'P000003',
    nombre: 'Cadena Reforzada 428H',
    descripcion: 'Cadena de acero reforzado para uso en motocicletas de alto torque.',
    color_id: 3,
    categoria_id: 1,
    marca_id: 2,
    porcentaje_ganancia: 0.40,
    stock: 45,
    stock_minimo: 5,
    estaInhabilitado: false,
    fecha_creacion: '2023-08-22T08:15:00Z',
    fecha_actualizacion: '2023-10-02T14:10:00Z',
  },
  {
    id: 4,
    id_sucursal: 1,
    sku: 'P000004',
    nombre: 'Juego de Pastillas de Freno',
    descripcion: 'Pastillas de freno de compuesto cerámico de larga duración.',
    color_id: 4,
    categoria_id: 4,
    marca_id: 3,
    porcentaje_ganancia: 0.35,
    stock: 200,
    stock_minimo: 20,
    estaInhabilitado: false,
    fecha_creacion: '2023-07-11T16:40:00Z',
    fecha_actualizacion: '2023-09-29T12:00:00Z',
  },
  {
    id: 5,
    id_sucursal: 2,
    sku: 'P000005',
    nombre: 'Filtro de Aire Deportivo',
    descripcion: 'Filtro de aire de alto flujo para mejorar la respuesta del motor.',
    color_id: 5,
    categoria_id: 5,
    marca_id: 1,
    porcentaje_ganancia: 0.28,
    stock: 60,
    stock_minimo: 8,
    estaInhabilitado: true,
    fecha_creacion: '2023-06-30T09:50:00Z',
    fecha_actualizacion: '2023-10-12T11:25:00Z',
  },
  {
    id: 6,
    id_sucursal: 3,
    sku: 'P000006',
    nombre: 'Llanta 90/90-17 Tubeless',
    descripcion: 'Llanta resistente para motos de uso urbano, diseño antideslizante.',
    color_id: 1,
    categoria_id: 1,
    marca_id: 5,
    porcentaje_ganancia: 0.32,
    stock: 33,
    stock_minimo: 6,
    estaInhabilitado: false,
    fecha_creacion: '2023-09-01T13:00:00Z',
    fecha_actualizacion: '2023-10-08T17:45:00Z',
  },
  {
    id: 7,
    id_sucursal: 3,
    sku: 'P000007',
    nombre: 'Casco Integral ProShield',
    descripcion: 'Casco integral con visor antiempañante y certificación DOT.',
    color_id: 2,
    categoria_id: 6,
    marca_id: 6,
    porcentaje_ganancia: 0.50,
    stock: 20,
    stock_minimo: 3,
    estaInhabilitado: false,
    fecha_creacion: '2023-10-05T11:20:00Z',
    fecha_actualizacion: '2023-10-15T14:55:00Z',
  },
  {
    id: 8,
    id_sucursal: 1,
    sku: 'P000008',
    nombre: 'Guantes Antideslizantes RiderPlus',
    descripcion: 'Guantes ligeros, resistentes al desgaste y con agarre mejorado.',
    color_id: 3,
    categoria_id: 6,
    marca_id: 2,
    porcentaje_ganancia: 0.22,
    stock: 150,
    stock_minimo: 25,
    estaInhabilitado: false,
    fecha_creacion: '2023-10-03T15:00:00Z',
    fecha_actualizacion: '2023-10-14T18:30:00Z',
  }
]

const products: Product[] = [
    { 
      id: 1, 
      name: 'Soporte de Motor Premium', 
      category: 'Buscador',
      stock: 120, 
      discount: '2 x 1',
      price: 100.00,
      image: '🔧',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Kit de Suspensión Deportiva', 
      category: 'Buscador',
      stock: 50, 
      discount: '2 x 1',
      price: 50.00,
      image: '🔧',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Sistema de Frenos ABS', 
      category: 'Buscador',
      stock: 0, 
      discount: '2 x 1',
      price: 200.00,
      image: '🔧',
      status: 'disabled'
    }
  ];

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [isOpen, setIsOpen] = useState(true); // Mostrar el modal del producto
  // const [showAddProduct, setShowAddProduct] = useState(false);

  const categories = ['Todos', 'Buscador', 'Suspensión', 'Frenos', 'Motor'];

  const activeProducts = api_product.filter(p => p.estaInhabilitado === false);
  const disabledProducts = api_product.filter(p => p.estaInhabilitado === true);

  return (
    <div className="flex-1 flex overflow-hidden">

    <ProductDetailModal
      product={api_product[0]}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSave={(product) => {
        console.log("Producto guardado:", product);
        setIsOpen(false);
      }}
    />

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
              value={products.length}
              color="blue"
            >
              <Package className="w-8 h-8 text-white" />
            </MetricCard>

            
            <MetricCard
              name="Activos"
              value={activeProducts.length}
              color="green"
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </MetricCard>
            <MetricCard
              name="Inhabilitados"
              value={disabledProducts.length}
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
                {activeProducts.length} productos
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

              {activeProducts.map(product => (
                // <ProductCard key={product.id} {...product} />
                <ProductCardTest key={product.id} {...product} />
              ))}
            </div>
          </div>

          {/* Disabled Products */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold text-white">Productos Inhabilitados</h3>
              <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm font-medium border border-red-600/30">
                {disabledProducts.length} productos
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disabledProducts.map(product => (
                // <ProductCard key={product.id} {...product} />
                <ProductCardTest key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <LocalList />
    </div>
  );
}