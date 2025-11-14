import { Link } from 'react-router-dom';

interface NavItemProps {
  link: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}


function NavItem({ link, icon: Icon, label, active, collapsed, children, onClick }: NavItemProps) {
  return (
    <Link to={link}>
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
          active
            ? "bg-red-800 text-white shadow-lg"
            : "text-red-100 hover:bg-red-800/50"
        }`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!collapsed && <span className="font-medium text-sm">{label}</span>}
      </button>
      {active && children}
    </Link>
  );
}

export default NavItem;
