import React, { useState } from 'react';
import {Search, Calendar, ArrowUpCircle, ArrowDownCircle, XCircle, CheckCircle, Eye, Download, RefreshCw, TrendingUp} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import Table from '../components/Table';

type StatusColors = {
  [key: string]: {
    bg: string;
    text: string;
    border: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
};

type Movement = {
  id: number;
  requestDate: string;
  responseDate: string;
  requester: {
    name: string;
    lastName: string;
    maternal: string;
  };
  applicant: {
    name: string;
    lastName: string;
    maternal: string;
  };
  origin: string;
  destination: string;
  status: string;
  products: number;
};

const tableHeaders = [
  'Fecha de Solicitud',
  'Fecha de Respuesta',
  'Proveedor',
  'Solicitante',
  'Origen',
  'Destino',
  'Estado',
  'Productos',
  'Acciones'
];

export default function CondorMotorsMovements() {
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const movements: Movement[] = [
    {
      id: 1,
      requestDate: '2024-11-10',
      responseDate: '2024-11-12',
      requester: { name: 'Juan', lastName: 'Pérez', maternal: 'García' },
      applicant: { name: 'María', lastName: 'López', maternal: 'Sánchez' },
      origin: 'Dirección de la central más cercana',
      destination: 'Dirección de la sucursal que solicita productos',
      status: 'Finalizado',
      products: 15
    },
    {
      id: 2,
      requestDate: '2024-11-11',
      responseDate: '2024-11-13',
      requester: { name: 'Carlos', lastName: 'Ramírez', maternal: 'Torres' },
      applicant: { name: 'Ana', lastName: 'González', maternal: 'Díaz' },
      origin: 'Dirección de la central más cercana',
      destination: 'Dirección de la sucursal que solicita productos',
      status: 'Solicitando',
      products: 8
    },
    {
      id: 3,
      requestDate: '2024-11-09',
      responseDate: '2024-11-11',
      requester: { name: 'Luis', lastName: 'Martínez', maternal: 'Rojas' },
      applicant: { name: 'Rosa', lastName: 'Vega', maternal: 'Flores' },
      origin: 'Dirección de la central más cercana',
      destination: 'Dirección de la sucursal que solicita productos',
      status: 'Solicitando',
      products: 12
    },
    {
      id: 4,
      requestDate: '2024-11-08',
      responseDate: '2024-11-10',
      requester: { name: 'Pedro', lastName: 'Silva', maternal: 'Cruz' },
      applicant: { name: 'Elena', lastName: 'Morales', maternal: 'Ruiz' },
      origin: 'Dirección de la central más cercana',
      destination: 'Dirección de la sucursal que solicita productos',
      status: 'Finalizado',
      products: 20
    },
    {
      id: 5,
      requestDate: '2024-11-07',
      responseDate: '2024-11-09',
      requester: { name: 'Miguel', lastName: 'Castro', maternal: 'Paredes' },
      applicant: { name: 'Sofia', lastName: 'Mendoza', maternal: 'Ríos' },
      origin: 'Dirección de la central más cercana',
      destination: 'Dirección de la sucursal que solicita productos',
      status: 'Rechazado',
      products: 5
    }
  ];

  const statusColors: StatusColors = {
    'Finalizado': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', icon: CheckCircle },
    'Solicitando': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: RefreshCw },
    'Rechazado': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', icon: XCircle }
  };

  // const categories = ['Todos', 'Proveedor', 'Solicitante', 'Origen', 'Destino', 'Estado'];

  const filteredMovements = movements.filter(m => 
    (filterStatus === 'Todos' || m.status === filterStatus) &&
    (searchTerm === '' || 
      m.requester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: movements.length,
    finalizados: movements.filter(m => m.status === 'Finalizado').length,
    solicitando: movements.filter(m => m.status === 'Solicitando').length,
    rechazados: movements.filter(m => m.status === 'Rechazado').length
  };

  return (
    <div className="flex-1 flex overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">INVENTARIO / movimiento de inventario</h2>
              <p className="text-gray-400">Registro de traslados y movimientos entre locales</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar Reporte
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="bg-gray-800 border-b border-gray-700 p-8">
          <div className="grid grid-cols-4 gap-4">
            
            <MetricCard
              name="Total Movimientos"
              value={stats.total}
              color="blue"
            >
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </MetricCard>

            <MetricCard
              name="Finalizados"
              value={stats.finalizados}
              color="green"
            >
              <CheckCircle className="w-8 h-8 text-green-400" />
            </MetricCard>

            <MetricCard
              name="En Proceso"
              value={stats.solicitando}
              color="yellow"
            >
              <RefreshCw className="w-8 h-8 text-yellow-400" />
            </MetricCard>

            <MetricCard
              name="Rechazados"
              value={stats.rechazados}
              color="red"
            >
              <XCircle className="w-8 h-8 text-red-400" />
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
                placeholder="Buscar por proveedor, solicitante..."
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
              <option value="Finalizado">Finalizado</option>
              <option value="Solicitando">Solicitando</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <Table headerTable={tableHeaders} >
                {filteredMovements.map((movement, idx) => {
                    const statusStyle = statusColors[movement.status];
                    const StatusIcon = statusStyle.icon;
                    
                    return (
                      <tr key={movement.id} className={`hover:bg-gray-750 transition-colors ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-825'}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-300">{movement.requestDate}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-gray-300">{movement.responseDate}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{movement.requester.name} {movement.requester.lastName}</p>
                            <p className="text-xs text-gray-400">{movement.requester.maternal}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{movement.applicant.name} {movement.applicant.lastName}</p>
                            <p className="text-xs text-gray-400">{movement.applicant.maternal}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-2 max-w-xs">
                            <ArrowUpCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-300">{movement.origin}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-2 max-w-xs">
                            <ArrowDownCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-300">{movement.destination}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                              <StatusIcon className="w-4 h-4" />
                              {movement.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {movement.products}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors shadow-md group relative">
                              <Eye className="w-4 h-4" />
                              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Ver detalles
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
