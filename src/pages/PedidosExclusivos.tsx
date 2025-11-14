import { useState } from 'react';
import { ShoppingCart, Calendar, DollarSign, TrendingUp, User, Box, CreditCard, Save, XCircle, Plus} from 'lucide-react';
import MetricCard from '../components/MetricCard';

export default function PedidosExclusivos() {
  
  const [formData, setFormData] = useState({
    applicantDNI: '',
    productName: '',
    basePrice: '',
    salePrice: '',
    income: '',
    advance: '',
    receiptDay: '',
    receiptMonth: '',
    receiptYear: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      applicantDNI: '',
      productName: '',
      basePrice: '',
      salePrice: '',
      income: '',
      advance: '',
      receiptDay: '',
      receiptMonth: '',
      receiptYear: ''
    });
  };

  const balance = ((parseFloat(formData.salePrice) || 0) - (parseFloat(formData.advance) || 0)).toFixed(2);

  return (
    <div className="flex-1 flex overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">PEDIDOS EXCLUSIVO / Registrar pedido</h2>
              <p className="text-gray-400">Crea un nuevo pedido personalizado</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">Nuevo Pedido</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto">
            {/* Form Card */}
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4 border-b border-red-700">
                <h3 className="text-xl font-bold text-white">Registrar pedido exclusivo</h3>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Applicant DNI */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 text-red-400" />
                      DNI del solicitante:
                    </label>
                    <input
                      type="text"
                      value={formData.applicantDNI}
                      onChange={(e) => setFormData({...formData, applicantDNI: e.target.value})}
                      placeholder="00000000"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Product Name */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Box className="w-4 h-4 text-blue-400" />
                      Nombre:
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({...formData, productName: e.target.value})}
                      placeholder="Nombre del producto XG"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Base Price */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      Precio base: S/
                    </label>
                    <input
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                      placeholder="00000"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Sale Price */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      Precio de venta: S/
                    </label>
                    <input
                      type="number"
                      value={formData.salePrice}
                      onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                      placeholder="00000"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Income */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Plus className="w-4 h-4 text-green-400" />
                      Ingreso: S/
                    </label>
                    <input
                      type="number"
                      value={formData.income}
                      onChange={(e) => setFormData({...formData, income: e.target.value})}
                      placeholder="00000"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Advance */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <CreditCard className="w-4 h-4 text-yellow-400" />
                      Adelanto: S/
                    </label>
                    <input
                      type="number"
                      value={formData.advance}
                      onChange={(e) => setFormData({...formData, advance: e.target.value})}
                      placeholder="00000"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Receipt Date */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Calendar className="w-4 h-4 text-orange-400" />
                      Día de recojo:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <select
                        value={formData.receiptDay}
                        onChange={(e) => setFormData({...formData, receiptDay: e.target.value})}
                        className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      >
                        <option value="">DD</option>
                        {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                          <option key={day} value={day}>{day.toString().padStart(2, '0')}</option>
                        ))}
                      </select>
                      <select
                        value={formData.receiptMonth}
                        onChange={(e) => setFormData({...formData, receiptMonth: e.target.value})}
                        className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      >
                        <option value="">MM</option>
                        {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                          <option key={month} value={month}>{month.toString().padStart(2, '0')}</option>
                        ))}
                      </select>
                      <select
                        value={formData.receiptYear}
                        onChange={(e) => setFormData({...formData, receiptYear: e.target.value})}
                        className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      >
                        <option value="">YYYY</option>
                        {Array.from({length: 10}, (_, i) => 2024 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="mt-8 bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-blue-400" />
                    Resumen del Pedido
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Precio Base</p>
                      <p className="text-xl font-bold text-white">S/ {formData.basePrice || '0.00'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Precio de Venta</p>
                      <p className="text-xl font-bold text-green-400">S/ {formData.salePrice || '0.00'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Adelanto</p>
                      <p className="text-xl font-bold text-yellow-400">S/ {formData.advance || '0.00'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Saldo Pendiente</p>
                      <p className="text-xl font-bold text-red-400">S/ {balance}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleReset}
                    className="flex-1 px-6 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors border border-gray-600 flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Guardar producto
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              
              <MetricCard
                name="Pedidos Hoy"
                value={12}
                color='blue'
              >
                <ShoppingCart className="w-8 h-8 text-blue-400" />
              </MetricCard>

              <MetricCard
                name="Total Mes"
                value={156}
                color='green'
              >
                <TrendingUp className="w-8 h-8 text-green-400" />
              </MetricCard>

              <MetricCard
                name="Pendientes"
                value={8}
                color='orange'
              >
                <Calendar className="w-8 h-8 text-orange-400" />
              </MetricCard>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
