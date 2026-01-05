import React, { useState } from 'react';
import { X, Phone, MapPin, Calendar, DollarSign, Clock, User, CheckCircle, XCircle, Edit2 } from 'lucide-react';

interface Colaborador {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  estaActivo: boolean;
  celular: string;
  hora_inicio_jornada: string;
  hora_fin_jornada: string;
  sueldo: number;
  id_sucursal: number;
  lugarTrabajo: string;
  fecha_contratacion: Date;
  fecha_actualizacion: Date;
  tieneCuenta: boolean;
  rol: string;
}

const DetallesColaborador: React.FC = () => {
  const [selectedColaborador] = useState<Colaborador>({
    id: 1,
    nombres: "Luan Del",
    apellidos: "Sol Huilca Sanchez",
    dni: "72345678",
    estaActivo: true,
    celular: "987654321",
    hora_inicio_jornada: "08:00:00",
    hora_fin_jornada: "18:00:00",
    sueldo: 1500.00,
    id_sucursal: 1,
    lugarTrabajo: "Av. Principal #123, Ciudad A",
    fecha_contratacion: new Date("2023-01-15"),
    fecha_actualizacion: new Date("2024-12-20"),
    tieneCuenta: true,
    rol: "Administrador del Sistema"
  });

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-t-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Información del Colaborador</h1>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

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
                  {selectedColaborador.nombres} {selectedColaborador.apellidos}
                </h2>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getRolColor(selectedColaborador.rol)}`}>
                    {selectedColaborador.rol}
                  </span>
                  {selectedColaborador.estaActivo ? (
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
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors border border-slate-600">
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-400" />
                Información de Contacto
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Celular</p>
                    <p className="text-white font-medium">{selectedColaborador.celular}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">DNI</p>
                    <p className="text-white font-medium">{selectedColaborador.dni}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Lugar de trabajo</p>
                    <p className="text-white font-medium">{selectedColaborador.lugarTrabajo}</p>
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
                    <p className="text-white font-medium">{selectedColaborador.hora_inicio_jornada}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Hora de fin</p>
                    <p className="text-white font-medium">{selectedColaborador.hora_fin_jornada}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Sueldo</p>
                    <p className="text-emerald-400 font-bold text-lg">{formatCurrency(selectedColaborador.sueldo)}</p>
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
                    <p className="text-white font-medium">{formatDate(selectedColaborador.fecha_contratacion)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Última actualización</p>
                    <p className="text-white font-medium">{formatDate(selectedColaborador.fecha_actualizacion)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Estado de Cuenta
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Tiene cuenta de acceso</span>
                  {selectedColaborador.tieneCuenta ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">ID Sucursal</span>
                  <span className="text-white font-semibold">{selectedColaborador.id_sucursal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-b-2xl border border-slate-700/50 p-6 flex justify-end gap-3">
          <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            Cancelar
          </button>
          <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetallesColaborador;