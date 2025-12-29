import { useCallback, useEffect, useMemo, useState } from 'react';
import { Package, Plus, Search, TrendingUp, Archive } from 'lucide-react';
import MetricCard from '../../components/MetricCard';
import LocalList from '../../layouts/LocalList';
import type { ProductoSelect, ProductoSelectById, ResumenProductos } from '../../models/producto';
import ProductCard from './ProductCard';
import type { PropCategoria } from '../../types/categoria';
import CategoriaService from '../../service/categoria.service';
import ProductoService from '../../service/producto.service';
import Selector from '../../utils/Selector';
import Loading from '../../animation/Loading';
import FormCreate from './FormCreate';
import ProductDetail from './ProductDetail';
import FormEdit from './FormEdit';

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectCategoriaId, setSelectCategoriaId] = useState<number>(0);
  const [selectIdSucursal, setSelectIdSucursal] = useState<number>(1); // por defecto seleccionamos la primera sucursal
  const [idProducto, setIdProducto] = useState<number>(-1);
  const [filtroEstadoProductos, setFiltroEstadoProductos] = useState<{
    nombre: 'activo' | 'inhabilitado',
    valor: boolean
  }>({nombre: 'activo', valor: true});
  
  const [showFormCreateProduct, setShowFormCreateProduct] = useState<boolean>(false);
  const [showProductDetail, setShowProductDetail] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  // const [showAddProduct, setShowAddProduct] = useState(false);
  const categoriaService = useMemo(() => new CategoriaService(), []);
  const productoService = useMemo(() => new ProductoService(), []);

  const [isLoadingCategorias, setIsLoadingCategorias] = useState<boolean>(true);
  const [isErrorCategorias, setIsErrorCategorias] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<PropCategoria[] | null>([]);

  const [isLoadingProductos, setIsLoadingProductos] = useState<boolean>(true);
  const [isErrorProductos, setIsErrorProductos] = useState<boolean>(false);
  const [productos, setProductos] = useState<ProductoSelect[] | null>([]);

  const [isLoadingResumen, setIsLoadingResumen] = useState<boolean>(true);
  const [isErrorResumen, setIsErrorResumen] = useState<boolean>(false);
  const [resumenProductos, setResumenProductos] = useState<ResumenProductos | null>(null);

  const refreschResumen = useCallback(async () => {
    setIsLoadingResumen(true);
    setIsErrorResumen(false);
    const {data, isLoading, hayError} = await productoService.getResumenProductos(selectIdSucursal);
    console.log("Resumen productos:", data);
    setResumenProductos(data);
    setIsLoadingResumen(isLoading);
    setIsErrorResumen(hayError);
  }, [productoService, selectIdSucursal]);

  const refreschProductos = useCallback(async () => {
    setIsLoadingProductos(true);
    setIsErrorProductos(false);
    const {data, isLoading, hayError} = await productoService.getDetallesProductos(selectIdSucursal);
    setProductos(data);
    setIsLoadingProductos(isLoading);
    setIsErrorProductos(hayError);
  }, [productoService, selectIdSucursal]);

  const refreshCategorias = useCallback(async () => {
    setIsLoadingCategorias(true);
    setIsErrorCategorias(false);
    const {data, isLoading, hayError} = await categoriaService.get();
    setCategorias(data);
    setIsLoadingCategorias(isLoading);
    setIsErrorCategorias(hayError);
  }, [categoriaService]);

  useEffect(()=> {
    refreschProductos();
    refreschResumen();
    refreshCategorias();
  }, [refreshCategorias, refreschProductos, refreschResumen, selectIdSucursal]);

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
              onClick={() => setShowFormCreateProduct(true)}
              disabled={selectIdSucursal !== 1}
              title={selectIdSucursal !== 1 ? "Para crear un producto es necesario están en el local central" : ""}
              className={`px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2
                ${selectIdSucursal !== 1 
                ? 'bg-slate-500 text-slate-300 border-slate-500 cursor-not-allowed opacity-70' // Estilos desactivado
                : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600 cursor-pointer' // Estilos activo
                }
                `}
            >
              <Plus className="w-5 h-5" />
              Nuevo Producto
            </button>
          </div>
        </header>

        {/* Search and Filter Bar */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-4">
          <div className="flex gap-4">
            {/* LA BARRA DE BUSQUE NO FUNCIONA POR EL MOMENTO */}
            <div className="flex-1 flex items-center relative">
              <div className="absolute left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <Selector 
                opciones={categorias} 
                onSelect={setSelectCategoriaId} 
                isLoading={isLoadingCategorias}
                isError={isErrorCategorias}
                placeholder="Filtrar por categoría"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <MetricCard
              name="Total Productos"
              value={(resumenProductos?.total_productos != null) ? resumenProductos.total_productos : 0}
              color="blue"
              isLoading={isLoadingResumen}
              isError={isErrorResumen}
            >
              <Package className="w-8 h-8 text-white" />
            </MetricCard>
            <MetricCard
              name="Activos"
              value={(resumenProductos?.activos != null) ? resumenProductos.activos : 0}
              color="green"
              isLoading={isLoadingResumen}
              isError={isErrorResumen}
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </MetricCard>
            <MetricCard
              name="Desactivados"
              value={(resumenProductos?.inhabilitados != null) ? resumenProductos.inhabilitados : 0}
              color="red"
              isLoading={isLoadingResumen}
              isError={isErrorResumen}
            >
              <Archive className="w-8 h-8 text-white" />
            </MetricCard>
          </div>

          {/* Botones de filtro simple */}
          <div className="flex justify-end gap-4 mb-4">
            <button
              onClick={() => setFiltroEstadoProductos({nombre: 'activo', valor: true})}
              type="button"
              className={`px-4 py-2 bg-gray-700 text-white rounded-lg font-medium transition-all ${
                filtroEstadoProductos.nombre === 'activo' ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : ''
              }`}
            >
              Activos 
            </button>
            <button
              onClick={() => setFiltroEstadoProductos({nombre: 'inhabilitado', valor: false})}
              type="button"
              className={`px-4 py-2 bg-gray-700 text-white rounded-lg font-medium transition-all ${
                filtroEstadoProductos.nombre === 'inhabilitado' ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : ''
              }`}
            >
              Inhabilitados 
            </button>
          </div>

          {/* Active Products */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold text-white">Productos</h3>
            </div>

            { isLoadingProductos ? (
              // implementa el componente Loading aqui
              <>
                <div className="mt-6 text-center text-blue-500">
                  Cargando los productos...
                </div>
                <div className="flex justify-center items-center mt-4">
                  <Loading 
                    w={16} 
                    h={16} 
                    color={'blue'}
                  />
                </div>
              </>
            ): isErrorProductos ? (
              <div className="mt-6 text-center text-red-500">
                Error al cargar los productos. Por favor, intenta de nuevo.
                {/* agrega un botón para recargar los productos*/}
                <div className="mt-4">
                  <button 
                    onClick={refreschProductos}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            ) : productos === null ? (
              <div className="mt-6 text-center text-gray-400">
                No se encontraron productos.
              </div>
            ) : ( 
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add Product Card */}
                { selectIdSucursal === 1 &&
                  <button 
                    onClick={() => setShowFormCreateProduct(true)}
                    className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-red-500 hover:bg-gray-750 transition-all group"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-red-400 transition-colors">
                      <Plus className="w-12 h-12 mb-3" />
                      <p className="font-semibold">Registrar Nuevo Producto</p>
                    </div>
                  </button>
                }
                {
                  productos.filter((producto) => producto.esta_inhabilitado == !filtroEstadoProductos.valor)?.map(product => (
                    <ProductCard 
                      key={product.id} 
                      id={product.id}
                      sku={product.sku}
                      nombre={product.nombre}
                      descripcion={product.descripcion}
                      stock={product.stock} 
                      stock_minimo={product.stock_minimo}
                      porcentaje_ganancia={product.porcentaje_ganancia}
                      esta_habilitado={!product.esta_inhabilitado}
                      setShowProductDetail={setShowProductDetail}
                      setShowFormEdit={setShowEditForm}
                      setIdProducto={setIdProducto}
                    />
                  ))
                }
              </div>
            )
            }

          </div>
        </div>
      </div>
      {/* Sidebar - Local List */}
      <LocalList setSelectIdSucursal={setSelectIdSucursal} selectIdSucursal={selectIdSucursal} />

      {/* Formulario para registrar un nuevo producto */}
      { showFormCreateProduct && 
        <FormCreate 
          refreshResumen={refreschResumen}
          refreshProductos={refreschProductos}
          setShowFormCreateProduct={setShowFormCreateProduct}
        />
      }

      {/* Detalle del producto */}
      { showProductDetail && 
        <ProductDetail 
          setShowProductDetail={setShowProductDetail}
          selectIdSucursal={selectIdSucursal}
          idProducto={idProducto}
        />
      }

      { showEditForm &&
        <FormEdit 
          refreshResumen={refreschResumen}
          refreshProductos={refreschProductos}
          setShowEditForm={setShowEditForm}
          idProducto={idProducto}
        />
      }
    </div>
  );
}