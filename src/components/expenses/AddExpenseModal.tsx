import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../shared/Button';
import { FormLabel, Select, Input } from '../shared/FormStyles';
import CurrencyInput from '../shared/CurrencyInput';
import DatePicker from '../shared/DatePicker';
import { Expense } from '../../types';
import Modal from '../shared/Modal';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (expense: Omit<Expense, 'id'>) => void;
}

export default function AddExpenseModal({ isOpen, onClose, onAdd }: AddExpenseModalProps) {
  const [formData, setFormData] = useState({
    date: new Date(),
    description: '',
    amount: '',
    category: 'Personal' as Expense['category']
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      onAdd({
        date: format(formData.date, 'yyyy-MM-dd'),
        description: formData.description,
        amount: parseFloat(formData.amount.replace(/\./g, '').replace(',', '.')),
        category: formData.category
      });
      onClose();
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rastreando cada centavo... ótimo!"
      subtitle="Preencha os campos para registrar corretamente..."
    >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              <span>Adicionar Despesa</span>
            </Button>
          </div>
        </form>
      </Modal>
  );
}