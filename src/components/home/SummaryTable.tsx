import { useMemo, useState } from 'react';
import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  format,
  isSameDay,
  isSameWeek,
  isSameMonth
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Income, Expense } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SummaryTableProps {
  data: {
    incomes: Income[];
    expenses: Expense[];
  };
  groupBy: 'day' | 'week' | 'month';
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
}

export default function SummaryTable({
  data,
  groupBy,
  rowsPerPage,
  onRowsPerPageChange
}: SummaryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const groupedData = useMemo(() => {
    const groups = new Map();

    const getGroupKey = (date: Date) => {
      switch (groupBy) {
        case 'day':
          return format(startOfDay(date), 'yyyy-MM-dd');
        case 'week':
          return format(startOfWeek(date, { locale: ptBR }), 'yyyy-MM-dd');
        case 'month':
          return format(startOfMonth(date), 'yyyy-MM');
      }
    };

    data.incomes.forEach((income) => {
      const date = new Date(income.date);
      const key = getGroupKey(date);

      if (!groups.has(key)) {
        groups.set(key, {
          date,
          personalIncome: 0,
          businessIncome: 0,
          personalExpense: 0,
          businessExpense: 0,
          goalAmount: 0,
          mixedExpense: 0
        });
      }

      const group = groups.get(key);
      if (income.category === 'Personal') {
        group.personalIncome += income.amount;
      } else {
        group.businessIncome += income.amount;
      }
    });

    data.expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const key = getGroupKey(date);

      if (!groups.has(key)) {
        groups.set(key, {
          date,
          personalIncome: 0,
          businessIncome: 0,
          personalExpense: 0,
          businessExpense: 0,
          goalAmount: 0,
          mixedExpense: 0
        });
      }

      const group = groups.get(key);
      switch (expense.category) {
        case 'Personal':
          group.personalExpense += expense.amount;
          break;
        case 'Business':
          group.businessExpense += expense.amount;
          break;
        case 'Mixed':
          group.mixedExpense += expense.amount;
          group.personalExpense += expense.amount / 2;
          group.businessExpense += expense.amount / 2;
          break;
        case 'Goal':
          group.goalAmount += expense.amount;
          break;
      }
    });

    return Array.from(groups.values()).sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [data, groupBy]);

  const formatDate = (date: Date) => {
    switch (groupBy) {
      case 'day':
        return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      case 'week':
        return `Semana de ${format(date, "dd 'de' MMMM", { locale: ptBR })}`;
      case 'month':
        return format(date, "MMMM 'de' yyyy", { locale: ptBR });
    }
  };

  const totalPages = Math.ceil(groupedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = groupedData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Período
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receita Pessoal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receita Empresa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Despesa Pessoal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Despesa Empresa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Meta
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(row.date)}
                </td>
                <td className="px-6 py-4">
                  {row.personalIncome.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
                <td className="px-6 py-4">
                  {row.businessIncome.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
                <td className="px-6 py-4">
                  {row.personalExpense.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
                <td className="px-6 py-4">
                  {row.businessExpense.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
                <td className="px-6 py-4">
                  {row.goalAmount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="rounded-lg border-gray-300 shadow-sm focus:border-[#FF66B2] focus:ring-[#FF66B2]"
          >
            <option value={10}>10 linhas</option>
            <option value={25}>25 linhas</option>
            <option value={50}>50 linhas</option>
            <option value={100}>100 linhas</option>
          </select>
          <span className="text-sm text-gray-700">
            Mostrando {startIndex + 1} até {Math.min(endIndex, groupedData.length)} de {groupedData.length} registros
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}