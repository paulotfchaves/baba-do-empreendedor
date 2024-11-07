import { useMemo, useState } from 'react';
import { Trophy, TrendingUp, ArrowRight, Star, PartyPopper, Award, DollarSign, MinusCircle, Info, Calendar, Clock, Check } from 'lucide-react';
import { format, differenceInDays, isWeekend } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import Button from '../components/shared/Button';
import DateRangePicker from '../components/shared/DateRangePicker';
import GroupingFilter from '../components/shared/GroupingFilter';
import SummaryTable from '../components/home/SummaryTable';
import { mockGoals, mockIncomes, mockExpenses } from '../mockData';
import { Goal, Expense, Income } from '../types';
import { startOfMonth, endOfMonth } from 'date-fns';

type GroupBy = 'day' | 'week' | 'month';

export default function Home() {
  const [dateRange, setDateRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()) 
  });
  const [groupBy, setGroupBy] = useState<GroupBy>('day');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [goals] = useState(mockGoals);
  const [expenses] = useState(mockExpenses);
  const [incomes] = useState(mockIncomes);

  const activeGoal = useMemo(() => {
    return goals.find(goal => !goal.completed);
  }, [goals]);

  const calculateSavedAmount = () => {
  // Soma de todos os valores de despesas com categoria "Goal"
  const totalGoalExpenses = expenses
    .filter(expense => expense.category === 'Goal')
    .reduce((sum, expense) => sum + expense.amount, 0);

  // Soma de todos os valores de objetivos com status "completed"
  const totalCompletedGoals = goals
    .filter(goal => goal.status === 'completed')
    .reduce((sum, goal) => sum + goal.amount, 0);

  // Valor economizado: despesas "Goal" menos o valor dos objetivos concluídos
  return totalGoalExpenses - totalCompletedGoals;
};

  
  // Calculate remaining work days
  const calculateRemainingWorkDays = (goal: Goal) => {
    if (!goal) return 0;
    const startDate = new Date();
    const targetDate = new Date(goal.targetDate);
    let workDays = 0;
    let currentDate = startDate;

    while (currentDate <= targetDate) {
      const dayName = format(currentDate, 'EEEE');
      if (goal.workdays.includes(dayName)) {
        workDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return workDays;
  };

  // Calculate daily savings needed
  const calculateDailySavings = (goal: Goal) => {
    if (!goal) return 0;
    const remainingDays = calculateRemainingWorkDays(goal);
    return remainingDays > 0 ? goal.amount / remainingDays : 0;
  };

  const calculateSummary = () => {
    const summary = {
      personalIncome: 0,
      businessIncome: 0,
      personalExpense: 0,
      businessExpense: 0,
      mixedExpense: 0,
      goalAmount: 0
    };

    // Calculate total goal amount saved (all goal expenses)
    expenses.forEach(expense => {
      if (expense.category === 'Goal') {
        summary.goalAmount += expense.amount;
      }
    });

    // Calculate filtered period summaries
    incomes.forEach(income => {
      if (income.category === 'Personal') summary.personalIncome += income.amount;
      else summary.businessIncome += income.amount;
    });

    expenses.forEach(expense => {
      switch (expense.category) {
        case 'Personal':
          summary.personalExpense += expense.amount;
          break;
        case 'Business':
          summary.businessExpense += expense.amount;
          break;
        case 'Mixed':
          summary.mixedExpense += expense.amount;
          break;
      }
    });

    return summary;
  };

  const summary = calculateSummary();

  const calculateBalances = () => {
    const halfMixed = summary.mixedExpense / 2;
    return {
      personal: summary.personalIncome - summary.personalExpense - halfMixed,
      business: summary.businessIncome - summary.businessExpense - halfMixed
    };
  };

  const balances = calculateBalances();

  const totalGoalsAmount = useMemo(() => {
    return goals.reduce((total, goal) => total + goal.amount, 0);
  }, [goals]);

  const progressPercentage = (summary.goalAmount / totalGoalsAmount) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-start">
        <DateRangePicker
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={setDateRange}
        />
      </div>

      {goals.length === 0 ? (
        <div className="bg-gradient-to-r from-[#FF66B2] to-[#33CCCC] rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Pronto para Começar sua Jornada?</h2>
            <p className="text-lg mb-6 opacity-90">
              Defina seu primeiro sonho e acompanhe seu progresso para alcançá-lo.
            </p>
            <Link to="/goals">
              <Button className="bg-white text-[#FF66B2] hover:bg-gray-100 flex items-center space-x-2 mx-auto">
                <span>Definir seu Primeiro Sonho</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-[#FF66B2] to-[#33CCCC] rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">
                {activeGoal ? activeGoal.description : "Todos os Sonhos Realizados!"}
              </h2>
              <p className="text-lg opacity-90">
                Continue assim! Você está fazendo um ótimo progresso em sua jornada financeira.
              </p>
            </div>

            {activeGoal && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white bg-opacity-20 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">Período</h3>
                    </div>
                    <div className="space-y-1">
                      <p>Início: {format(new Date(activeGoal.startDate), 'dd/MM/yyyy')}</p>
                      <p>Meta: {format(new Date(activeGoal.targetDate), 'dd/MM/yyyy')}</p>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">Dias Restantes</h3>
                    </div>
                    <p className="text-3xl font-bold">
                      {calculateRemainingWorkDays(activeGoal)} dias úteis
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-6">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold mb-4">Progresso</h3>
                    <h3 className="text-lg font-semibold mb-4">Valor do Sonho</h3>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-3xl font-semibold inline-block">
                          {Math.min(80, progressPercentage).toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg">
                          {activeGoal.amount.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white bg-opacity-20">
                      <div
                        style={{ width: `${Math.min(100, progressPercentage)}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white transition-all duration-500 animate-pulse"
                      />
                    </div>
                  </div>
                </div>


                  <div className="bg-white bg-opacity-20 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">Valor Economizado</h3>
                    </div>
                    <p className="text-3xl font-bold">
                      {calculateSavedAmount().toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </p>
                    <p className="text-sm opacity-90">
                      Você precisa economizar{' '}
                      <span className="font-bold">
                        {calculateDailySavings(activeGoal).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </span>{' '}
                      por dia útil para alcançar seu sonho
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => {/* Implement goal completion logic */}}
                    className="relative overflow-hidden px-8 py-3 rounded-lg font-bold text-white transition-all duration-300
                      bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500
                      animate-shimmer bg-[length:200%_100%]
                      before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSJub25lIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xIDAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjYSkiLz48L3N2Zz4=')] before:opacity-20 before:mix-blend-overlay
                      active:scale-95 shadow-lg shadow-amber-500/25"
                  >
                    <span className="flex items-center space-x-2 relative z-10">
                      <Check className="w-5 h-5" />
                      <span>Concluir Sonho</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                      animate-slide shimmer-loop">
                    </div>
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="w-6 h-6 text-[#FF66B2]" />
            <h2 className="text-xl font-bold text-gray-800">Resumo de Receitas</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pessoal</h3>
              <p className="text-2xl font-bold text-[#FF66B2]">
                {summary.personalIncome.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Negócio</h3>
              <p className="text-2xl font-bold text-[#33CCCC]">
                {summary.businessIncome.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <MinusCircle className="w-6 h-6 text-[#FF66B2]" />
            <h2 className="text-xl font-bold text-gray-800">Resumo de Despesas</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pessoal</h3>
              <p className="text-2xl font-bold text-[#FF66B2]">
                {(summary.personalExpense + summary.mixedExpense / 2).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
              {summary.mixedExpense > 0 && (
                <div className="group relative mt-1">
                  <p className="text-sm text-gray-500">
                    +{(summary.mixedExpense / 2).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })} misto
                  </p>
                  <div className="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-48 bg-gray-800 text-white text-xs rounded p-2">
                    Este valor já está somado acima e representa 50% das despesas mistas
                  </div>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Negócio</h3>
              <p className="text-2xl font-bold text-[#33CCCC]">
                {(summary.businessExpense + summary.mixedExpense / 2).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
              {summary.mixedExpense > 0 && (
                <div className="group relative mt-1">
                  <p className="text-sm text-gray-500">
                    +{(summary.mixedExpense / 2).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })} misto
                  </p>
                  <div className="invisible group-hover:visible absolute bottom-full left-0 mb-2 w-48 bg-gray-800 text-white text-xs rounded p-2">
                    Este valor já está somado acima e representa 50% das despesas mistas
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Saldo Pessoal</h3>
          <p className={`text-3xl font-bold mt-2 ${
            balances.personal >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {balances.personal.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Saldo Negócio</h3>
          <p className={`text-3xl font-bold mt-2 ${
            balances.business >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {balances.business.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Resumo Financeiro</h2>
            <GroupingFilter value={groupBy} onChange={setGroupBy} />
          </div>
        </div>
        <SummaryTable
          data={{ incomes, expenses }}
          groupBy={groupBy}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/income">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <DollarSign className="w-8 h-8 text-[#FF66B2] mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Registrar Receita</h3>
            <p className="text-gray-600 mt-1">Acompanhe seus ganhos e fontes de renda.</p>
          </div>
        </Link>
        <Link to="/expenses">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <MinusCircle className="w-8 h-8 text-[#33CCCC] mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Adicionar Despesa</h3>
            <p className="text-gray-600 mt-1">Registre seus gastos e categorize custos.</p>
          </div>
        </Link>
        <Link to="/goals">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <Trophy className="w-8 h-8 text-[#FF66B2] mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Definir Sonhos</h3>
            <p className="text-gray-600 mt-1">Defina e acompanhe seus objetivos financeiros.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}