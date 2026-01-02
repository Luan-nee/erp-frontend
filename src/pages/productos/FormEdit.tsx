import { useState, useEffect, useMemo } from 'react';
import { X, Save, Package } from 'lucide-react';
import Selector from '../../utils/Selector';
import ColorSelect from '../../utils/ColorSelect';
import type { ProductoUpdate } from '../../models/producto';
import CategoriaService from '../../service/categoria.service';
import MarcaService from '../../service/marca.service';
import ColorService from '../../service/color.service';
import ProductoService from '../../service/producto.service';
import type { PropCategoria } from '../../models/categoria';
import type { PropMarca } from '../../models/marca';
import type { PropColor } from '../../models/color';

interface ProductEditFormProps {
  refreshProductos: () => void;
  refreshResumen: () => void;
  setShowEditForm: (value: boolean) => void;
  idProducto: number;
  idSucursal: number;
}

const FormEdit: React.FC<ProductEditFormProps> = ({ 
  setShowEditForm,
  refreshProductos,
  refreshResumen,
  idProducto,
  idSucursal
}) => {
  const [selectCategoriaId, setSelectCategoriaId] = useState<number>(0);
  const [selectMarcaId, setSelectMarcaId] = useState<number>(0);
  const [selectColorId, setSelectColorId] = useState<number>(0);

  const [hayError, setHayError] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProductoUpdate>({
    nombre: '',
    descripcion: '',
    precio_compra: 0,
    categoria_id: 1,
    color_id: 1,
    marca_id: 1,
    stock: 0,
    stock_minimo: 0,
    porcentaje_ganancia: 0,
    esta_inhabilitado: false
  });

  const [isLoadingCategorias, setIsLoadingCategorias] = useState(false);
  const [isErrorCategorias, setIsErrorCategorias] = useState(false);
  const [categorias, setCategorias] = useState<PropCategoria[] | null>([]);

  const [isLoadingMarcas, setIsLoadingMarcas] = useState(false);
  const [isErrorMarcas, setIsErrorMarcas] = useState(false);
  const [marcas, setMarcas] = useState<PropMarca[] | null>([]);

  const [isLoadingColores, setIsLoadingColores] = useState(false);
  const [isErrorColores, setIsErrorColores] = useState(false);
  const [colores, setColores] = useState<PropColor[] | null>([]);

  const categoriaService = useMemo(() => new CategoriaService(), []);
  const marcaService = useMemo(() => new MarcaService(), []);
  const colorService = useMemo(() => new ColorService(), []);
  const productoService = useMemo(() => new ProductoService(), []);

  const refreshDataProducto = async () => {
    setHayError(false);
    setIsLoadingData(true);
    const {data, isLoading, hayError} = await productoService.dataProducto(idSucursal, idProducto);
    setIsLoadingData(isLoading);
    setHayError(hayError);
    if (data) {
      setFormData({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio_compra: data.precio_compra,
        categoria_id: data.categoria_id,
        color_id: data.color_id,
        marca_id: data.marca_id,
        stock: data.stock,
        stock_minimo: data.stock_minimo,
        porcentaje_ganancia: data.porcentaje_ganancia,
        esta_inhabilitado: data.esta_inhabilitado
      });
      setSelectCategoriaId(data.categoria_id);
      setSelectMarcaId(data.marca_id);
      setSelectColorId(data.color_id);
    }
  };

  const refreshColores = async () => {
    setIsErrorColores(false);
    setIsLoadingColores(true);
    const {data, isLoading, hayError} = await colorService.get();
    setIsLoadingColores(isLoading);
    setIsErrorColores(hayError);
    setColores(data);
  }

  const refreshCategorias = async () => {
    setIsErrorCategorias(false);
    setIsLoadingCategorias(true);
    const {data, isLoading, hayError} = await categoriaService.get();
    setIsLoadingCategorias(isLoading);
    setIsErrorCategorias(hayError);
    setCategorias(data);
  };

  const refreshMarcas = async () => {
    setIsErrorMarcas(false);
    setIsLoadingMarcas(true);
    const {data, isLoading, hayError} = await marcaService.get(); 
    setIsLoadingMarcas(isLoading);
    setIsErrorMarcas(hayError);
    setMarcas(data);
  }

  useEffect(() => {
    refreshColores();
    refreshCategorias();
    refreshMarcas();
    refreshDataProducto();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    const informacionProducto: ProductoUpdate = {
      ...formData,
      categoria_id: selectCategoriaId,
      marca_id: selectMarcaId,
      color_id: selectColorId
    };

    console.log('Datos del formulario:', informacionProducto);
    console.log('ID del producto a editar:', idProducto);

    // después de haber realizado las validaciones y el envio
    refreshProductos();
    refreshResumen();
    setShowEditForm(false);
  };

  const calculatePrecioVenta = () => {
    return (formData.precio_compra * (1 + formData.porcentaje_ganancia)).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div className="h-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl overflow-auto">
        {/* Header */}
        <div className="bg-[#17212e] px-6 py-5 flex items-center justify-between border-b border-gray-700 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="bg-red-600 p-3 rounded-xl">
              <Package className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Editar Producto</h2>
              <p className="text-sm text-gray-400 mt-1">Modifica los datos del producto</p>
            </div>
          </div>
          <button
            onClick={() => setShowEditForm(false)}
            className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Información Básica */}
          <div className="bg-[#243447] p-6 rounded-xl mb-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Información Básica</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Nombre del Producto <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full bg-[#17212e] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Ej: Laptop UltraPro 15&quot;"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Descripción <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-[#17212e] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  placeholder="Describe las características del producto..."
                />
              </div>
            </div>
          </div>

          {/* Precios y Ganancia */}
          <div className="bg-[#243447] p-6 rounded-xl mb-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Precios y Ganancia</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Precio de Compra (S/) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="precio_compra"
                  value={formData.precio_compra}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full bg-[#17212e] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Ganancia (%) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="porcentaje_ganancia"
                  value={formData.porcentaje_ganancia}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  max="10"
                  className="w-full bg-[#17212e] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Precio de Venta (S/)
                </label>
                <div className="w-full bg-green-900/30 border border-green-700 rounded-lg px-4 py-3 text-green-400 font-bold text-lg">
                  {calculatePrecioVenta()}
                </div>
              </div>
            </div>
          </div>

          {/* Inventario */}
          <div className="bg-[#243447] p-6 rounded-xl mb-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Inventario</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Stock Actual <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full bg-[#17212e] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Stock Mínimo <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="stock_minimo"
                  value={formData.stock_minimo}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full bg-[#17212e] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Clasificación */}
          <div className="bg-[#243447] p-6 rounded-xl mb-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Clasificación</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Categoría <span className="text-red-400">*</span>
                </label>
                <Selector 
                  idDefaultSelect={selectCategoriaId}
                  opciones={categorias} 
                  onSelect={setSelectCategoriaId}
                  isLoading={isLoadingCategorias}
                  isError={isErrorCategorias}
                  placeholder="Seleccionar..."
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Marca <span className="text-red-400">*</span>
                </label>
                <Selector 
                  idDefaultSelect={selectMarcaId}
                  opciones={marcas} 
                  onSelect={setSelectMarcaId}
                  isLoading={isLoadingMarcas}
                  isError={isErrorMarcas}
                  placeholder="Seleccionar..."
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Color <span className="text-red-400">*</span>
                </label>
                <ColorSelect
                  options={colores} 
                  selectedValue={selectColorId}
                  onChange={setSelectColorId}
                  isLoading={isLoadingColores}
                  isError={isErrorColores}
                  label="Seleccionar..."
                />
              </div>
            </div>
          </div>

          {/* Estado */}
          <div className="bg-[#243447] p-6 rounded-xl mb-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Estado del Producto</h3>
            
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input
                type="checkbox"
                name="esta_inhabilitado"
                checked={formData.esta_inhabilitado}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-600 bg-[#17212e] text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className={`font-semibold ${formData.esta_inhabilitado ? 'text-red-400' : 'text-green-400'}`}>
                {formData.esta_inhabilitado ? 'Producto Inhabilitado' : 'Producto Activo'}
              </span>
            </label>
            <p className="text-gray-400 text-sm mt-2 ml-8">
              {formData.esta_inhabilitado 
                ? 'Este producto no estará disponible para la venta' 
                : 'Este producto estará disponible para la venta'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#17212e] px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-700 sticky bottom-0">
          <button
            type="button"
            onClick={() => setShowEditForm(false)}
            className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all shadow-md"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormEdit;