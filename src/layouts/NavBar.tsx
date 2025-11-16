import { BarChart3, X, FileText, Menu, Package, Users, List } from "lucide-react";
import NavItem from "../components/NavItem";
import SubNavItem from "../components/SubNavItem";
import { useState, useEffect } from "react";

const STORAGE_KEY = 'activeSection';


export default function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState(() => {
    const savedTab = localStorage.getItem(STORAGE_KEY);
    // Si hay un valor guardado, úsalo, si no, usa 'analysis'
    return savedTab ? savedTab : 'analysis';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeSection);
  }, [activeSection])

  return (
    <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-red-900 to-red-950 border-r border-red-800 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-red-800 flex items-center justify-center ">
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-red-900" />
                </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Tienda de abarrotes</h1>
                    <p className="text-xs text-red-200">Sistema ERP</p>
                  </div>
              </div>
            )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-red-200 hover:text-white transition-colors">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <NavItem link="/analysis" icon={BarChart3} label="Análisis de ventas" active={activeSection === 'analysis'} collapsed={!sidebarOpen} onClick={() => setActiveSection('analysis')} />
          <NavItem link="/facturacion" icon={FileText} label="Facturación" active={activeSection === 'facturacion'} collapsed={!sidebarOpen} onClick={() => setActiveSection('facturacion')} />
          
          <NavItem link="/inventory" icon={Package} label="Inventario" active={activeSection === 'inventory'} collapsed={!sidebarOpen} onClick={() => setActiveSection('inventory')}>
          {sidebarOpen && (
              <div className="ml-8 mt-2 space-y-1">
                <SubNavItem link="/inventory/categories" label="Categorías" active={activeSection === 'inventory/categories'} onClick={() => setActiveSection('inventory/categories')} />
                <SubNavItem link="/inventory/products" label="Productos" active={activeSection === 'inventory/products'} onClick={() => setActiveSection('inventory/products')} />
                <SubNavItem link="/inventory/movements" label="Movimiento de inventario" active={activeSection === 'inventory/movements'} onClick={() => setActiveSection('inventory/movements')} />
                <SubNavItem link="/inventory/marcas" label="Marcas" active={activeSection === 'inventory/marcas'} onClick={() => setActiveSection('inventory/marcas')} />
              </div>
          )}
          </NavItem>

          <NavItem link="/collaborators" icon={Users} label="Colaboradores" active={activeSection === 'collaborators'} collapsed={!sidebarOpen} onClick={() => setActiveSection('collaborators')} />
          <NavItem link="/exclusive-order" icon={List} label="Pedido exclusivo" active={activeSection === 'exclusive-order'} collapsed={!sidebarOpen} onClick={() => setActiveSection('exclusive-order')}>
          {sidebarOpen && (
              <div className="ml-8 mt-2 space-y-1">
                <SubNavItem link="/exclusive-order/list" label="Lista de pedidos" active={activeSection === 'exclusive-order/list'} onClick={() => setActiveSection('exclusive-order/list')} />
              </div>
          )}
          </NavItem>
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
