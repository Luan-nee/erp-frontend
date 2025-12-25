import React, { useState } from 'react';
import { X, Save, Package } from 'lucide-react';

interface ProductEditData {
  nombre: string;
  descripcion: string;
  precio_compra: number;
  categoria_id: number;
  color_id: number;
  marca_id: number;
  stock: number;
  stock_minimo: number;
  porcentaje_ganancia: number;
  esta_inhabilitado: boolean;
}

interface ProductEditFormProps {
  setShowEditForm: (value: boolean) => void;
  initialData?: ProductEditData;
  onSave?: (data: ProductEditData) => void;
}

const FormEdit: React.FC<ProductEditFormProps> = ({ 
  setShowEditForm,
  initialData,
  onSave 
}) => {
  const [formData, setFormData] = useState<ProductEditData>(initialData || {
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
    if (onSave) {
      onSave(formData);
    }
    console.log('Datos del formulario:', formData);
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
                <select
                  name="categoria_id"
                  value={formData.categoria_id}
                  onChange={handleInputChange}
                  className="w-full bg-[#17212e] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="1">Electrónica</option>
                  <option value="2">Ropa</option>
                  <option value="3">Alimentos</option>
                  <option value="4">Hogar</option>
                  <option value="5">Deportes</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Marca <span className="text-red-400">*</span>
                </label>
                <select
                  name="marca_id"
                  value={formData.marca_id}
                  onChange={handleInputChange}
                  className="w-full bg-[#17212e] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="1">Samsung</option>
                  <option value="2">Apple</option>
                  <option value="3">Sony</option>
                  <option value="4">LG</option>
                  <option value="5">Dell</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Color <span className="text-red-400">*</span>
                </label>
                <select
                  name="color_id"
                  value={formData.color_id}
                  onChange={handleInputChange}
                  className="w-full bg-[#17212e] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option value="1">Negro</option>
                  <option value="2">Blanco</option>
                  <option value="3">Gris</option>
                  <option value="4">Azul</option>
                  <option value="5">Rojo</option>
                  <option value="6">Verde</option>
                  <option value="7">Amarillo</option>
                  <option value="8">Plateado</option>
                </select>
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