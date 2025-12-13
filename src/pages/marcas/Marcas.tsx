import { useState } from "react";
import {
  Package,
  Search,
  Edit3,
  Trash2,
  Plus,
  Award,
  Tag,
  TrendingUp,
} from "lucide-react";
import Table from "../../components/Table";
import MetricCard from "../../components/MetricCard";

type Brand = {
  id: number;
  name: string;
  description: string;
  products: number;
  country: string;
};

const headerTable = ["Ranking", "Marca", "Descripción", "Productos"];

export default function CondorMotorsBrands() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const brands: Brand[] = [
    {
      id: 1,
      name: "Michelin",
      description: "Líder mundial en neumáticos premium y alta performance",
      products: 45,
      country: "Francia",
    },
    {
      id: 2,
      name: "Bridgestone",
      description: "Innovación japonesa en tecnología de neumáticos",
      products: 38,
      country: "Japón",
    },
    {
      id: 3,
      name: "Goodyear",
      description: "Marca americana con más de 120 años de experiencia",
      products: 52,
      country: "USA",
    },
    {
      id: 4,
      name: "Continental",
      description: "Tecnología alemana de precisión y seguridad",
      products: 41,
      country: "Alemania",
    },
    {
      id: 5,
      name: "Pirelli",
      description: "Excelencia italiana en neumáticos deportivos",
      products: 29,
      country: "Italia",
    },
  ];

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = brands.reduce((sum, brand) => sum + brand.products, 0);
  const avgProducts = Math.round(totalProducts / brands.length);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
    {/* Main Content */}
    {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">
              INVENTARIO / Marcas
            </h2>
            <p className="text-gray-400">
              Gestiona las marcas de tus productos
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nueva Marca
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="bg-gray-800 border-b border-gray-700 p-8">
        <div className="grid grid-cols-3 gap-6">
          <MetricCard name="Total Marcas" value={brands.length} color="blue">
            <Award className="w-6 h-6 text-white" />
          </MetricCard>

          <MetricCard
            name="Total Productos"
            value={totalProducts}
            color="green"
          >
            <Package className="w-6 h-6 text-white" />
          </MetricCard>

          <MetricCard
            name="Promedio por Marca"
            value={avgProducts}
            color="purple"
          >
            <TrendingUp className="w-6 h-6 text-white" />
          </MetricCard>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-8 py-4">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar marcas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8">
        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden hover:shadow-2xl hover:border-red-500/50 transition-all group"
            >
              {/* Brand Header */}
              <div className="flex flex-row justify-between bg-gradient-to-br from-red-900/50 to-red-800/30 p-6 border-b border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {brand.name}
                </h3>
                <div className="flex items-center justify-end mb-4">
                  <div className="flex gap-2">
                    <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors shadow-md">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors shadow-md">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Brand Info */}
              <div className="p-6">
                <p className="text-gray-300 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {brand.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="mt-3 text-xs text-gray-500">
                    ID: BRN-{brand.id.toString().padStart(3, "0")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Productos:</span>
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {brand.products}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Brands Table */}
        <div className="mt-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4 border-b border-red-700">
            <h3 className="text-xl font-bold text-white">
              Ranking de Marcas por Productos
            </h3>
          </div>
          <div className="overflow-x-auto">
            <Table headerTable={headerTable}>
              {[...brands]
                .sort((a, b) => b.products - a.products)
                .map((brand, idx) => (
                  <tr
                    key={brand.id}
                    className={`hover:bg-gray-750 transition-colors ${
                      idx % 2 === 0 ? "bg-gray-800" : "bg-gray-825"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            idx === 0
                              ? "bg-yellow-500 text-gray-900"
                              : idx === 1
                              ? "bg-gray-400 text-gray-900"
                              : idx === 2
                              ? "bg-orange-600 text-white"
                              : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {idx + 1}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-semibold">
                          {brand.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-300 text-sm">
                        {brand.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {brand.products}
                      </span>
                    </td>
                  </tr>
                ))}
            </Table>
          </div>
        </div>
      </div>

      {/* Create Brand Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-lg">
            <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4 rounded-t-2xl border-b border-red-700">
              <h3 className="text-xl font-bold text-white">
                Registrar nueva marca
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Marca:
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Ej: Yokohama"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción:
                </label>
                <textarea
                  value={brandDesc}
                  onChange={(e) => setBrandDesc(e.target.value)}
                  placeholder="Describe las características de esta marca..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-750 rounded-b-2xl border-t border-gray-700 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors border border-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setBrandName("");
                  setBrandDesc("");
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
