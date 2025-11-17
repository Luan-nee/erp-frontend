import { useState } from 'react';
import { Users, TrendingUp,DollarSign, ShoppingCart, Award, Download, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Table from '../components/Table';

type monthlySalesDataType = {
  month: string;
  ventas: number;
  objetivo: number;
  pedidos: number;
};

type topProductsDataType = {
  name: string;
  value: number;
  sales: number;
};

type CategorySalesDataType = {
  category: string;
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
}

type TopSellersType = {
  name: string;
  sales: number;
  orders: number;
  growth: number;
}

type YearComparisonDataType = {
  month: string;
  año2024: number;
  año2023: number;
}

const headerTable = ['Ranking', 'Vendedor', 'Ventas Totales', 'Pedidos', 'Crecimiento'];

export default function AnalisisVenta() {
  const [timePeriod, setTimePeriod] = useState('month');

  // Datos para el gráfico de ventas mensuales
  const monthlySalesData: monthlySalesDataType[] = [
    { month: 'Ene', ventas: 45000, objetivo: 50000, pedidos: 120 },
    { month: 'Feb', ventas: 52000, objetivo: 50000, pedidos: 135 },
    { month: 'Mar', ventas: 48000, objetivo: 50000, pedidos: 128 },
    { month: 'Abr', ventas: 61000, objetivo: 55000, pedidos: 156 },
    { month: 'May', ventas: 55000, objetivo: 55000, pedidos: 142 },
    { month: 'Jun', ventas: 67000, objetivo: 60000, pedidos: 178 },
    { month: 'Jul', ventas: 72000, objetivo: 65000, pedidos: 189 },
    { month: 'Ago', ventas: 68000, objetivo: 65000, pedidos: 176 },
    { month: 'Sep', ventas: 71000, objetivo: 65000, pedidos: 182 },
    { month: 'Oct', ventas: 76000, objetivo: 70000, pedidos: 195 },
    { month: 'Nov', ventas: 82000, objetivo: 75000, pedidos: 210 },
    { month: 'Dic', ventas: 89000, objetivo: 80000, pedidos: 225 }
  ];

  // Datos para productos más vendidos
  const topProductsData: topProductsDataType[] = [
    { name: 'Neumáticos Premium', value: 35, sales: 125000 },
    { name: 'Neumáticos Económicos', value: 25, sales: 89000 },
    { name: 'Neumáticos Todo Terreno', value: 20, sales: 72000 },
    { name: 'Neumáticos Deportivos', value: 15, sales: 54000 },
    { name: 'Otros', value: 5, sales: 18000 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Datos para ventas por categoría
  const categorySalesData: CategorySalesDataType[] = [
    { category: 'Premium', Q1: 45000, Q2: 52000, Q3: 58000, Q4: 64000 },
    { category: 'Económico', Q1: 38000, Q2: 42000, Q3: 45000, Q4: 49000 },
    { category: 'Todo Terreno', Q1: 32000, Q2: 36000, Q3: 39000, Q4: 42000 },
    { category: 'Deportivo', Q1: 28000, Q2: 31000, Q3: 34000, Q4: 37000 }
  ];

  // Top vendedores
  const topSellers: TopSellersType[] = [
    { name: 'Carlos Ramírez', sales: 156000, orders: 89, growth: 15.2 },
    { name: 'María González', sales: 142000, orders: 76, growth: 12.8 },
    { name: 'Juan Pérez', sales: 138000, orders: 71, growth: 8.5 },
    { name: 'Ana Martínez', sales: 129000, orders: 68, growth: -2.3 },
    { name: 'Luis Vega', sales: 118000, orders: 62, growth: 5.7 }
  ];

  // Comparación año anterior
  const yearComparisonData: YearComparisonDataType[] = [
    { month: 'Ene', año2024: 45000, año2023: 38000 },
    { month: 'Feb', año2024: 52000, año2023: 42000 },
    { month: 'Mar', año2024: 48000, año2023: 45000 },
    { month: 'Abr', año2024: 61000, año2023: 52000 },
    { month: 'May', año2024: 55000, año2023: 48000 },
    { month: 'Jun', año2024: 67000, año2023: 58000 },
    { month: 'Jul', año2024: 72000, año2023: 62000 },
    { month: 'Ago', año2024: 68000, año2023: 59000 },
    { month: 'Sep', año2024: 71000, año2023: 63000 },
    { month: 'Oct', año2024: 76000, año2023: 67000 },
    { month: 'Nov', año2024: 82000, año2023: 71000 },
    { month: 'Dic', año2024: 89000, año2023: 75000 }
  ];

  const totalSales = monthlySalesData.reduce((sum, item) => sum + item.ventas, 0);
  const totalOrders = monthlySalesData.reduce((sum, item) => sum + item.pedidos, 0);
  const avgTicket = totalSales / totalOrders;
  const growthRate = ((monthlySalesData[11].ventas - monthlySalesData[0].ventas) / monthlySalesData[0].ventas * 100).toFixed(1);

  return (
    <div className="flex-1 flex overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">ANÁLISIS DE VENTAS</h2>
              <p className="text-gray-400">Dashboard de métricas y estadísticas de ventas</p>
            </div>
            <div className="flex gap-3">
              <select 
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mes</option>
                <option value="quarter">Este Trimestre</option>
                <option value="year">Este Año</option>
              </select>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center gap-2">
                <Download className="w-5 h-5" />
                Exportar Reporte
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            <InformationCard title="Ventas Totales" description="Año 2024" totalSales={totalSales} color={'blue'}>
              <DollarSign className="w-6 h-6 text-blue-400 mb-1" />
              <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                <ArrowUp className="w-3 h-3" />
                {growthRate}%
              </div>
            </InformationCard>

            <InformationCard title="Total Pedidos" description="Este año" totalSales={totalOrders} color={'green'}>
              <ShoppingCart className="w-10 h-10 text-green-400" />
              <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                <ArrowUp className="w-4 h-4" />
                12.5%
              </div>
            </InformationCard>

            <InformationCard title="Ticket Promedio" description="Por pedido" totalSales={avgTicket} color={'purple'}>
              <TrendingUp className="w-10 h-10 text-purple-400" />
              <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                <ArrowUp className="w-4 h-4" />
                8.3%
              </div>
            </InformationCard>

            <InformationCard title="Tasa Conversión" description="Leads a ventas" totalSales={68.5} color={'orange'}>
              <Award className="w-10 h-10 text-orange-400" />
              <div className="flex items-center gap-1 text-red-400 text-sm font-bold">
                <ArrowDown className="w-4 h-4" />
                68.5%
              </div>
            </InformationCard>

          </div>

          {/* Main Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Ventas Mensuales */}
            <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Evolución de Ventas 2024</h3>
                  <p className="text-sm text-gray-400">Ventas mensuales vs. Objetivo</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-xs text-gray-400">Ventas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-xs text-gray-400">Objetivo</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlySalesData}>
                  <defs>
                    <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#f3f4f6' }}
                  />
                  <Area type="monotone" dataKey="ventas" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVentas)" />
                  <Line type="monotone" dataKey="objetivo" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Productos Más Vendidos */}
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-1">Productos Top</h3>
              <p className="text-sm text-gray-400 mb-6">Distribución por categoría</p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={topProductsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent = 0 }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topProductsData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Second Row Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Ventas por Categoría */}
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-1">Ventas por Categoría</h3>
              <p className="text-sm text-gray-400 mb-6">Comparación trimestral</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categorySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="category" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="Q1" fill="#3b82f6" />
                  <Bar dataKey="Q2" fill="#10b981" />
                  <Bar dataKey="Q3" fill="#f59e0b" />
                  <Bar dataKey="Q4" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Comparación Año Anterior */}
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-1">Comparación Interanual</h3>
              <p className="text-sm text-gray-400 mb-6">2024 vs 2023</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yearComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="año2024" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="año2023" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Top Sellers Table */}
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-red-900 to-red-800 border-b border-red-700">
              <h3 className="text-xl font-bold text-white">Top 5 Vendedores del Año</h3>
            </div>
            <div className="overflow-x-auto">
              <Table headerTable={headerTable}>
                {topSellers.map((seller, idx) => (
                    <tr key={idx} className="hover:bg-gray-750 transition-colors">
                      <td className="px-6 py-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          idx === 0 ? 'bg-yellow-500 text-gray-900' :
                          idx === 1 ? 'bg-gray-400 text-gray-900' :
                          idx === 2 ? 'bg-orange-600 text-white' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {idx + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-400" />
                          <span className="text-white font-semibold">{seller.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-lg font-bold text-green-400">S/ {seller.sales.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {seller.orders}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {seller.growth > 0 ? (
                            <>
                              <ArrowUp className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 font-bold">{seller.growth}%</span>
                            </>
                          ) : seller.growth < 0 ? (
                            <>
                              <ArrowDown className="w-4 h-4 text-red-400" />
                              <span className="text-red-400 font-bold">{Math.abs(seller.growth)}%</span>
                            </>
                          ) : (
                            <>
                              <Minus className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-400 font-bold">{seller.growth}%</span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InformationCard({title, description, children, totalSales, color}: {title: string, description: string, children: React.ReactNode, totalSales: number, color: string}) {
  return (
    <div className={`bg-gradient-to-br from-${color}-900/50 to-${color}-800/30 border border-${color}-700/50 rounded-lg p-4 space-y-2`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-blue-300">{title}</p>
          <p className="text-2xl font-bold text-white leading-tight">S/ {totalSales.toLocaleString()}</p>
        </div>
        
        <div className="flex flex-col items-end">
          {children}
        </div>
      </div>
      <p className="text-xs text-gray-400 pt-1">{description}</p>
    </div>
  );
}