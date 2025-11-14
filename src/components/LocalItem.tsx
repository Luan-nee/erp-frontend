import { ChevronRight, MapPin } from "lucide-react";

interface LocalItemProps {
  idx: number;
  name: string;
  address: string;
}

export default function LocalItem({ idx, name, address }: LocalItemProps  ) {
  return (
    <div
      key={idx}
      className="bg-gray-750 hover:bg-gray-700 rounded-lg p-4 border border-gray-600 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-400" />
          <span className="font-semibold text-white">{name}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
      </div>
      <p className="text-sm text-gray-400 ml-7">{address}</p>
    </div>
  );
}
