import { useState } from 'react';
import { Search, ShoppingCart, Calendar, DollarSign, Eye, Download, CheckCircle, Clock, AlertCircle, User, CreditCard, TrendingUp } from 'lucide-react';
import MetricCard from '../components/MetricCard';

export default function CondorMotorsOrderList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');

  type OrderStatus = 'Pendiente' | 'Completado' | 'En Proceso';

  type Order = {
    id: number;
    dni: string;
    date: string;
    productName: string;
    pendingPayment: number;
    status: OrderStatus;
    customer: string;
    advance: number;
    total: number;
  };

  const orders: Order[] = [
    {
      id: 1,
      dni: '00000000',
      date: '20/03/2025',
      productName: 'Este es el nombre del producto',
      pendingPayment: 9000,
      status: 'Pendiente',
      customer: 'Juan Pérez García',
      advance: 1000,
      total: 10000
    },
    {
      id: 2,
      dni: '00000000',
      date: '20/03/2025',
      productName: 'Este es el nombre del producto',
      pendingPayment: 9000,
      status: 'Completado',
      customer: 'María González Torres',
      advance: 1000,
      total: 10000
    },
    {
      id: 3,
      dni: '00000000',
      date: '20/03/2025',
      productName: 'Este es el nombre del producto',
      pendingPayment: 9000,
      status: 'En Proceso',
      customer: 'Carlos Ramírez Silva',
      advance: 1000,
      total: 10000
    },
    {
      id: 4,
      dni: '12345678',
      date: '21/03/2025',
      productName: 'Neumático Premium SportMax',
      pendingPayment: 5500,
      status: 'Pendiente',
      customer: 'Ana Martínez López',
      advance: 2500,
      total: 8000
    },
    {
      id: 5,
      dni: '87654321',
      date: '22/03/2025',
      productName: 'Kit de Suspensión Deportiva',
      pendingPayment: 0,
      status: 'Completado',
      customer: 'Luis Vega Rojas',
      advance: 12000,
      total: 12000
    },
    {
      id: 6,
      dni: '11223344',
      date: '22/03/2025',
      productName: 'Sistema de Frenos ABS Premium',
      pendingPayment: 7000,
      status: 'En Proceso',
      customer: 'Sofia Castro Díaz',
      advance: 3000,
      total: 10000
    }
  ];

  const statusConfig: Record<OrderStatus, { bg: string; text: string; border: string; icon: typeof Clock }> = {
    Pendiente: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: Clock },
    Completado: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', icon: CheckCircle },
    'En Proceso': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', icon: AlertCircle }
  };

  const filteredOrders = orders.filter(order => 
    (filterStatus === 'Todos' || order.status === filterStatus) &&
    (searchTerm === '' || 
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.dni.includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'Completado').length,
    pending: orders.filter(o => o.status === 'Pendiente').length,
    inProcess: orders.filter(o => o.status === 'En Proceso').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    pendingRevenue: orders.reduce((sum, o) => sum + o.pendingPayment, 0)
  };

  return (
    <div className="flex-1 flex overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">PEDIDOS EXCLUSIVO / Lista de pedidos</h2>
              <p className="text-gray-400">Gestiona y supervisa todos los pedidos registrados</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar Reporte
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="bg-gray-800 border-b border-gray-700 p-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

            <MetricCard
              name="Total de Pedidos"
              value={stats.total}
              color="blue"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
            </MetricCard>

            <MetricCard
              name="Completados"
              value={stats.completed}
              color="green"
            >
              <CheckCircle className="w-6 h-6 text-green-400" />
            </MetricCard>

            <MetricCard
              name="Pendientes"
              value={stats.pending}
              color="yellow"
            >
              <Clock className="w-6 h-6 text-yellow-400" />
            </MetricCard>

            <MetricCard
              name="En Proceso"
              value={stats.inProcess}
              color="blue"
            >
              <AlertCircle className="w-6 h-6 text-blue-400" />
            </MetricCard>

            <MetricCard
              name="Ingresos Total"
              value={stats.totalRevenue}
              color="purple"
            >
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </MetricCard>

            <MetricCard
              name="Por Cobrar"
              value={stats.pendingRevenue}
              color="orange"
            >
              <DollarSign className="w-6 h-6 text-orange-400" />
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
                placeholder="Buscar por DNI, nombre del cliente o producto..."
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
              <option value="Completado">Completado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => {
              const statusStyle = statusConfig[order.status];
              const StatusIcon = statusStyle.icon;
              const paymentProgress = ((order.advance / order.total) * 100).toFixed(0);

              return (
                <div key={order.id} className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden hover:shadow-2xl hover:border-red-500/50 transition-all">
                  {/* Header */}
                  <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-white">DNI: {order.dni}</span>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                        <StatusIcon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      {order.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-white font-bold mb-1 line-clamp-1">{order.customer}</h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{order.productName}</p>

                    {/* Payment Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Progreso de pago</span>
                        <span>{paymentProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-600 to-green-500 h-full transition-all duration-300"
                          style={{ width: `${paymentProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Adelanto:</span>
                        <span className="text-green-400 font-bold">S/ {order.advance.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Total:</span>
                        <span className="text-white font-bold">S/ {order.total.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-700">
                        <span className="text-gray-400 flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          Pago pendiente:
                        </span>
                        <span className="text-red-400 font-bold text-lg">S/ {order.pendingPayment.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      Más información
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <ShoppingCart className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-xl text-gray-400">No se encontraron pedidos</p>
              <p className="text-sm text-gray-500">Intenta con otros filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
