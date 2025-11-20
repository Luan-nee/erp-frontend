import { useState } from "react";
import {
  X,
  Package,
  Edit3,
  Save,
  XCircle,
  CheckCircle,
  AlertCircle,
  Barcode,
  Tag,
  TrendingUp,
  Box,
  Calendar,
  MapPin,
  Palette,
  Building2,
} from "lucide-react";

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

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onSave,
}: ProductDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Formatear fechas
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calcular estado del stock
  const getStockStatus = (stock: number, stockMinimo: number) => {
    if (stock === 0) {
      return { label: "Sin Stock", color: "red", icon: XCircle };
    } else if (stock <= stockMinimo) {
      return { label: "Stock Bajo", color: "yellow", icon: AlertCircle };
    } else {
      return { label: "Stock Normal", color: "green", icon: CheckCircle };
    }
  };

  const stockStatus = getStockStatus(
    editedProduct.stock,
    editedProduct.stock_minimo
  );
  const StatusIcon = stockStatus.icon;

  // Validar campos
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editedProduct.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }
    if (!editedProduct.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
    }
    if (editedProduct.stock < 0) {
      newErrors.stock = "El stock no puede ser negativo";
    }
    if (editedProduct.stock_minimo < 0) {
      newErrors.stock_minimo = "El stock mínimo no puede ser negativo";
    }
    if (
      editedProduct.porcentaje_ganancia < 0 ||
      editedProduct.porcentaje_ganancia > 1
    ) {
      newErrors.porcentaje_ganancia = "El porcentaje debe estar entre 0 y 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los campos
  const handleChange = (field: keyof Product, value: any) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Guardar cambios
  const handleSave = () => {
    if (validateForm()) {
      const updatedProduct = {
        ...editedProduct,
        fecha_actualizacion: new Date().toISOString(),
      };
      if (onSave) {
        onSave(updatedProduct);
      }
      setIsEditing(false);
    }
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditedProduct(product);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4 border-b border-red-700 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-red-900" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {editedProduct.nombre}
                </h3>
                <p className="text-sm text-red-200 flex items-center gap-2 mt-1">
                  SKU: {editedProduct.sku}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Editar
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Guardar
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna Izquierda - Información General */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información General */}
              <Section
                title="Información General"
                icon={<Package className="w-5 h-5 text-blue-400" />}
              >
                <FormField
                  label="Nombre del Producto"
                  value={editedProduct.nombre}
                  isEditing={isEditing}
                  error={errors.nombre}
                  onChange={(value) => handleChange("nombre", value)}
                  icon={<Tag className="w-4 h-4 text-blue-400" />}
                />

                <FormField
                  label="Descripción"
                  value={editedProduct.descripcion}
                  isEditing={isEditing}
                  error={errors.descripcion}
                  onChange={(value) => handleChange("descripcion", value)}
                  multiline
                  icon={<Package className="w-4 h-4 text-purple-400" />}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="SKU"
                    value={editedProduct.sku}
                    isEditing={false}
                    readOnly
                    icon={<Barcode className="w-4 h-4 text-green-400" />}
                  />
                  <FormField
                    label="ID Sucursal"
                    value={editedProduct.id_sucursal}
                    isEditing={isEditing}
                    type="number"
                    onChange={(value) =>
                      handleChange("id_sucursal", parseInt(value))
                    }
                    icon={<MapPin className="w-4 h-4 text-orange-400" />}
                  />
                </div>
              </Section>

              {/* Clasificación */}
              <Section
                title="Clasificación"
                icon={<Tag className="w-5 h-5 text-green-400" />}
              >
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    label="Categoría ID"
                    value={editedProduct.categoria_id}
                    isEditing={isEditing}
                    type="number"
                    onChange={(value) =>
                      handleChange("categoria_id", parseInt(value))
                    }
                    icon={<Tag className="w-4 h-4 text-blue-400" />}
                  />
                  <FormField
                    label="Marca ID"
                    value={editedProduct.marca_id}
                    isEditing={isEditing}
                    type="number"
                    onChange={(value) =>
                      handleChange("marca_id", parseInt(value))
                    }
                    icon={<Building2 className="w-4 h-4 text-purple-400" />}
                  />
                  <FormField
                    label="Color ID"
                    value={editedProduct.color_id}
                    isEditing={isEditing}
                    type="number"
                    onChange={(value) =>
                      handleChange("color_id", parseInt(value))
                    }
                    icon={<Palette className="w-4 h-4 text-pink-400" />}
                  />
                </div>
              </Section>

              {/* Historial */}
              <Section
                title="Historial"
                icon={<Calendar className="w-5 h-5 text-blue-400" />}
              >
                <div className="space-y-3">
                  <InfoRow
                    label="Fecha de Creación"
                    value={formatDate(editedProduct.fecha_creacion)}
                    icon={<Calendar className="w-4 h-4 text-blue-400" />}
                  />
                  <InfoRow
                    label="Última Actualización"
                    value={formatDate(editedProduct.fecha_actualizacion)}
                    icon={<Calendar className="w-4 h-4 text-purple-400" />}
                  />
                </div>
              </Section>
            </div>

            {/* Columna Derecha - Inventario y Estado */}
            <div className="space-y-6">
              {/* Estado */}
              <Section
                title="Estado"
                icon={<AlertCircle className="w-5 h-5 text-yellow-400" />}
              >
                <div className="space-y-4">
                  <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!editedProduct.estaInhabilitado}
                        onChange={(e) =>
                          handleChange("estaInhabilitado", !e.target.checked)
                        }
                        disabled={!isEditing}
                        className="w-5 h-5 rounded border-gray-600 text-green-600 focus:ring-2 focus:ring-green-500"
                      />
                      <div>
                        <p className="text-white font-medium">
                          Producto Activo
                        </p>
                        <p className="text-xs text-gray-400">
                          Disponible para venta
                        </p>
                      </div>
                    </label>
                  </div>

                  <div
                    className={`p-4 rounded-lg border ${
                      editedProduct.estaInhabilitado
                        ? "bg-red-500/10 border-red-500/30"
                        : "bg-green-500/10 border-green-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {editedProduct.estaInhabilitado ? (
                        <XCircle className="w-5 h-5 text-red-400" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      <span
                        className={`font-bold ${
                          editedProduct.estaInhabilitado
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {editedProduct.estaInhabilitado
                          ? "Inhabilitado"
                          : "Activo"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {editedProduct.estaInhabilitado
                        ? "Este producto no está disponible para venta"
                        : "Este producto está disponible para venta"}
                    </p>
                  </div>
                </div>
              </Section>

              {/* Inventario */}
              <Section
                title="Inventario"
                icon={<Box className="w-5 h-5 text-purple-400" />}
              >
                <div className="space-y-4">
                  <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                    <FormField
                      label="Stock Actual"
                      value={editedProduct.stock}
                      isEditing={isEditing}
                      type="number"
                      error={errors.stock}
                      onChange={(value) =>
                        handleChange("stock", parseInt(value) || 0)
                      }
                    />
                    <div
                      className={`mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold ${
                        stockStatus.color === "green"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : ""
                      }${
                        stockStatus.color === "yellow"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : ""
                      }
                    ${
                      stockStatus.color === "red"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : ""
                    }`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      {stockStatus.label}
                    </div>
                  </div>

                  <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                    <FormField
                      label="Stock Mínimo"
                      value={editedProduct.stock_minimo}
                      isEditing={isEditing}
                      type="number"
                      error={errors.stock_minimo}
                      onChange={(value) =>
                        handleChange("stock_minimo", parseInt(value) || 0)
                      }
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Nivel de reorden
                    </p>
                  </div>
                </div>
              </Section>

              {/* Financiero */}
              <Section
                title="Información Financiera"
                icon={<TrendingUp className="w-5 h-5 text-green-400" />}
              >
                <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                  <FormField
                    label="Porcentaje de Ganancia (%)"
                    value={(editedProduct.porcentaje_ganancia * 100).toFixed(2)}
                    isEditing={isEditing}
                    type="number"
                    step="0.01"
                    error={errors.porcentaje_ganancia}
                    onChange={(value) =>
                      handleChange(
                        "porcentaje_ganancia",
                        parseFloat(value) / 100 || 0
                      )
                    }
                  />
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">
                      Margen de Ganancia
                    </p>
                    <p className="text-3xl font-bold text-green-400">
                      {(editedProduct.porcentaje_ganancia * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Section
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h4>
      {children}
    </div>
  );
}

// Componente FormField
interface FormFieldProps {
  label: string;
  value: string | number;
  isEditing: boolean;
  onChange?: (value: string) => void;
  error?: string;
  type?: "text" | "number";
  step?: string;
  multiline?: boolean;
  readOnly?: boolean;
  icon?: React.ReactNode;
}

function FormField({
  label,
  value,
  isEditing,
  onChange,
  error,
  type = "text",
  step,
  multiline,
  readOnly,
  icon,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
        {icon}
        {label}
      </label>
      {isEditing && !readOnly ? (
        <>
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 bg-gray-700 border ${
                error ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none`}
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              step={step}
              className={`w-full px-4 py-3 bg-gray-700 border ${
                error ? "border-red-500" : "border-gray-600"
              } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
            />
          )}
          {error && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
        </>
      ) : (
        <div className="px-4 py-3 bg-gray-700/50 border border-gray-700 rounded-lg text-white">
          {multiline ? (
            <p className="whitespace-pre-wrap">{value}</p>
          ) : (
            <p>{value}</p>
          )}
        </div>
      )}
    </div>
  );
}

// Componente InfoRow
function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-400">{label}:</span>
      </div>
      <span className="text-sm text-white font-medium">{value}</span>
    </div>
  );
}

// Ejemplo de uso
export function ProductDetailModalExample() {
  const [isOpen, setIsOpen] = useState(true);

  const sampleProduct: Product = {
    id: 8,
    id_sucursal: 1,
    sku: "P000008",
    nombre: "Guantes Antideslizantes RiderPlus",
    descripcion:
      "Guantes ligeros, resistentes al desgaste y con agarre mejorado.",
    color_id: 3,
    categoria_id: 6,
    marca_id: 2,
    porcentaje_ganancia: 0.22,
    stock: 150,
    stock_minimo: 25,
    estaInhabilitado: false,
    fecha_creacion: "2023-10-03T15:00:00Z",
    fecha_actualizacion: "2023-10-14T18:30:00Z",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium"
      >
        Abrir Modal de Producto
      </button>

      <ProductDetailModal
        product={sampleProduct}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={(product) => {
          console.log("Producto guardado:", product);
          setIsOpen(false);
        }}
      />
    </div>
  );
}
