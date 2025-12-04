import { useState } from 'react';
import ColorSelect from '../utils/ColorSelect';
import type { PropColor } from '../types/PropColor';
import { useFetcher } from '../data/useFetcher';

const Prueba: React.FC = () => {
  const [idColor, setIdColor] = useState(0); // Establece un color inicial

  const { data, isLoading, hayError } = useFetcher("http://localhost:3000/api/colores", "colores");

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-xl font-bold text-white mb-4">Selector de Colores Personalizado</h1>
      <ColorSelect
        options={data as PropColor[]} // este "as PropColor[]" es necesario para que no de error de tipo
        selectedValue={idColor}
        onChange={setIdColor}
        isloading={isLoading}
        isError={hayError}
      />
      <p className="mt-4 text-white">
        Color seleccionado: <span className="font-bold">{idColor}</span>
      </p>
    </div>
  );
};

export default Prueba;