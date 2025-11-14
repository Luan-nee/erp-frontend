interface MetricCardProps {
  name: string;
  value: number; 
  color: string;
  children?: React.ReactNode;
}

export default function MetricCard({ name, value, color, children }: MetricCardProps) {
  return (
    <div className={`bg-gradient-to-br from-${color}-900/50 to-${color}-800/30 border border-${color}-700/50 rounded-xl p-6` }>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-${color}-300 text-sm font-medium mb-1`}>
            {name}
          </p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}-600 rounded-lg flex items-center justify-center`}>
          {children}
        </div>
      </div>
    </div>
  );
}
