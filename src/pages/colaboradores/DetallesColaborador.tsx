import { useState, useEffect, useMemo } from 'react';
import { X, Phone, MapPin, Calendar, DollarSign, Clock, User} from 'lucide-react';
import Loading from '../../animation/Loading';
import type { DetallesColaborador } from '../../models/colaboradores.model';
import ColaboradorService from '../../service/colaborador.service';

interface WindowDetallesColaboradorProps {
  setShowDetallesColaborador: (p: boolean) => void;
  idColaboradorSelected: number;
}

function formatDateString(dateString: string | undefined): string {
  const date = new Date(dateString ?? '');
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}

export default function WindowDetallesColaborador({ setShowDetallesColaborador, idColaboradorSelected }: WindowDetallesColaboradorProps) {
  
  const colaboradorService = useMemo(() => new ColaboradorService(), []);

  const [selectedColaborador, setSelectedColaborador] = useState<DetallesColaborador | null>(null);
  const [isLoadingDetalles, setIsLoadingDetalles] = useState<boolean>(true);
  const [isErrorDetalles, setIsErrorDetalles] = useState<boolean>(false);

  const refreshDetallesColaborador = async (id_colaborador: number) => {
    setIsLoadingDetalles(true);
    setIsErrorDetalles(false);
    const {data, isLoading, hayError} = await colaboradorService.getDetallesColaborador(id_colaborador);
    setSelectedColaborador(data);
    setIsLoadingDetalles(isLoading);
    setIsErrorDetalles(hayError);
  }

  useEffect(() => {
    refreshDetallesColaborador(idColaboradorSelected);
  }, [colaboradorService, idColaboradorSelected]);

  const getRolColor = (rol: string) => {
    switch(rol.toLowerCase()) {
      case 'administrador del sistema':
      case 'admin':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'vendedor':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'cajero':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div className="h-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl overflow-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-t-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Información del Colaborador</h1>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              onClick={() => setShowDetallesColaborador(false)}
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        {isErrorDetalles ? (
          <div className="mx-8 mt-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3 flex items-center justify-between">
            <span>Ocurrió un error al cargar los detalles del colaborador.</span>
            <button
              className="px-3 py-1 text-sm font-semibold rounded-md bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 transition-colors"
              onClick={() => refreshDetallesColaborador(idColaboradorSelected)}
            >
              Reintentar
            </button>
          </div>
        ) : null}

        {/* Main Content */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 backdrop-blur-sm border-x border-slate-700/50 p-8">
          {/* Header Section with Avatar and Status */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {isLoadingDetalles ? (
                    <Loading w={6} h={6} color="green" />
                  ) : isErrorDetalles ? (
                    <span className="text-red-300 text-sm">No se pudo cargar</span>
                  ) : (
                    <>
                      {selectedColaborador?.nombres} {selectedColaborador?.apellidos}
                    </>
                  )}
                </h2>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getRolColor(selectedColaborador ? selectedColaborador.rol : '')}`}>
                    {isLoadingDetalles ? (
                      <Loading w={4} h={4} color="green" />
                    ) : isErrorDetalles ? (
                      <span className="text-red-300 text-sm">No se pudo cargar</span>
                    ) : (
                      selectedColaborador?.rol
                    )}
                  </span>
                  {isLoadingDetalles ? (
                    <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm border border-emerald-500/30">
                      <Loading w={4} h={4} color="green" />
                      Cargando
                    </span>
                  ) : isErrorDetalles ? (
                    <span className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-200 rounded-full text-sm border border-red-500/30">
                      Error
                    </span>
                  ) : selectedColaborador?.estaActivo ? (
                    <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm border border-emerald-500/30">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      Activo
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      Inactivo
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30 col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-400" />
                Información de Contacto
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Celular</p>
                    <p className="text-white font-medium">
                      {isLoadingDetalles ? (
                        <Loading w={5} h={5} color="green" />
                      ) : isErrorDetalles ? (
                        <span className="text-red-300 text-sm">No se pudo cargar</span>
                      ) : (
                        selectedColaborador?.celular
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">DNI</p>
                    <p className="text-white font-medium">
                      {isLoadingDetalles ? (
                        <Loading w={5} h={5} color="green" />
                      ) : isErrorDetalles ? (
                        <span className="text-red-300 text-sm">No se pudo cargar</span>
                      ) : (
                        selectedColaborador?.dni
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Lugar de trabajo</p>
                    <p className="text-white font-medium">
                      {isLoadingDetalles ? (
                        <Loading w={5} h={5} color="green" />
                      ) : isErrorDetalles ? (
                        <span className="text-red-300 text-sm">No se pudo cargar</span>
                      ) : (
                        selectedColaborador?.lugarTrabajo
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Schedule */}
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                Horario Laboral
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Hora de inicio</p>
                    <p className="text-white font-medium">
                      {isLoadingDetalles ? (
                        <Loading w={5} h={5} color="green" />
                      ) : isErrorDetalles ? (
                        <span className="text-red-300 text-sm">No se pudo cargar</span>
                      ) : (
                        selectedColaborador?.hora_inicio_jornada
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Hora de fin</p>
                    <p className="text-white font-medium">
                      {isLoadingDetalles ? (
                        <Loading w={5} h={5} color="green" />
                      ) : isErrorDetalles ? (
                        <span className="text-red-300 text-sm">No se pudo cargar</span>
                      ) : (
                        selectedColaborador?.hora_fin_jornada
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Sueldo</p>
                    <p className="text-emerald-400 font-bold text-lg">
                      {isLoadingDetalles ? (
                        <Loading w={5} h={5} color="green" />
                      ) : isErrorDetalles ? (
                        <span className="text-red-300 text-sm">No se pudo cargar</span>
                      ) : (
                        formatCurrency(selectedColaborador ? selectedColaborador.sueldo : 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Employment Dates */}
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Fechas Importantes
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Fecha de contratación</p>
                    <p className="text-white font-medium">
                      {isLoadingDetalles ? (
                        <Loading w={5} h={5} color="green" />
                      ) : isErrorDetalles ? (
                        <span className="text-red-300 text-sm">No se pudo cargar</span>
                      ) : (
                        formatDateString(selectedColaborador?.fecha_actualizacion.toString())
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Última actualización</p>
                    <p className="text-white font-medium">
                      {isLoadingDetalles ? (
                        <Loading w={5} h={5} color="green" />
                      ) : isErrorDetalles ? (
                        <span className="text-red-300 text-sm">No se pudo cargar</span>
                      ) : (
                        formatDateString(selectedColaborador?.fecha_actualizacion.toString())
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-b-2xl border border-slate-700/50 p-6 flex justify-end gap-3">
          <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            onClick={() => setShowDetallesColaborador(false)}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};