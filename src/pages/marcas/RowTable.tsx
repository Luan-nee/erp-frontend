interface RowTableProps {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad_productos: number;
}

export default function RowTable({ id, nombre, descripcion, cantidad_productos }: RowTableProps){
  return (
    <tr
      key={id}
      className={`hover:bg-gray-750 transition-colors`}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              id === 0
                ? "bg-yellow-500 text-gray-900"
                : id === 1
                ? "bg-gray-400 text-gray-900"
                : id === 2
                ? "bg-orange-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {id + 1}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">
            {nombre}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-gray-300 text-sm">
          {descripcion}
        </p>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
          {cantidad_productos}
        </span>
      </td>
    </tr>
  );
}