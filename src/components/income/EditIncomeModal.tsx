import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../shared/Button';
import { FormLabel, Select } from '../shared/FormStyles';
import CurrencyInput from '../shared/CurrencyInput';
import DatePicker from '../shared/DatePicker';
import { Income } from '../../types';
import Modal from '../shared/Modal';

interface EditIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: string, income: Omit<Income, 'id'>) => void;
  income: Income | null;
}

export default function EditIncomeModal({ isOpen, onClose, onEdit, income }: EditIncomeModalProps) {
  const [formData, setFormData] = useState({
    date: new Date(),
    description: '',
    amount: '',
    category: 'Personal' as Income['category']
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (income) {
      setFormData({
        date: new Date(income.date),
        description: income.description,
        amount: income.amount.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        category: income.category
      });
    }
  }, [income]);

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
    
    if (!validateForm() || !income) return;
    
    setLoading(true);
    try {
      onEdit(income.id, {
        date: format(formData.date, 'yyyy-MM-dd'),
        description: formData.description,
        amount: parseFloat(formData.amount.replace(/\./g, '').replace(',', '.')),
        category: formData.category
      });
      onClose();
    } catch (error) {
      console.error('Error editing income:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !income) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Receita"
      subtitle="Atualize os detalhes da receita."
    >

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <FormLabel htmlFor="date" required>Data do Recebimento</FormLabel>
            <DatePicker
              value={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              error={errors.date}
              required
            />
          </div>

          <div>
            <FormLabel htmlFor="description" required>O que você vendeu ou fonte de renda?</FormLabel>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-12 w-full px-4 rounded-lg border border-gray-300 focus:border-[#FF66B2] focus:ring-2 focus:ring-[#FF66B2] focus:ring-opacity-20"
              placeholder="Ex: Serviços de consultoria, Venda de produto"
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <FormLabel htmlFor="amount" required>Valor recebido</FormLabel>
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
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Income['category'] })}
              required
            >
              <option value="Personal">Pessoal</option>
              <option value="Business">Negócio</option>
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