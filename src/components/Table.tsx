import { Fragment } from "react";
import type { ReactNode } from "react";
// import { Grid3x3 } from "lucide-react";

type HeaderTableProps = {
  headerTable: string[];
  children?: ReactNode;
};

export default function Table({ headerTable, children }: HeaderTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gradient-to-r from-red-900 to-red-800 border-b border-red-700">
          {headerTable.map((nameHeader, idx) => (
            <Fragment key={idx}>
              <th
                className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
              >
                {nameHeader}
              </th>
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {children}
      </tbody>
    </table>
  );
}


/* 
{filteredCategories.map((category, idx) => (
                    <tr key={category.id} className={`hover:bg-gray-750 transition-colors ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-825'}`}>
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                          <FolderOpen className="w-5 h-5 text-white" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="text-white font-semibold text-lg">{category.name}</div>
                            <div className="text-xs text-gray-400 mt-1">ID: CAT-{category.id.toString().padStart(3, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300 text-sm">{category.description}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Tag className="w-4 h-4 text-red-400" />
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {category.products}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors shadow-md group relative">
                            <Edit3 className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Editar
                            </span>
                          </button>
                          <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors shadow-md group relative">
                            <Trash2 className="w-4 h-4" />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Eliminar
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
*/