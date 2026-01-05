import {MapPin, Phone, CheckCircle, XCircle, Eye, Edit3 } from 'lucide-react';

interface CardColaboradorProps {
  id: number;
  nombres: string;
  apellidos: string;
  rol: string; // admin, vendedor, cajero.
  estaActivo: boolean;
  celular: string;
  lugarTrabajo: string;
  tieneCuenta: boolean;
  setShowDetallesColaborador: (p: boolean) => void;
  setIdColaboradorSelected: (id: number) => void;
  setShowDetallesCredenciales: (p: boolean) => void;
}

type StatusConfig = {
  [key: string]: {
    bg: string;
    text: string;
    border: string;
    hover: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
};

export default function CardColaborador({id, nombres, apellidos, rol, estaActivo, celular, lugarTrabajo, tieneCuenta, setShowDetallesColaborador, setIdColaboradorSelected, setShowDetallesCredenciales}: CardColaboradorProps){
  const statusConfig: StatusConfig = {
    'Activo': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', icon: CheckCircle, hover: 'hover:border-green-500/50' },
    'Inhabilitado': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', icon: XCircle, hover: 'hover:border-red-500/50' },
    'Sin Cuenta': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: XCircle, hover: 'hover:border-yellow-500/50' }
  };
  let statusStyle = statusConfig[estaActivo ? 'Activo' : (tieneCuenta ? 'Inhabilitado' : 'Sin Cuenta')];
  const StatusIcon = statusStyle.icon;
  return (
    <div key={id} className={`bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden hover:shadow-2xl ${statusStyle.hover} transition-all`}>
      {/* Avatar Header */}
      <div className={`${statusStyle.bg} p-6 text-center border-b border-gray-700 relative`}>
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
            <StatusIcon className="w-3 h-3" />
            {/* ESTADO DEL COLABORADOR */}
            {estaActivo ? 'Activo' : 'Inhabilitado'}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white">
          {/* NOMBRES DEL COLABORADOR */}
          {nombres}
        </h3>
        {/* APELLIDOS DEL COLABORADOR */}
        <p className="text-sm text-gray-300">{apellidos}</p>
        {/* ROL DEL COLABORADOR */}
        <p className={`text-sm ${statusStyle.text} font-medium mt-2`}>{rol}</p>
      </div>

      {/* Info */}
      <div className="p-6 space-y-3">
        {/* NÚMERO DE CELULAR DEL COLABORADOR */}
        <div className="flex items-start gap-3">
          <Phone className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-xs text-gray-400 mb-1">Celular:</p>
            <p className="text-sm text-white font-medium">{celular}</p>
          </div>
        </div>

        {/* LUGAR DE TRABAJO DEL COLABORADOR */}
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-xs text-gray-400 mb-1">Lugar de trabajo:</p>
            <p className="text-sm text-gray-300">{lugarTrabajo}</p>
          </div>
        </div>

        {/* BOTONES */}
        <div className="pt-4 border-t border-gray-700 flex gap-2">
          <button className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
            onClick={() => {
              setShowDetallesColaborador(true);
              setIdColaboradorSelected(id);
            }}
          >
            <Eye className="w-4 h-4" />
            Más información
          </button>
          <button className="flex-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Editar
          </button>

          {/* agrega un botón que diga "Acceso" */}
          <button className="flex-1 px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
            onClick={() => {
              setShowDetallesCredenciales(true);
              setIdColaboradorSelected(id);
            }}
          >
            <CheckCircle className="w-4 h-4" />
            Acceso
          </button>
        </div>
      </div>
    </div>
  );
}