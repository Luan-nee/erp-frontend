import { useState } from 'react';
import { X, User, Lock, Shield, Eye, EyeOff, Edit2, Key, UserCheck } from 'lucide-react';

interface CuentaUsuario {
  usuario: string;
  clave: string;
  rol_id: number;
  rol_nombre: string;
  usuario_id: number;
  usuario_nombres: string;
  usuario_apellidos: string;
}

interface WindowDetallesColaboradorProps {
  setShowDetallesCredenciales: (p: boolean) => void;
}

export default function WindowDetallesCredenciales({ setShowDetallesCredenciales }: WindowDetallesColaboradorProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [cuentaUsuario] = useState<CuentaUsuario>({
    usuario: "ldelsol",
    clave: "********",
    rol_id: 1,
    rol_nombre: "Administrador del Sistema",
    usuario_id: 1,
    usuario_nombres: "Luan Del",
    usuario_apellidos: "Sol Huilca Sanchez"
  });

  const getRolColor = (rolNombre: string) => {
    switch(rolNombre.toLowerCase()) {
      case 'administrador del sistema':
      case 'admin':
        return {
          bg: 'bg-red-500/20',
          text: 'text-red-300',
          border: 'border-red-500/30',
          icon: 'text-red-400'
        };
      case 'vendedor':
        return {
          bg: 'bg-blue-500/20',
          text: 'text-blue-300',
          border: 'border-blue-500/30',
          icon: 'text-blue-400'
        };
      case 'cajero':
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-300',
          border: 'border-green-500/30',
          icon: 'text-green-400'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          text: 'text-gray-300',
          border: 'border-gray-500/30',
          icon: 'text-gray-400'
        };
    }
  };

  const rolColors = getRolColor(cuentaUsuario.rol_nombre);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div className="h-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl overflow-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-t-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <UserCheck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Cuenta de Usuario</h1>
                <p className="text-slate-400 text-sm">Gestiona los accesos y permisos</p>
              </div>
            </div>
            <button 
              onClick={() => setShowDetallesCredenciales(false)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border-x border-slate-700/50 p-8">
          {/* User Profile Section */}
          <div className="flex items-center gap-6 mb-8 p-6 bg-slate-800/40 rounded-xl border border-slate-700/30">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                <UserCheck className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                {cuentaUsuario.usuario_nombres} {cuentaUsuario.usuario_apellidos}
              </h2>
              <p className="text-slate-400 text-sm">ID: #{cuentaUsuario.usuario_id}</p>
            </div>
          </div>

          {/* Account Information Grid */}
          <div className="space-y-6">
            {/* Credentials Section */}
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-400" />
                  Credenciales de Acceso
                </h3>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors text-sm border border-slate-600">
                  <Edit2 className="w-3 h-3" />
                  Editar
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Username */}
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <label className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <User className="w-4 h-4" />
                    Nombre de usuario
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={cuentaUsuario.usuario}
                      readOnly
                      className="flex-1 bg-slate-800/50 text-white px-4 py-2 rounded-lg border border-slate-600 font-mono text-lg"
                    />
                    <div className="px-3 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-500/30">
                      Activo
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <label className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Lock className="w-4 h-4" />
                    Contraseña
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={cuentaUsuario.clave}
                      readOnly
                      className="flex-1 bg-slate-800/50 text-white px-4 py-2 rounded-lg border border-slate-600 font-mono text-lg"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-slate-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-semibold">
                      Cambiar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Role and Permissions Section */}
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Rol y Permisos
              </h3>
              
              <div className="space-y-4">
                {/* Role ID */}
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-600/50 rounded-lg">
                      <Shield className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">ID del Rol</p>
                      <p className="text-white font-semibold text-lg">#{cuentaUsuario.rol_id}</p>
                    </div>
                  </div>
                </div>

                {/* Role Name */}
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <label className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <Shield className="w-4 h-4" />
                    Nombre del rol
                  </label>
                  <div className={`flex items-center gap-3 p-4 ${rolColors.bg} rounded-lg border ${rolColors.border}`}>
                    <Shield className={`w-6 h-6 ${rolColors.icon}`} />
                    <span className={`text-lg font-bold ${rolColors.text}`}>
                      {cuentaUsuario.rol_nombre}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-b-2xl border border-slate-700/50 p-6 flex justify-end items-center">
          <div className="flex gap-3">
            <button 
              onClick={() => setShowDetallesCredenciales(false)}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
              Cancelar
            </button>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};