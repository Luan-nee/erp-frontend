import { useState, useMemo, useEffect} from 'react';
import Loading from '../../animation/Loading';
import { Users, Search, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import type { Colaborador, resumenColaboradores} from '../../models/colaboradores.model';
import MetricCard from '../../components/MetricCard';
import CardColaborador from './CardColaborador';
import ColaboradorService from '../../service/colaborador.service';
import WindowDetallesColaborador from './DetallesColaborador';
import WindowDetallesCredenciales from './DetallesCredenciales';
import FormCreate from './FormCreate';

export default function CondorMotorsCollaborators() {
  const [showDetallesColaborador, setShowDetallesColaborador] = useState<boolean>(false);
  const [showDetallesCredenciales, setShowDetallesCredenciales] = useState<boolean>(false);
  const [showFormCreate, setShowFormCreate] = useState<boolean>(false);

  const [idColaboradorSelected, setIdColaboradorSelected] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');

  const colaboradorService = useMemo(() => new ColaboradorService(), []);

  const [colaboradores, setColaboradores] = useState<Colaborador[] | null>(null);
  const [isLoadingColaborador, setIsLoadingColaborador] = useState<boolean>(true);
  const [isErrorColaborador, setIsErrorColaborador] = useState<boolean>(false);

  const [resumen, setResumen] = useState< resumenColaboradores | null>(null);
  const [isLoadingResumen, setIsLoadingResumen] = useState<boolean>(true);
  const [isErrorResumen, setIsErrorResumen] = useState<boolean>(false);

  const refreshColaboradores = async () => {
    setIsLoadingColaborador(true);
    setIsErrorColaborador(false);
    const {data, isLoading, hayError} = await colaboradorService.select()
    setColaboradores(data);
    setIsLoadingColaborador(isLoading);
    setIsErrorColaborador(hayError);
  }

  const refreshResumen = async () => {
    setIsLoadingResumen(true);
    setIsErrorResumen(false);
    const {data, isLoading, hayError} = await colaboradorService.getResumen()
    setResumen(data);
    setIsLoadingResumen(isLoading);
    setIsErrorResumen(hayError);
  }

  useEffect(() => {
    refreshColaboradores();
    refreshResumen();
  }, [colaboradorService]);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">COLABORADORES</h2>
              <p className="text-gray-400">Gestiona tu equipo de trabajo</p>
            </div>
            <button 
              onClick={() => setShowFormCreate(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Nuevo Colaborador
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="bg-gray-800 border-b border-gray-700 p-8">
          <div className="grid grid-cols-4 gap-6">
            <MetricCard
              name="Total Colaboradores"
              value={resumen ? resumen.total_colaboradores : 0}
              color="blue"
              isLoading={isLoadingResumen}
              isError={isErrorResumen}
            >
              <Users className="w-6 h-6 text-white" />
            </MetricCard>

            <MetricCard
              name="Sin cuenta de acceso"
              value={resumen ? resumen.sin_cuenta : 0}
              color="orange"
              isLoading={isLoadingResumen}
              isError={isErrorResumen}
            >
              <Users className="w-6 h-6 text-white" />
            </MetricCard>

            <MetricCard
              name="Colaboradores Activos"
              value={resumen ? resumen.activos : 0}
              color="green"
              isLoading={isLoadingResumen}
              isError={isErrorResumen}
            >
              <CheckCircle className="w-6 h-6 text-white" />
            </MetricCard>

            <MetricCard
              name="Colaboradores Inhabilitados"
              value={resumen ? resumen.inactivos : 0}
              color="red"
              isLoading={isLoadingResumen}
              isError={isErrorResumen}
            >
              <XCircle className="w-6 h-6 text-white" />
            </MetricCard>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-800 border-b border-gray-700 px-8 py-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar colaboradores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inhabilitado">Inhabilitado</option>
              <option value="Sin Cuenta">Sin Cuenta</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add Collaborator Card */}
            <button
              onClick={() => setShowFormCreate(true)}
              className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-red-500 hover:bg-gray-750 transition-all group flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-red-400 transition-colors">
                <UserPlus className="w-12 h-12 mb-3" />
                <p className="font-semibold">Agregar Colaborador</p>
              </div>
            </button>

            {
              isErrorColaborador ? (
                <div className="col-span-3 px-6 py-4 text-center text-red-500">
                  Error al cargar los colaboradores.{" "}
                  <button
                    onClick={() => refreshColaboradores()}
                    className="underline text-red-400 hover:text-red-600"
                  >
                    Recargar colaboradores
                  </button>
                </div>
              ) : isLoadingColaborador ? (
                // usar el componenten Loading
                <div className="col-span-3 px-6 py-4">
                  <p className='text-center text-gray-400 text-2xl'>Cargando colaboradores...</p>
                  <div className='flex justify-center mt-4'>
                    <Loading 
                      w={16}
                      h={16}
                      color="blue"
                    />
                  </div>
                </div>
              ) : ( 
                colaboradores?.map((colaborador) => (
                  <CardColaborador 
                    key={colaborador.id}
                    id={colaborador.id}
                    nombres={colaborador.nombres}
                    apellidos={colaborador.apellidos}
                    rol={colaborador.rol}
                    estaActivo={colaborador.estaActivo}
                    celular={colaborador.celular}
                    lugarTrabajo={colaborador.lugarTrabajo}
                    tieneCuenta={colaborador.tieneCuenta}
                    setShowDetallesColaborador={setShowDetallesColaborador}
                    setIdColaboradorSelected={setIdColaboradorSelected}
                    setShowDetallesCredenciales={setShowDetallesCredenciales}
                  />
                ))
              )
            }
            
          </div>
        </div>
      </div>
      { showDetallesColaborador &&
        <WindowDetallesColaborador
          setShowDetallesColaborador={setShowDetallesColaborador}
          idColaboradorSelected={idColaboradorSelected}
        />
      }

      { showDetallesCredenciales &&
        <WindowDetallesCredenciales 
          setShowDetallesCredenciales={setShowDetallesCredenciales}
          idColaboradorSelected={idColaboradorSelected}
        />
      }

      { showFormCreate &&
        <FormCreate 
          setShowFormCreate={setShowFormCreate}
        />
      }
    </div>
  );
}