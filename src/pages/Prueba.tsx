// src/App.tsx
import React, { useState } from 'react';
import ColorSelect from '../utils/ColorSelect';
import { getColores } from "../data/colors";
import type { PropColor } from '../types/PropColor';

getColores();

const colores: PropColor[] = [
  {
    id: 1,
    nombre: 'Rojo',
    valor: 'bg-red-600',
  },
  {
    id: 2,
    nombre: 'Verde',
    valor: 'bg-green-600',
  },
  {
    id: 3,
    nombre: 'Azul',
    valor: 'bg-blue-600',
  },
];

const Prueba: React.FC = () => {
  const [color, setColor] = useState('blue'); // Establece un color inicial

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-xl font-bold text-white mb-4">Selector de Colores Personalizado</h1>
      <ColorSelect
        options={colores}
        selectedValue={color}
        onChange={setColor}
      />
      <p className="mt-4 text-white">
        Color seleccionado: <span className="font-bold">{color}</span>
      </p>
    </div>
  );
};

export default Prueba;