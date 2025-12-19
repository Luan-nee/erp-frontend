import { useCallback, useEffect, useMemo, useState } from "react";
import { Package, Search, Plus, Award, TrendingUp } from "lucide-react";
// import type { Marca, PropMarca, PropResumenMarca } from "../../types/marca";
import type {
  PropMarca,
  PropResumenMarca,
} from "../../models/marca";
import Loading from "../../animation/Loading";
import Table from "../../components/Table";
import MetricCard from "../../components/MetricCard";
// import useFetcher from "../../data/useFetchet";
import CardMarca from "./CardMarca";
import RowTable from "./RowTable";
import FormCreate from "./FormCreate";
import FormDelete from "./FormDelete";
import FormEdit from "./FormEdit";
import MarcaService from "../../service/marca.service";

const headerTable = ["Ranking", "Marca", "Descripción", "Productos"];

export default function CondorMotorsBrands() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [idMarcaDelete, setIdMarcaDelete] = useState<number | null>(null);
  const [idMarcaEdit, setIdMarcaEdit] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const marcaService = useMemo(() => new MarcaService(), []);

  // estados para las marcas
  const [marcas, setMarcas] = useState<PropMarca[] | null>(null);
  const [marcasLoading, setMarcasLoading] = useState<boolean>(true);
  const [marcasError, setMarcasError] = useState<boolean>(false);

  // estados para el resumen de marcas
  const [resumenMarcas, setResumenMarcas] = useState<PropResumenMarca | null>(null);
  const [resumenLoading, setResumenLoading] = useState<boolean>(true);
  const [resumenError, setResumenError] = useState<boolean>(false);

  const MarcasRefetch = useCallback(async () => {
    setMarcasLoading(true);
    setMarcasError(false);

    const { data, isLoading, hayError } = await marcaService.get();

    setMarcas(data);
    setMarcasLoading(isLoading);
    setMarcasError(hayError);
  }, [marcaService]);

  const resumenMarcasRefetch = useCallback(async () => {
    setResumenLoading(true);
    setResumenError(false);

    const { data, isLoading, hayError } = await marcaService.getResumen();

    setResumenMarcas(data);
    setResumenLoading(isLoading);
    setResumenError(hayError);
  }, [marcaService]);

  useEffect(() => {
    resumenMarcasRefetch();
    MarcasRefetch();
  }, [MarcasRefetch, resumenMarcasRefetch]);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
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
        {resumenError ? (
          <div className="col-span-3 px-6 py-4 text-center text-red-500">
            Error al cargar el resumen de categorías.{" "}
            <button
              onClick={() => resumenMarcasRefetch()}
              className="underline text-red-400 hover:text-red-600"
            >
              Recargar resumen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <MetricCard
              name="Total Marcas"
              value={resumenMarcas ? resumenMarcas.total_marcas : 0}
              isLoading={resumenLoading}
              isError={resumenError}
              color="blue"
            >
              <Award className="w-6 h-6 text-white" />
            </MetricCard>

            <MetricCard
              name="Total Productos"
              value={resumenMarcas ? resumenMarcas.total_productos : 0}
              isLoading={resumenLoading}
              isError={resumenError}
              color="green"
            >
              <Package className="w-6 h-6 text-white" />
            </MetricCard>

            <MetricCard
              name="Promedio por Marca"
              value={resumenMarcas ? resumenMarcas.promedio_marca : 0}
              isLoading={resumenLoading}
              isError={resumenError}
              color="purple"
            >
              <TrendingUp className="w-6 h-6 text-white" />
            </MetricCard>
          </div>
        )}
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
        {marcasError ? (
          <div className="col-span-3 px-6 py-4 text-center text-red-500">
            Error al cargar las marcas.{" "}
            <button
              onClick={() => MarcasRefetch()}
              className="underline text-red-400 hover:text-red-600"
            >
              Recargar marcas
            </button>
          </div>
        ) : marcasLoading ? (
          <div className=" flex flex-row items-center justify-center ">
            <p className="px-6 py-4 text-center text-gray-400">
              Cargando marcas...
            </p>
            <Loading w={8} h={8} color="red" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marcas?.map((marca) => (
              <CardMarca
                key={marca.id}
                id={marca.id}
                nombre={marca.nombre}
                descripcion={marca.descripcion}
                cant_productos={marca.cantidad_productos}
                showDeleteModal={setShowDeleteModal}
                showEditModal={setShowEditModal}
                setIdMarcaDelete={setIdMarcaDelete}
                setIdMarcaEdit={setIdMarcaEdit}
              />
            ))}
          </div>
        )}

        {/* Top Brands Table */}
        <div className="mt-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4 border-b border-red-700">
            <h3 className="text-xl font-bold text-white">
              Ranking de Marcas por Productos
            </h3>
          </div>
          <div className="overflow-x-auto">
            <Table headerTable={headerTable}>
              {marcasLoading ? (
                <tr>
                  <td
                    colSpan={headerTable.length}
                    className="flex flex-row items-center justify-center py-6"
                  >
                    <p className="px-6 py-4 text-center text-gray-400">
                      Cargando marcas...
                    </p>
                    <Loading w={8} h={8} color="red" />
                  </td>
                </tr>
              ) : marcasError ? (
                <tr>
                  <td
                    colSpan={headerTable.length}
                    className="px-6 py-4 text-center text-red-500"
                  >
                    Error al cargar las marcas.{" "}
                    <button
                      onClick={() => MarcasRefetch()}
                      className="underline text-red-400 hover:text-red-600"
                    >
                      Recargar página
                    </button>
                  </td>
                </tr>
              ) : (
                [...marcas as PropMarca[]]
                  .sort((a, b) => b.cantidad_productos - a.cantidad_productos)
                  .map((marca, idx) => (
                    <RowTable
                      key={marca.id}
                      id={idx}
                      nombre={marca.nombre}
                      descripcion={marca.descripcion}
                      cantidad_productos={marca.cantidad_productos}
                    />
                  ))
              )}
            </Table>
          </div>
        </div>
      </div>

      {/* Create Brand Modal */}
      {showCreateModal && (
        <FormCreate
          setShowFormCreate={setShowCreateModal}
          refetchMarcas={MarcasRefetch}
          refetchResumen={resumenMarcasRefetch}
        />
      )}

      {showDeleteModal && (
        <FormDelete
          setShowFormDelete={setShowDeleteModal}
          marcaData={marcas?.find((marca) => marca.id === idMarcaDelete)!}
          refetch={MarcasRefetch}
        />
      )}

      {showEditModal && (
        <FormEdit
          setShowFormEdit={setShowEditModal}
          data={marcas?.find((marca) => marca.id === idMarcaEdit)!}
          refetch={MarcasRefetch}
        />
      )}
    </div>
  );
}
