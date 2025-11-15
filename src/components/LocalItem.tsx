import { ChevronRight, MapPin } from "lucide-react";

interface data{
  type: string;
  idx: number;
}

interface LocalItemProps {
  idx: number;
  name: string;
  address: string;
  isSelected: boolean;
  type: string;
  onSelect: ({type, idx}: data) => void;
}

export default function LocalItem({ idx, name, address, onSelect, isSelected, type }: LocalItemProps  ) {
  return (
    <button
      type="button"
      key={idx}
      className={`bg-gray-750 hover:bg-gray-700 rounded-lg p-2 border transition-all cursor-pointer group flex items-center justify-between w-full ${isSelected ? "border-red-400" : "border-gray-600"}`}
      onClick={() => onSelect({type, idx})}
    >
      <MapPin className="w-5 h-5 text-red-400" />
      <div className="flex flex-col items-start justify-between flex-1 mx-3">
        <span className="font-semibold text-white">{name}</span>
        <p className="text-sm text-gray-400 ">{address}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
    </button>
  );
}
