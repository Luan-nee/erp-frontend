import { useState } from 'react';
import { Search, Plus, Download, Printer, Eye, Trash2, Calendar, DollarSign, User, Building2, Hash, CheckCircle, XCircle, Clock, TrendingUp, Receipt } from 'lucide-react';
import Table from '../components/Table';
import MetricCard from '../components/MetricCard';

type Invoice = {
  id: string;
  date: string;
  customer: string;
  ruc: string;
  total: number;
  status: 'Pagada' | 'Pendiente' | 'Vencida';
  paymentMethod: string;
  items: number;
  dueDate: string;
};

export default function CondorMotorsBilling() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  // const [showNewInvoice, setShowNewInvoice] = useState(false);

  const HeaderColumns = [
    'N° Factura',
    'Fecha',
    'Cliente',
    'RUC/DNI',
    'Ítems',
    'Total',
    'Estado',
    'Acciones',
  ];

  const invoices: Invoice[] = [
    {
      id: 'F001-00001',
      date: '15/11/2024',
      customer: 'Juan Pérez García',
      ruc: '20123456789',
      total: 15420.00,
      status: 'Pagada',
      paymentMethod: 'Transferencia',
      items: 5,
      dueDate: '15/12/2024'
    },
    {
      id: 'F001-00002',
      date: '14/11/2024',
      customer: 'María González Torres',
      ruc: '20987654321',
      total: 8950.50,
      status: 'Pendiente',
      paymentMethod: 'Efectivo',
      items: 3,
      dueDate: '14/12/2024'
    },
    {
      id: 'F001-00003',
      date: '14/11/2024',
      customer: 'Transportes Rápidos SAC',
      ruc: '20456789123',
      total: 32100.00,
      status: 'Pagada',
      paymentMethod: 'Cheque',
      items: 12,
      dueDate: '14/12/2024'
    },
    {
      id: 'F001-00004',
      date: '13/11/2024',
      customer: 'Carlos Ramírez Silva',
      ruc: '20321654987',
      total: 5680.00,
      status: 'Vencida',
      paymentMethod: 'Crédito',
      items: 2,
      dueDate: '13/11/2024'
    },
    {
      id: 'F001-00005',
      date: '13/11/2024',
      customer: 'Auto Parts Perú SAC',
      ruc: '20147258369',
      total: 18750.00,
      status: 'Pagada',
      paymentMethod: 'Transferencia',
      items: 8,
      dueDate: '13/12/2024'
    },
    {
      id: 'F001-00006',
      date: '12/11/2024',
      customer: 'Luis Vega Rojas',
      ruc: '20852963741',
      total: 12300.00,
      status: 'Pendiente',
      paymentMethod: 'Efectivo',
      items: 6,
      dueDate: '12/12/2024'
    }
  ];

  const statusConfig = {
    'Pagada': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', icon: CheckCircle },
    'Pendiente': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: Clock },
    'Vencida': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', icon: XCircle }
  };

  const filteredInvoices = invoices.filter(invoice => 
    (filterStatus === 'Todos' || invoice.status === filterStatus) &&
    (searchTerm === '' || 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.ruc.includes(searchTerm))
  );

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === 'Pagada').length,
    pending: invoices.filter(i => i.status === 'Pendiente').length,
    overdue: invoices.filter(i => i.status === 'Vencida').length,
    totalRevenue: invoices.filter(i => i.status === 'Pagada').reduce((sum, i) => sum + i.total, 0),
    pendingRevenue: invoices.filter(i => i.status === 'Pendiente').reduce((sum, i) => sum + i.total, 0)
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">FACTURACIÓN</h2>
              <p className="text-gray-400">Gestiona y controla tus facturas y comprobantes</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-all border border-gray-600 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Exportar
              </button>
              <button 
                // onClick={() => setShowNewInvoice(true)}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nueva Factura
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="bg-gray-800 border-b border-gray-700 p-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <MetricCard
              name="Total Facturas"
              value={stats.total}
              color="blue"
            >
              <Receipt className="w-6 h-6 text-blue-400 mb-2" />
            </MetricCard>

            <MetricCard
              name="Pagadas"
              value={stats.paid}
              color="green"
            >
              <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
            </MetricCard>

            <MetricCard
              name="Pendientes"
              value={stats.pending}
              color="yellow"
            >
              <Clock className="w-6 h-6 text-yellow-400 mb-2" />
            </MetricCard>

            <MetricCard
              name="Pendientes"
              value={stats.pending}
              color="yellow"
            >
              <Clock className="w-6 h-6 text-yellow-400 mb-2" />
            </MetricCard>

            <MetricCard
              name="Vencidas"
              value={stats.overdue}
              color="red"
            >
              <XCircle className="w-6 h-6 text-red-400 mb-2" />
            </MetricCard>

            <MetricCard
              name="Facturado"
              value={stats.totalRevenue}
              color="purple"
            >
              <TrendingUp className="w-6 h-6 text-purple-400 mb-2" />
            </MetricCard>

            <MetricCard
              name="Por Cobrar"
              value={stats.pendingRevenue}
              color="orange"
            >
              <DollarSign className="w-6 h-6 text-orange-400 mb-2" />
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
                placeholder="Buscar por número de factura, cliente o RUC..."
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
              <option value="Pagada">Pagada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Vencida">Vencida</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <Table headerTable={HeaderColumns}>
                {filteredInvoices.map((invoice, idx) => {
                    const statusStyle = statusConfig[invoice.status];
                    const StatusIcon = statusStyle.icon;

                    return (
                      <tr key={invoice.id} className={`hover:bg-gray-750 transition-colors ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-825'}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-blue-400" />
                            <span className="text-white font-bold">{invoice.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-gray-300">{invoice.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-green-400" />
                            <div>
                              <p className="text-white font-medium">{invoice.customer}</p>
                              <p className="text-xs text-gray-400">{invoice.paymentMethod}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-orange-400" />
                            <span className="text-sm text-gray-300">{invoice.ruc}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {invoice.items}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span className="text-lg font-bold text-white">S/ {invoice.total.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                              <StatusIcon className="w-3 h-3" />
                              {invoice.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors shadow-md group relative">
                              <Eye className="w-4 h-4" />
                              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Ver
                              </span>
                            </button>
                            <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors shadow-md group relative">
                              <Printer className="w-4 h-4" />
                              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Imprimir
                              </span>
                            </button>
                            <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors shadow-md group relative">
                              <Download className="w-4 h-4" />
                              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Descargar
                              </span>
                            </button>
                            <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors shadow-md group relative">
                              <Trash2 className="w-4 h-4" />
                              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Anular
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