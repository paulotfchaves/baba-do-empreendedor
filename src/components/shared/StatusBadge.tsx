import { Dumbbell, Clock, Check } from 'lucide-react';

interface StatusBadgeProps {
  status: 'waiting' | 'in_progress' | 'completed';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    waiting: {
      icon: Clock,
      text: 'Aguardando',
      className: 'bg-gray-100 text-gray-800'
    },
    in_progress: {
      icon: Dumbbell,
      text: 'Em Progresso',
      className: 'bg-yellow-100 text-yellow-800'
    },
    completed: {
      icon: Check,
      text: 'Concluído',
      className: 'bg-green-100 text-green-800'
    }
  };

  const { icon: Icon, text, className } = config[status];

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}>
      <Icon className="w-4 h-4 mr-1" />
      {text}
    </div>
  );
}