import { useState } from "react";
import {
  Package,
  BarChart3,
  FolderOpen,
  Plus,
  Search,
} from "lucide-react";
import Table from "../../components/Table";
import MetricCard from "../../components/MetricCard";
import RowTable from "./RowTable";
import type {
  PropCategoria,
  PropResumenCategoria,
} from "../../types/categoria";
// import useFetcher from "../../data/useFetcher";
import useFetcher from "../../data/useFetchet";
import FormCreate from "./FormCreate";
import FormEdit from "./FormEdit";
import FormDelete from "./FormDelete";
import Loading from "../../animation/Loading";

function Categories() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowFormDelete] = useState(false);

  const [idCategoriaEdit, setIdCategoriaEdit] = useState<number | null>(null);
  const [idCategoriaDelete, setIdCategoriaDelete] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: categories,
    isLoading: categoriesLoading,
    hayError: categoriesError,
    refetch: refetchCategorias,
  } = useFetcher("http://localhost:3000/api/categorias", "categorías");
  const {
    data: resumen,
    isLoading: resumenLoading,
    hayError: resumenError,
    refetch: refetchResumen,
  } = useFetcher(
    "http://localhost:3000/api/resumen-categorias",
    "resumen categorías"
  );

  const filteredCategories = categories as PropCategoria[];

  const headerTable = [
    "",
    "Categoría",
    "Descripción",
    "Cant. de productos",
    "Acciones",
  ];

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                INVENTARIO / categorías
              </h2>
              <p className="text-gray-400">
                Gestiona las categorías de tus productos
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nueva Categoría
            </button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* Categories Table */}
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <Table headerTable={headerTable}>
                {categoriesLoading ? (
                  <tr>
                    <td
                      colSpan={headerTable.length}
                      className="flex flex-row items-center justify-center py-6"
                    >
                      <p className="px-6 py-4 text-center text-gray-400">
                        Cargando categorías...  
                      </p>
                      <Loading w={8} h={8} color="red" />
                    </td>
                  </tr>
                ) : categoriesError ? (
                  <tr>
                    <td
                      colSpan={headerTable.length}
                      className="px-6 py-4 text-center text-red-500"
                    >
                      Error al cargar las categorías.{" "}
                      <button
                        onClick={() => refetchCategorias()}
                        className="underline text-red-400 hover:text-red-600"
                      >
                        Recargar página
                      </button>
                    </td>
                    
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <RowTable
                      key={category.id}
                      id={category.id}
                      nombre={category.nombre}
                      descripcion={category.descripcion}
                      cantidad_productos={category.cantidad_productos}
                      setShowFormModal={setShowFormModal}
                      setIdCategoriaEdit={setIdCategoriaEdit}
                      setShowFormDelete={setShowFormDelete}
                      setIdCategoriaDelete={setIdCategoriaDelete}
                    />
                  ))
                )}
              </Table>
            </div>
          </div>

          {/* Stats Cards */}
            {
              resumenError ? (
                <div className="col-span-3 px-6 py-4 text-center text-red-500">
                  Error al cargar el resumen de categorías.{" "}
                  <button
                    onClick={() => refetchResumen()}
                    className="underline text-red-400 hover:text-red-600"
                  >
                    Recargar resumen
                  </button>
                </div>
              ): (
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <MetricCard
                    name="Total Categorías"
                    isError={resumenError} 
                    isLoading={resumenLoading} 
                    value={(resumen as PropResumenCategoria[])[0]?.total_categorias}
                    color="red"
                  >
                    <FolderOpen className="w-6 h-6 text-white" />
                  </MetricCard>

                  <MetricCard
                    name="Total Productos"
                    isError={resumenError} 
                    isLoading={resumenLoading} 
                    value={(resumen as PropResumenCategoria[])[0]?.total_productos}
                    color="green"
                  >
                    <Package className="w-6 h-6 text-white" />
                  </MetricCard>

                  <MetricCard
                    name="Promedio por Categoría"
                    isError={resumenError} 
                    isLoading={resumenLoading} 
                    value={(resumen as PropResumenCategoria[])[0]?.promedio_categoria}
                    color="blue"
                  >
                    <BarChart3 className="w-6 h-6 text-white" />
                  </MetricCard>
                </div>
              )
            }
        </div>
      </div>

      {/* Create Category Modal */}
      {showCreateModal && (
        <FormCreate
          setShowFormCreate={setShowCreateModal}
          refetch={refetchCategorias}
        />
      )}

      {showEditModal && (
        <FormEdit
          refetch={refetchCategorias}
          setShowFormEdit={setShowFormModal}
          dataCategoria={
            (categories as PropCategoria[]).find(
              (cat) => cat.id === idCategoriaEdit
            )!
          }
        />
      )}

      {showDeleteModal && (
        <FormDelete
          refetch={refetchCategorias}
          setShowFormDelete={setShowFormDelete}
          dataCategoria={
            (categories as PropCategoria[]).find(
              (cat) => cat.id === idCategoriaDelete
            )!
          }
        />
      )}
    </div>
  );
}

export default Categories;
