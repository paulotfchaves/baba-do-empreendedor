import { Home, DollarSign, MinusCircle, Trophy } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: DollarSign, label: 'Receitas', path: '/income' },
    { icon: MinusCircle, label: 'Despesas', path: '/expenses' },
    { icon: Trophy, label: 'Sonhos', path: '/goals' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-3 px-4 ${
                isActive(path)
                  ? 'text-[#FF66B2]'
                  : 'text-gray-600 hover:text-[#33CCCC]'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}