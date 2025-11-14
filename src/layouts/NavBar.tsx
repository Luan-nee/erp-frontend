import { BarChart3, X, FileText, Menu, Package, Users, List } from "lucide-react";
import NavItem from "../components/NavItem";
import SubNavItem from "../components/SubNavItem";
import { useState } from "react";

export default function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('inventory');

  return (
    <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-red-900 to-red-950 border-r border-red-800 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-red-800 flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-red-900" />
                </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Tienda de abarrotes</h1>
                    <p className="text-xs text-red-200">Sistema de Inventario</p>
                  </div>
              </div>
            )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-red-200 hover:text-white transition-colors">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem link="/analysis" icon={BarChart3} label="Análisis de ventas" active={false} collapsed={!sidebarOpen} />
          <NavItem link="/facturacion" icon={FileText} label="Facturación" active={false} collapsed={!sidebarOpen} />
          
          <div className="pt-4">
            <NavItem link="/inventory" icon={Package} label="Inventario" active={activeSection === 'inventory'} collapsed={!sidebarOpen} onClick={() => setActiveSection('inventory')}>
              {sidebarOpen && (
                <div className="ml-8 mt-2 space-y-1">
                  <SubNavItem link="/inventory/categories" label="Categorías" active={true} />
                  <SubNavItem link="/inventory/products" label="Productos" />
                  <SubNavItem link="/inventory/movements" label="Movimiento de inventario" />
                  <SubNavItem link="/inventory/marcas" label="Marcas" />
                </div>
              )}
            </NavItem>
          </div>

          <NavItem link="/collaborators" icon={Users} label="Colaboradores" active={false} collapsed={!sidebarOpen} />
          
          <div className="pt-4">
            <NavItem link="/exclusive-order" icon={List} label="Pedido exclusivo" active={true} collapsed={!sidebarOpen}>
              {sidebarOpen && (
                <div className="ml-8 mt-2 space-y-1">
                  <SubNavItem link="/exclusive-order/list" label="Lista de pedidos" />
                </div>
              )}
            </NavItem>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-red-800">
          <button className="w-full py-3 px-4 bg-red-800 hover:bg-red-700 rounded-lg text-white font-medium transition-colors">
            {sidebarOpen ? 'Salir' : <X className="w-5 h-5 mx-auto" />}
          </button>
        </div>
      </div>
  );
}
