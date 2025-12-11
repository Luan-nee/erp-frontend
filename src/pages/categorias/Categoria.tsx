import { useState, useEffect } from "react";
import {
  Package,
  BarChart3,
  FolderOpen,
  Plus,
  Search,
  Tag,
  Edit3,
  Trash2,
} from "lucide-react";
import Table from "../../components/Table";
import MetricCard from "../../components/MetricCard";
import type {
  PropCategoria,
  PropResumenCategoria,
} from "../../types/categoria";
import useFetcher from "../../data/useFetcher";
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

  // capturar las acciones de los formularios
  const [recargarPagina, setRecargarPagina] = useState(false);
  useEffect(() => {
    if (recargarPagina) {
      // lógica para recargar los datos, por ejemplo, volver a llamar a useFetcher o actualizar el estado
      // ...
      // luego de recargar los datos, restablecer action a false
      setRecargarPagina(false);
      console.log("Recargando datos de categorías...");
    }
  }, [recargarPagina]);

  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: categories,
    isLoading: categoriesLoading,
    hayError: categoriesError,
  } = useFetcher("http://localhost:3000/api/categorias", "categorías");
  const {
    data: resumen,
    isLoading: resumenLoading,
    hayError: resumenError,
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
                        onClick={() => setRecargarPagina(true)}
                        className="underline text-red-400 hover:text-red-600"
                      >
                        Recargar página
                      </button>
                    </td>
                    
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className={`hover:bg-gray-750 transition-colors bg-gray-825`}
                    >
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                          <FolderOpen className="w-5 h-5 text-white" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="text-white font-semibold text-lg">
                              {category.nombre}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              ID:{category.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300 text-sm">
                          {category.descripcion}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Tag className="w-4 h-4 text-red-400" />
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {category.cantidad_productos}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setShowFormModal(true);
                              setIdCategoriaEdit(category.id);
                            }}
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors shadow-md group relative"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Editar
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setShowFormDelete(true);
                              setIdCategoriaDelete(category.id);
                            }}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors shadow-md group relative"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Eliminar
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </Table>
            </div>
          </div>

          {/* Stats Cards */}
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
        </div>
      </div>

      {/* Create Category Modal */}
      {showCreateModal && (
        <FormCreate
          setShowFormCreate={setShowCreateModal}
          setAction={setRecargarPagina}
        />
      )}

      {showEditModal && (
        <FormEdit
          setAction={setRecargarPagina}
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
          setAction={setRecargarPagina}
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
