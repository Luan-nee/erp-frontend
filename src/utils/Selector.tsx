import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check} from 'lucide-react';
import Loading from '../animation/Loading';
import type { PropCategoria } from '../models/categoria';
import type { PropMarca } from '../types/marca';

interface Props {
  opciones: PropCategoria[] | PropMarca[] | null;
  onSelect: (id: number) => void;
  placeholder?: string;
  isLoading?: boolean;
  isError?: boolean;
}

const Selector: React.FC<Props> = ({ 
  opciones, 
  onSelect, 
  placeholder = "Selecciona una categoría", 
  isLoading,
  isError
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<PropCategoria | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (categoria: PropCategoria) => {
    setSelected(categoria);
    onSelect(categoria.id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      {/* Botón Principal - Tema Oscuro */}
      <button
        type="button"
        disabled={isLoading || isError}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 
          ${isOpen 
            ? 'bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/20' 
            : 'bg-slate-900 border-slate-700 hover:border-slate-600'
          } border`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 w-full">
            <Loading w={6} h={6} color="white" />
            <p>Cargando categorías...</p>
          </div>
        ): isError ? (
          <div className="flex items-center justify-center w-full text-red-500">
            Error al cargar categorías
          </div>
        ) : (
        <div className="flex flex-col items-start truncate">
          <span className={`text-sm ${!selected ? 'text-slate-500' : 'text-slate-100 font-semibold'}`}>
            {selected ? selected.nombre : placeholder}
          </span>
          {selected && (
            <span className="text-[10px] text-indigo-400 font-medium uppercase tracking-wider">
              {selected.cantidad_productos} productos disponibles
            </span>
          )}
        </div>
        )}
        <ChevronDown 
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Menú Desplegable - Tema Oscuro */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="max-h-72 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-slate-700">
            {opciones && opciones.length > 0 ? (
              opciones.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => handleSelect(cat)}
                  className="group flex items-center justify-between px-4 py-3 hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <div className="flex flex-col min-w-0 pr-4">
                    <span className={`text-sm font-bold ${selected?.id === cat.id ? 'text-indigo-400' : 'text-slate-200'}`}>
                      {cat.nombre}
                    </span>
                    <span className="text-xs text-slate-500 line-clamp-1 group-hover:text-slate-400">
                      {cat.descripcion}
                    </span>
                  </div>
                  
                  {selected?.id === cat.id && (
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-center text-sm text-slate-500 italic">
                No se encontraron categorías
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Selector;