import { useState } from 'react';
import { Users,Search, UserPlus, MapPin, Phone, Mail, CheckCircle, XCircle, Eye, Edit3, Trash2 } from 'lucide-react';
import MetricCard from '../../components/MetricCard';

export default function CondorMotorsCollaborators() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');

  type Collaborator = {
    id: number;
    firstName: string;
    lastName: string;
    maternalLastName: string;
    phone: string;
    status: string;
    workLocation: string;
    email: string;
    position: string;
    avatar: string;
  };

  type StatusConfig = {
    [key: string]: {
      bg: string;
      text: string;
      border: string;
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    };
  };

  const collaborators: Collaborator[] = [
    {
      id: 1,
      firstName: 'María',
      lastName: 'González',
      maternalLastName: 'Torres',
      phone: '900000000',
      status: 'Activo',
      workLocation: 'Urb. Salomé Davila # 7851 Urai. Juan Esteban, Chinchala',
      email: 'maria.gonzalez@condormotors.com',
      position: 'Gerente de Ventas',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      firstName: 'Carlos',
      lastName: 'Ramírez',
      maternalLastName: 'Silva',
      phone: '900000000',
      status: 'Activo',
      workLocation: 'Urb. Salomé Davila # 7851 Urai. Juan Esteban, Chinchala',
      email: 'carlos.ramirez@condormotors.com',
      position: 'Técnico Automotriz',
      avatar: '👨‍🔧'
    },
    {
      id: 3,
      firstName: 'Ana',
      lastName: 'Martínez',
      maternalLastName: 'López',
      phone: '900000000',
      status: 'Inhabilitado',
      workLocation: 'Urb. Salomé Davila # 7851 Urai. Juan Esteban, Chinchala',
      email: 'ana.martinez@condormotors.com',
      position: 'Coordinadora de Logística',
      avatar: '👩‍💻'
    },
    {
      id: 4,
      firstName: 'Luis',
      lastName: 'Pérez',
      maternalLastName: 'García',
      phone: '900000000',
      status: 'Activo',
      workLocation: 'Urb. Salomé Davila # 7851 Urai. Juan Esteban, Chinchala',
      email: 'luis.perez@condormotors.com',
      position: 'Vendedor Senior',
      avatar: '👨‍💼'
    },
    {
      id: 5,
      firstName: 'Sofia',
      lastName: 'Vega',
      maternalLastName: 'Rojas',
      phone: '900000000',
      status: 'Activo',
      workLocation: 'Urb. Salomé Davila # 7851 Urai. Juan Esteban, Chinchala',
      email: 'sofia.vega@condormotors.com',
      position: 'Asistente Administrativa',
      avatar: '👩'
    },
    {
      id: 6,
      firstName: 'Pedro',
      lastName: 'Castro',
      maternalLastName: 'Díaz',
      phone: '900000000',
      status: 'Activo',
      workLocation: 'Urb. Salomé Davila # 7851 Urai. Juan Esteban, Chinchala',
      email: 'pedro.castro@condormotors.com',
      position: 'Almacenero',
      avatar: '👨'
    }
  ];

  const statusConfig: StatusConfig = {
    'Activo': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', icon: CheckCircle },
    'Inhabilitado': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', icon: XCircle }
  };

  const filteredCollaborators = collaborators.filter(collab => 
    (filterStatus === 'Todos' || collab.status === filterStatus) &&
    (searchTerm === '' || 
      collab.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collab.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collab.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: collaborators.length,
    active: collaborators.filter(c => c.status === 'Activo').length,
    inactive: collaborators.filter(c => c.status === 'Inhabilitado').length
  };

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
            <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2">
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
              value={stats.total}
              color="blue"
            >
              <Users className="w-6 h-6 text-white" />
            </MetricCard>

            <MetricCard
              name="Total Colaboradores"
              value={stats.total}
              color="blue"
            >
              <Users className="w-6 h-6 text-white" />
            </MetricCard>

            <MetricCard
              name="Colaboradores Activos"
              value={stats.active}
              color="green"
            >
              <CheckCircle className="w-6 h-6 text-white" />
            </MetricCard>

            <MetricCard
              name="Colaboradores Inhabilitados"
              value={stats.inactive}
              color="red"
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
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add Collaborator Card */}
            <button className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-red-500 hover:bg-gray-750 transition-all group min-h-[400px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-red-400 transition-colors">
                <UserPlus className="w-12 h-12 mb-3" />
                <p className="font-semibold">Agregar Colaborador</p>
              </div>
            </button>

            {filteredCollaborators.map((collab) => {
              const statusStyle = statusConfig[collab.status];
              const StatusIcon = statusStyle.icon;

              return (
                <div key={collab.id} className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden hover:shadow-2xl hover:border-red-500/50 transition-all">
                  {/* Avatar Header */}
                  <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 p-6 text-center border-b border-gray-700 relative">
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                        <StatusIcon className="w-3 h-3" />
                        {collab.status}
                      </span>
                    </div>
                    <div className="text-6xl mb-3">{collab.avatar}</div>
                    <h3 className="text-xl font-bold text-white">
                      {collab.firstName} {collab.lastName}
                    </h3>
                    <p className="text-sm text-gray-300">{collab.maternalLastName}</p>
                    <p className="text-sm text-red-300 font-medium mt-2">{collab.position}</p>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Celular:</p>
                        <p className="text-sm text-white font-medium">{collab.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Email:</p>
                        <p className="text-sm text-white font-medium break-all">{collab.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Lugar de trabajo:</p>
                        <p className="text-sm text-gray-300">{collab.workLocation}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700 flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        Más información
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Edit3 className="w-4 h-4" />
                        Editar
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}