import { User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface TopBarProps {
  onLogout: () => void;
}

export default function TopBar({ onLogout }: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    navigate('/profile');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[#FF66B2] font-bold text-2xl">Babá do Empreendedor</span>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <User className="w-6 h-6 text-gray-700" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
              <button
                onClick={handleProfileClick}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Minha Conta
              </button>
              <button 
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}