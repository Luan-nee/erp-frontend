import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Inventory from './pages/Inventario.tsx';
import Categories from './pages/categorias/CategoriaView.tsx';
import Products from './pages/productos/Productos.tsx';
import NotFound from './pages/NotFound.tsx';
import AnalisisVenta from './pages/AnalisisVenta.tsx';
import Facturacion from './pages/Facturacion.tsx';
import PedidosExclusivos from './pages/PedidosExclusivos.tsx';
import MovimientoInventario from './pages/MovimientoInventario.tsx';
import ListaPedidosExclusivos from './pages/ListaPedidosExclusivos.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './layouts/NavBar.tsx';
import Marcas from './pages/marcas/MarcasView.tsx';
import Colaboradores from './pages/Colaboradores.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
        {/* Barra de navegación */}
        <NavBar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<AnalisisVenta />} />
            <Route path="/analysis" element={<AnalisisVenta />} />
            <Route path="/facturacion" element={<Facturacion />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/categories" element={<Categories />} />
            <Route path="/inventory/products" element={<Products />} />
            <Route path="/inventory/movements" element={<MovimientoInventario />} />
            <Route path="/inventory/marcas" element={<Marcas />} />
            <Route path="/collaborators" element={<Colaboradores />} />
            <Route path="/exclusive-order" element={<PedidosExclusivos />} />
            <Route path="/exclusive-order/list" element={<ListaPedidosExclusivos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  </StrictMode>,
)