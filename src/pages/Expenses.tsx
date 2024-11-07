import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../components/shared/Button';
import AddExpenseModal from '../components/expenses/AddExpenseModal';
import EditExpenseModal from '../components/expenses/EditExpenseModal';
import DeleteConfirmation from '../components/shared/DeleteConfirmation';
import DataTable from '../components/shared/DataTable';
import CategoryBadge from '../components/shared/CategoryBadge';
import { Expense } from '../types';
import { mockExpenseTableData } from '../mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type GroupBy = 'day' | 'week' | 'month';

export default function Expenses() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenseTableData);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [groupBy, setGroupBy] = useState<GroupBy>('day');

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expenseWithId = {
      ...newExpense,
      id: uuidv4()
    };
    setExpenses(prevExpenses => [...prevExpenses, expenseWithId]);
    setShowAddModal(false);
  };

  const handleEditExpense = (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === id ? { ...updatedExpense, id } : expense
      )
    );
    setSelectedExpense(null);
    setShowEditModal(false);
  };

  const handleDeleteExpense = () => {
    if (selectedExpense) {
      setExpenses(prevExpenses =>
        prevExpenses.filter(expense => expense.id !== selectedExpense.id)
      );
      setShowDeleteModal(false);
      setSelectedExpense(null);
    }
  };

  const calculateTotals = () => {
    return expenses.reduce(
      (acc, expense) => {
        const amount = expense.amount;
        switch (expense.category) {
          case 'Personal':
            acc.personal += amount;
            break;
          case 'Business':
            acc.business += amount;
            break;
          case 'Mixed':
            acc.personal += amount / 2;
            acc.business += amount / 2;
            break;
          case 'Goal':
            acc.goal += amount;
            break;
        }
        return acc;
      },
      { personal: 0, business: 0, goal: 0 }
    );
  };

  const totals = calculateTotals();

  const columns = [
    {
      key: 'date',
      header: 'Data',
      render: (value: string) => format(new Date(value), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    },
    {
      key: 'description',
      header: 'Descrição'
    },
    {
      key: 'amount',
      header: 'Valor',
      render: (value: number) => value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    },
    {
      key: 'category',
      header: 'Categoria',
      render: (value: 'Personal' | 'Business' | 'Mixed' | 'Goal') => <CategoryBadge category={value} />
    },
    {
      key: 'actions',
      header: 'Ações',
      render: (_, expense: Expense) => (
        <div className="space-x-2">
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedExpense(expense);
              setShowEditModal(true);
            }}
            className="inline-flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Editar
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedExpense(expense);
              setShowDeleteModal(true);
            }}
            className="inline-flex items-center bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Excluir
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Seções de Despesas e Totais */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Minhas Despesas</h1>
          <p className="mt-2 text-gray-600">
            Aloque cada despesa para alcançar seus sonhos.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar Despesa</span>
          </Button>
        </div>
      </div>

      {/* Tabela de Totais */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Pessoal</h3>
          <p className="text-3xl font-bold mt-2 text-[#FF66B2]">
            {totals.personal.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Meu Sonho</h3>
          <p className="text-3xl font-bold mt-2 text-[#33CCCC]">
            {totals.goal.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Negócio</h3>
          <p className="text-3xl font-bold mt-2 text-[#33CCCC]">
            {totals.business.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>
        </div>
      </div>

      {/* Tabela de Despesas */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <DataTable
          data={expenses}
          columns={columns}
          groupBy={{
            value: groupBy,
            onChange: setGroupBy
          }}
        />
      </div>

      {/* Modal de Adição de Despesa */}
      <AddExpenseModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddExpense}
      />

      {/* Modal de Edição de Despesa */}
      <EditExpenseModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedExpense(null);
        }}
        onEdit={handleEditExpense}
        expense={selectedExpense}
      />

      {/* Modal de Exclusão de Despesa */}
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedExpense(null);
        }}
        onConfirm={handleDeleteExpense}
        itemType="Expense Entry"
      />
    </div>
  );
}
