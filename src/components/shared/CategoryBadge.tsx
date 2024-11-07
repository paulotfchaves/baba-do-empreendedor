import { DollarSign, Building2, Shuffle, Trophy } from 'lucide-react';

interface CategoryBadgeProps {
  category: 'Personal' | 'Business' | 'Mixed' | 'Goal';
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = {
    Personal: {
      icon: DollarSign,
      text: 'Pessoal',
      className: 'bg-pink-100 text-pink-800'
    },
    Business: {
      icon: Building2,
      text: 'Negócio',
      className: 'bg-teal-100 text-teal-800'
    },
    Mixed: {
      icon: Shuffle,
      text: 'Misto',
      className: 'bg-purple-100 text-purple-800'
    },
    Goal: {
      icon: Trophy,
      text: 'Sonho',
      className: 'bg-yellow-100 text-yellow-800'
    }
  };

  const { icon: Icon, text, className } = config[category];

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}>
      <Icon className="w-4 h-4 mr-1" />
      {text}
    </div>
  );
}