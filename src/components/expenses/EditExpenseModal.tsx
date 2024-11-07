import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../shared/Button';
import { FormLabel, Select, Input } from '../shared/FormStyles';
import CurrencyInput from '../shared/CurrencyInput';
import DatePicker from '../shared/DatePicker';
import { Expense } from '../../types';
import Modal from '../shared/Modal';

interface EditExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: string, expense: Omit<Expense, 'id'>) => void;
  expense: Expense | null;
}

export default function EditExpenseModal({ isOpen, onClose, onEdit, expense }: EditExpenseModalProps) {
  const [formData, setFormData] = useState({
    date: new Date(),
    description: '',
    amount: '',
    category: 'Personal' as Expense['category']
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (expense) {
      setFormData({
        date: new Date(expense.date),
        description: expense.description,
        amount: expense.amount.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        category: expense.category
      });
    }
  }, [expense]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    if (!formData.amount) {
      newErrors.amount = 'Valor é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !expense) return;
    
    setLoading(true);
    try {
      onEdit(expense.id, {
        date: format(formData.date, 'yyyy-MM-dd'),
        description: formData.description,
        amount: parseFloat(formData.amount.replace(/\./g, '').replace(',', '.')),
        category: formData.category
      });
      onClose();
    } catch (error) {
      console.error('Error editing expense:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !expense) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Despesa"
      subtitle="Atualize os detalhes da despesa."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <FormLabel htmlFor="date" required>Data da Despesa</FormLabel>
          <DatePicker
            id="date"
            value={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            error={errors.date}
            required
          />
        </div>

        <div>
          <FormLabel htmlFor="description" required>O que foi comprado?</FormLabel>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Ex: Material de escritório, Almoço de negócios"
            error={errors.description}
            required
          />
        </div>

        <div>
          <FormLabel htmlFor="amount" required>Valor gasto</FormLabel>
          <CurrencyInput
            value={formData.amount}
            onChange={(value) => setFormData({ ...formData, amount: value })}
            error={errors.amount}
            required
          />
        </div>

        <div>
          <FormLabel htmlFor="category" required>Categoria</FormLabel>
          <Select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Expense['category'] })}
            required
          >
            <option value="Personal">Pessoal</option>
            <option value="Business">Negócio</option>
            <option value="Mixed">Misto</option>
            <option value="Goal">Sonho</option>
          </Select>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            size="lg"
            loading={loading}
            className="flex items-center space-x-2"
          >
            <Check className="w-5 h-5" />
            <span>Salvar Alterações</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
