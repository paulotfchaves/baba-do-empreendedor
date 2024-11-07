import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemType: string;
}

export default function DeleteConfirmation({ 
  isOpen, 
  onClose, 
  onConfirm,
  itemType 
}: DeleteConfirmationProps) {
  if (!isOpen) return null;

  const translations = {
    'Income Entry': 'Receita',
    'Expense Entry': 'Despesa',
    'Goal': 'Meta'
  };

  const translatedType = translations[itemType as keyof typeof translations] || itemType;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
          Excluir {translatedType}
        </h3>
        
        <p className="text-sm text-gray-500 text-center mb-6">
          Tem certeza que deseja excluir {translatedType.toLowerCase()}? Esta ação não pode ser desfeita.
        </p>

        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}