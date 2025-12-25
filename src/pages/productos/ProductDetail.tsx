import { useCallback, useEffect, useMemo, useState } from 'react';
import { X, Edit2, Package, TrendingUp, AlertCircle } from 'lucide-react';
import type { ProductoSelectById } from '../../models/producto';
import ProductoService from '../../service/producto.service';
import Loading from '../../animation/Loading';

/*
  La animación de carga para cada campo es innecesario, lo mejor sería remplazar todos
  los campos por un solo indicador de carga mientras se obtienen los datos del producto.
*/

interface ProductDetailProps {
  setShowProductDetail: (value: boolean) => void;
  selectIdSucursal: number;
  idProducto: number;
}

function formatDateString(dateString: string | undefined): string {
  const date = new Date(dateString ?? '');
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ setShowProductDetail, selectIdSucursal, idProducto }) => {
  const productoService = useMemo(() => new ProductoService(), []);

  const [productoSelectById, setProductoSelectById] = useState<ProductoSelectById | null>(null);
  const [isLoadingProductoById, setIsLoadingProductoById] = useState<boolean>(false);
  const [isErrorProductoById, setIsErrorProductoById] = useState<boolean>(false);

  const [fechaCreacion, setFechaCreacion] = useState<string | null>(null);
  const [fechaActualizacion, setFechaActualizacion] = useState<string | null>(null);

  const getProductoById = useCallback(async () => {
    setIsLoadingProductoById(true);
    setIsErrorProductoById(false);
    let {data, isLoading, hayError} = await productoService.getById(selectIdSucursal, idProducto);
    setFechaCreacion( formatDateString(data?.fecha_creacion.toString()) );
    setFechaActualizacion( formatDateString(data?.fecha_actualizacion.toString()) );
    setProductoSelectById(data);
    setIsLoadingProductoById(isLoading);
    setIsErrorProductoById(hayError);
  }, [productoService, selectIdSucursal, idProducto]);

  useEffect(() => {
    getProductoById();
  }, [getProductoById]);

  const calculatePrecioVenta = () => {
    const precioCompra =  productoSelectById?.precio_compra || 0;
    const ganancia = productoSelectById?.porcentaje_ganancia || 0;
    return (precioCompra * (1 + ganancia)).toFixed(2);
  };

  const stockStatus = (productoSelectById?.stock || 0) <= (productoSelectById?.stock_minimo || 0);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div className="h-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl overflow-auto">
        {/* Header */}
        <div className="bg-[#17212e] px-6 py-5 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Package className="w-7 h-7 text-white" />
            </div>
              { isLoadingProductoById ? (
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">Cargando...</h2>
                    <Loading 
                      w={6}
                      h={6}
                      color="white"
                    />
                  </div>
                ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Detalle del Producto</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-400">SKU: {productoSelectById?.sku}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-sm text-gray-400">ID: {productoSelectById?.id}</span>
                      <span className="text-gray-600">•</span>
                      <span className={`font-semibold ${productoSelectById?.esta_inhabilitado ? 'text-red-400' : 'text-green-400'}`}>
                        {productoSelectById?.esta_inhabilitado ? 'Producto Inhabilitado' : 'Producto Activo'}
                      </span>
                    </div>
                  </div>
                )
              }
          </div>
          <button
            onClick={() => setShowProductDetail(false)}
            className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Product Info Section */}
          <div className="bg-[#243447] p-6 rounded-xl mb-6 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-3">{productoSelectById?.nombre}</h3>
            <p className="text-gray-300 leading-relaxed">{productoSelectById?.descripcion}</p>
          </div>

          {/* Status Badge */}
          <div className="mb-6">
          </div>

          {/* Price & Profit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 rounded-xl shadow-lg">
              <p className="text-blue-200 text-sm font-medium mb-1">Precio de Compra</p>
              {
                isLoadingProductoById ? (
                  <Loading 
                    w={6}
                    h={6}
                    color="white"
                  />
                ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-white">{`S/ ${productoSelectById?.precio_compra}`}</p>
                )
              }
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 p-5 rounded-xl shadow-lg">
              <p className="text-green-200 text-sm font-medium mb-1">Precio de Venta</p>
              {
                isLoadingProductoById ? (
                  <Loading 
                    w={6}
                    h={6}
                    color="white"
                  />
                ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-white">{`S/ ${calculatePrecioVenta().toString()}`}</p>
                )
              }
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-5 rounded-xl shadow-lg flex items-center justify-between">
              <div>
                <p className="text-emerald-200 text-sm font-medium mb-1">Ganancia</p>
                {
                  isLoadingProductoById ? (
                    <Loading 
                      w={6}
                      h={6}
                      color="white"
                    />
                  ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                  ) : (
                    <p className="text-3xl font-bold text-white">{productoSelectById?.porcentaje_ganancia}</p>
                  )
                }
              </div>
              <TrendingUp className="w-10 h-10 text-emerald-200 opacity-50" />
            </div>
          </div>

          {/* Stock Alert */}
          {stockStatus && (
            <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-xl p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-semibold">Stock Bajo</p>
                <p className="text-red-300 text-sm">El stock actual está en el nivel mínimo o por debajo</p>
              </div>
            </div>
          )}

          {/* Inventory Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className={`p-5 rounded-xl border-2 ${stockStatus ? 'bg-red-900 bg-opacity-20 border-red-700' : 'bg-[#243447] border-gray-700'}`}>
              <p className="text-gray-400 text-sm font-medium mb-2">Stock Actual</p>
              {
                isLoadingProductoById ? (
                  <Loading
                    w={6}
                    h={6}
                    color="white"
                  />
                ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                ) : (
                  <p className={`text-4xl font-bold ${stockStatus ? 'text-red-400' : 'text-white'}`}>
                    {productoSelectById?.stock}
                  </p>
                )
              }
              <p className="text-gray-400 text-sm mt-1">unidades disponibles</p>
            </div>

            <div className="bg-[#243447] p-5 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-sm font-medium mb-2">Stock Mínimo</p>
              {
                isLoadingProductoById ? (
                  <Loading
                    w={6}
                    h={6}
                    color="white"
                  />
                ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                ) : (
                  <p className="text-4xl font-bold text-white">{productoSelectById?.stock_minimo}</p>
                )
              }
              <p className="text-gray-400 text-sm mt-1">nivel de reposición</p>
            </div>
          </div>

          {/* Additional Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#243447] p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-xs font-medium mb-1.5">CATEGORÍA</p>
              {
                isLoadingProductoById ? (
                  <Loading 
                    w={6}
                    h={6}
                    color="white"
                  />
                ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                ) : (
                  <p className="text-white text-lg font-semibold">{productoSelectById?.categoria}</p>
                )
              }
            </div >

            <div className="bg-[#243447] p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-xs font-medium mb-1.5">MARCA</p>
              {
                isLoadingProductoById ? (
                  <Loading 
                    w={6}
                    h={6}
                    color="white"
                  />
                ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                ) : (
                  <p className="text-white text-lg font-semibold">{productoSelectById?.marca}</p>
                )
              }
            </div>

            <div className="bg-[#243447] p-4 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-xs font-medium mb-1.5">COLOR</p>
              {
                isLoadingProductoById ? (
                  <Loading 
                    w={6}
                    h={6}
                    color="white"
                  />
                ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                ) : (
                  <p className="text-white text-lg font-semibold">{productoSelectById?.color}</p>
                )
              }
            </div>
          </div>

          {/* Dates Section */}
          <div className="bg-[#17212e] p-5 rounded-xl border border-gray-700">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Información Temporal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">Fecha de Creación</p>
                {
                  isLoadingProductoById ? (
                    <Loading 
                      w={6}
                      h={6}
                      color="white"
                    />
                  ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                  ) : (
                    <p className="text-gray-300 text-sm">
                      {fechaCreacion}
                    </p>
                  )
                }
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Última Actualización</p>
                { 
                  isLoadingProductoById ? (
                    <Loading 
                      w={6}
                      h={6}
                      color="white"
                    />
                  ) : isErrorProductoById ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white">Error al cargar el producto</h2>
                  </div>
                  ) : (
                    <p className="text-gray-300 text-sm">
                      {fechaActualizacion}
                      </p>
                  )
                }
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#17212e] px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-700">
          <button
            onClick={() => setShowProductDetail(false)}
            className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all shadow-md"
          >
            Cerrar
          </button>
          <button
            onClick={() => alert('Función de editar')}
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-lg"
          >
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;