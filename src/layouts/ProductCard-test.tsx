// Definición de la interfaz basada en tu JSON
export interface Product {
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


export default function ProductCardTest(product: Product) {
  const isLowStock = product.stock <= product.stock_minimo;

  // Estilos de estado idénticos a la imagen (textos más oscuros sobre fondos claros)
  const statusStyles = product.estaInhabilitado
    ? "bg-red-600/20 text-red-400 border-red-600/30"
    : "bg-green-600/20 text-green-400 border-green-600/30";

  const statusLabel = product.estaInhabilitado ? "Inhabilitado" : "Activo";

  return (
    // CAMBIO PRINCIPAL: Fondo oscuro (bg-gray-800) y borde oscuro (border-gray-700)
    <article className="w-full max-w-sm bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden flex flex-col h-full p-5">
      
      {/* Encabezado: SKU y Badge */}
      <div className="flex justify-between items-start mb-3">
        {/* SKU: Color gris medio para que no resalte demasiado */}
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {product.sku}
        </span>
        <span className={`px-3 py-1 text-sm font-medium border rounded-full ${statusStyles}`}>
          {statusLabel}
        </span>
      </div>

      {/* Nombre del Producto */}
      {/* CAMBIO: Texto blanco (text-white) para contraste con fondo oscuro */}
      <h3
        className="text-lg font-bold text-white mb-2 line-clamp-1 leading-tight"
        title={product.nombre}
      >
        {product.nombre}
      </h3>

      {/* Descripción */}
      {/* CAMBIO: Gris más claro (text-gray-400) para lectura en fondo oscuro */}
      <p className="text-sm text-gray-400 mb-6 line-clamp-2 h-10 leading-relaxed">
        {product.descripcion}
      </p>

      {/* Datos Clave */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        {/* Columna STOCK */}
        <div className="flex flex-col">
          {/* Labels en mayúsculas: Gris oscuro pero legible */}
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Stock
          </span>
          <div className="flex items-baseline gap-1">
            {/* Números: Blanco (text-white) o Ámbar brillante si es alerta */}
            <span className={`text-2xl font-extrabold ${isLowStock ? 'text-amber-500' : 'text-white'}`}>
              {product.stock}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              / min {product.stock_minimo}
            </span>
          </div>
        </div>

        {/* Columna GANANCIA */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Ganancia
          </span>
          {/* Número: Blanco puro */}
          <span className="text-2xl font-extrabold text-white">
             {(product.porcentaje_ganancia * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Botón de Acción */}
      {/* Se mantiene el azul vibrante (bg-blue-600) pero se quitó la sombra clara (shadow-blue-200) que se ve mal en dark mode */}
      <button
        onClick={() => console.log("Ver detalles de:", product)}
        className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
      >
        Ver Detalles
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </article>
  );
};
