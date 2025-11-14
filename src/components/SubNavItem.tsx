import {Link} from 'react-router-dom';

interface SubNavItemProps {
  link: string;
  label: string;
  active?: boolean;
}

// function SubNavItem({ label }: SubNavItemProps) {
//   return (
//     <button className="w-full text-left px-4 py-2 text-sm text-red-200 hover:text-white hover:bg-red-800/30 rounded transition-colors">
//       {label}
//     </button>
//   );
// }

function SubNavItem({ label, active, link }: SubNavItemProps) {
  return (
    <Link to={link}>
      <button className={`w-full text-left px-4 py-2 text-sm rounded transition-colors ${
        active 
          ? 'text-white bg-red-800/50 font-medium' 
          : 'text-red-200 hover:text-white hover:bg-red-800/30'
      }`}>
        {label}
      </button>
    </Link>
  );
}

export default SubNavItem;