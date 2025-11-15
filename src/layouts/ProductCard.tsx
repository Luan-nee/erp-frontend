import { Edit3, ShoppingCart, Tag } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  discount: string;
  price: number;
  image: string;
  status: "active" | "disabled";
}

export default function ProductCard(productProp: Product) {
  return (
    <div
      key={productProp.id}
      className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden hover:shadow-2xl hover:border-red-500/50 transition-all group"
    >
      {productProp.status === "disabled" ? (
        <div
          key={productProp.id}
          className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden opacity-75"
        >
          <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 h-48 flex items-center justify-center">
            <div className="text-6xl grayscale">{productProp.image}</div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-red-600 px-4 py-2 rounded-lg">
                <p className="text-white font-bold">INHABILITADO</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <h4 className="text-lg font-bold text-gray-400 mb-2">
              {productProp.name}
            </h4>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Tag className="w-4 h-4" />
              <span>{productProp.category}</span>
            </div>

            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-400 text-sm font-bold rounded-full">
                Tipo de descuento: {productProp.discount}
              </span>
            </div>

            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors">
              Habilitar producto
            </button>
          </div>
        </div>
      ) : (
        <div
          key={productProp.id}
          className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden hover:shadow-2xl hover:border-red-500/50 transition-all group"
        >
          {/* Product Image */}
          <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 h-48 flex items-center justify-center">
            <div className="text-6xl">{productProp.image}</div>
            <div className="absolute top-3 right-3 flex gap-2">
              {productProp.stock > 0 && productProp.stock < 100 && (
                <span className="px-3 py-1 bg-yellow-600/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  Stock Bajo
                </span>
              )}
            </div>
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-red-600/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                Stock: {productProp.stock}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-5">
            <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">
              {productProp.name}
            </h4>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <Tag className="w-4 h-4" />
              <span>{productProp.category}</span>
            </div>

            {/* Discount Badge */}
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-bold rounded-full">
                Tipo de descuento: {productProp.discount}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-green-400">
                S/ {productProp.price.toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Actualizar stock
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
