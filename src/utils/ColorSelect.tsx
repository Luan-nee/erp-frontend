// src/components/ColorSelect.tsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Necesitarás instalar lucide-react o usar un icono SVG similar
import type { PropColor } from "../types/PropColor";

interface ColorSelectProps {
  options?: PropColor[];
  selectedValue: number;
  onChange: (value: number) => void;
  label?: string;
  isloading?: boolean;
}

export default function ColorSelect({
  options,
  selectedValue,
  onChange,
  label = "Seleccionar Color",
  isloading = false,
}: ColorSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [isFailed, setIsFailed] = useState(false);
  // Busca el objeto de color seleccionado usando 'nombre' (tu clave de valor)
  if (!options) {
    setIsFailed(true);
  }
  const selectedColor = options?.find((opt) => opt.id === selectedValue);

  // Maneja los clics fuera del componente para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // La función de selección ahora usa la propiedad 'nombre' como el valor retornado
  const handleSelect = (option: PropColor) => {
    onChange(option.id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-60" ref={selectRef}>
      {/* Botón que simula el input <select> */}
      {!isFailed ? (
        <button
          type="button"
          className={`
          flex justify-between items-center w-full py-2 px-3 border border-gray-600 rounded-lg 
          shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150
        `}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {isloading ? 
          (
            <span className="flex items-center space-x-2">
              <div className="
                animate-spin 
                h-4 
                w-4 
                border-4 
                border-solid 
                border-blue-500 
                border-t-transparent 
                rounded-full
              "></div>
              <span>
                "Cargando..." 
              </span>
            </span>

          )
          : (
              <span className="flex items-center space-x-2">
                {/* Visualización del color seleccionado: Usa 'valor' (que contiene la clase TW) */}
                <span
                  className={`w-4 h-4 rounded-full border border-gray-400 ${
                    selectedColor?.valor || "bg-transparent"
                  }`}
                  aria-hidden="true"
                ></span>
                {/* Muestra el 'nombre' del color */}
                <span>{selectedColor ? selectedColor.nombre : label}</span>
              </span>
            )
          }
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
          />
        </button>
      ) : (
        <button
          type="button"
          className={`
          flex justify-between items-center w-full py-2 px-3 border border-gray-600 rounded-lg 
          shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150
        `}
        >
          <p className="text-red-500">Error en colores</p>
        </button>
      )}

      {/* Lista de Opciones (Dropdown) */}
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-xl overflow-hidden"
          role="listbox"
        >
          {options?.map((option) => (
            <li
              // Usa 'id' como key ya que es único, o 'nombre' si lo prefieres
              key={option.id}
              className={`
                flex items-center space-x-3 p-3 text-sm text-white cursor-pointer 
                hover:bg-blue-600 transition-colors duration-150
                ${
                  selectedValue === option.id
                    ? "bg-blue-700 font-semibold"
                    : ""
                }
              `}
              onClick={() => handleSelect(option)}
              role="option"
              // Compara con 'nombre'
              aria-selected={selectedValue === option.id}
            >
              {/* Visualización del color en la lista: Usa 'valor' (clase TW) */}
              <span
                className={`w-4 h-4 rounded-full border border-gray-400 ${option.valor}`}
                aria-hidden="true"
              ></span>
              {/* Muestra el 'nombre' del color */}
              <span>{option.nombre}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
