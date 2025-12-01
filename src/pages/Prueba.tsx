// src/App.tsx
import React, { useState, useEffect } from 'react';
import ColorSelect from '../utils/ColorSelect';
import { getColores } from "../data/colors";
import type { PropColor } from '../types/PropColor';

const Prueba: React.FC = () => {
  const [idColor, setIdColor] = useState(0); // Establece un color inicial
  const [coloresAPI, setColoresAPI] = useState<PropColor[]>([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getColores()
      .then((data) => {
        if (mounted) {
          setColoresAPI(data);
          setIsloading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setColoresAPI([]);
          setIsloading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-xl font-bold text-white mb-4">Selector de Colores Personalizado</h1>
      <ColorSelect
        options={coloresAPI}
        selectedValue={idColor}
        onChange={setIdColor}
        isloading={isloading}
      />
      <p className="mt-4 text-white">
        Color seleccionado: <span className="font-bold">{idColor}</span>
      </p>
    </div>
  );
};

export default Prueba;