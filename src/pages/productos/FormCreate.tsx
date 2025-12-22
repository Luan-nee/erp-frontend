import { useState, useEffect, useMemo} from 'react';
import Selector from '../../utils/Selector';
import ColorSelect from '../../utils/ColorSelect';
import type { PropColor } from '../../models/color';
import type { PropCategoria } from '../../models/categoria';
import type { PropMarca } from '../../models/marca';
import CategoriaService from '../../service/categoria.service';
import MarcaService from '../../service/marca.service';
import ColorService from '../../service/color.service';

interface ProductForm {
  nombre: string;
  descripcion: string;
  stock: number;
  stock_minimo: number;
  precio_compra: number;
  porcentaje_ganancia: number;
  esta_inhabilitado: boolean;
  categoria_id: number;
  color_id: number;
  marca_id: number;
}

interface PropFormCreate {
  setShowFormCreateProduct: (p: boolean) => void;
}

const FormCreate = ({ setShowFormCreateProduct }: PropFormCreate) => {
  const [formData, setFormData] = useState<ProductForm>({
    nombre: '',
    descripcion: '',
    stock: 0,
    stock_minimo: 0,
    precio_compra: 0,
    porcentaje_ganancia: 0,
    esta_inhabilitado: false,
    categoria_id: 0,
    color_id: 0,
    marca_id: 0,
  });

  const [selectCategoriaId, setSelectCategoriaId] = useState<number>(0);
  const [selectMarcaId, setSelectMarcaId] = useState<number>(0);
  const [selectColorId, setSelectColorId] = useState<number>(0);
  // const [selectColorId, setSelectColorId] = useState<number>(0);

  const categoriaService = useMemo(() => new CategoriaService(), []);
  const marcaService = useMemo(() => new MarcaService(), []);
  const colorService = useMemo(() => new ColorService(), []);
  // const colorService = useMemo(() => new ColorService(), []);

  const [isLoadingCategorias, setIsLoadingCategorias] = useState(false);
  const [isErrorCategorias, setIsErrorCategorias] = useState(false);
  const [categorias, setCategorias] = useState<PropCategoria[] | null>([]);

  const [isLoadingMarcas, setIsLoadingMarcas] = useState(false);
  const [isErrorMarcas, setIsErrorMarcas] = useState(false);
  const [marcas, setMarcas] = useState<PropMarca[] | null>([]);

  const [isLoadingColores, setIsLoadingColores] = useState(false);
  const [isErrorColores, setIsErrorColores] = useState(false);
  const [colores, setColores] = useState<PropColor[] | null>([]);

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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    console.log('Datos del formulario:', formData);
    alert('Producto guardado exitosamente');
  };

  return (
    // aplica estilos de tailwindcss para que la venta flote
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div className="h-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6 border-b border-slate-600 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">Nuevo Producto</h1>
          <p className="text-slate-300 mt-2">Gestiona el catálogo de productos</p>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-6">
          {/* Clasificación */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-600 pb-2">
              Clasificación
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Categoría *
                </label>
                <Selector 
                  opciones={categorias} 
                  onSelect={setSelectCategoriaId}
                  isLoading={isLoadingCategorias}
                  isError={isErrorCategorias}
                  placeholder="Seleccionar..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Marca *
                </label>
                <Selector 
                  opciones={marcas} 
                  onSelect={setSelectMarcaId}
                  isLoading={isLoadingMarcas}
                  isError={isErrorMarcas}
                  placeholder="Seleccionar..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Color *
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

          {/* Información básica */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-600 pb-2">
              Información Básica
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Ej: Laptop UltraPro 15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                placeholder="Describe las características del producto..."
              />
            </div>
          </div>

          {/* Inventario */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-600 pb-2">
              Inventario
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Stock Actual *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Stock Mínimo *
                </label>
                <input
                  type="number"
                  name="stock_minimo"
                  value={formData.stock_minimo}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Precios */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-600 pb-2">
              Precios y Ganancias
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Precio de Compra *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-400">$</span>
                  <input
                    type="number"
                    name="precio_compra"
                    value={formData.precio_compra}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Porcentaje de Ganancia *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="porcentaje_ganancia"
                    value={formData.porcentaje_ganancia}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.01"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="0.00"
                  />
                  <span className="absolute right-4 top-3 text-slate-400">%</span>
                </div>
              </div>
            </div>

            {formData.precio_compra > 0 && formData.porcentaje_ganancia > 0 && (
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <p className="text-sm text-blue-300">
                  Precio de Venta Calculado: 
                  <span className="font-bold text-xl ml-2">
                    ${(formData.precio_compra * (1 + formData.porcentaje_ganancia / 100)).toFixed(2)}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Estado */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-slate-600 pb-2">
              Estado
            </h2>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="esta_inhabilitado"
                checked={formData.esta_inhabilitado}
                onChange={handleChange}
                id="inhabilitado"
                className="w-5 h-5 bg-slate-700 border-slate-600 rounded focus:ring-2 focus:ring-red-500"
              />
              <label htmlFor="inhabilitado" className="text-slate-300 select-none cursor-pointer">
                Producto inhabilitado (no disponible para venta)
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-600">
            <button
              type="button"
              onClick={() => {setShowFormCreateProduct(false);}}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg"
            >
              Guardar Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreate;