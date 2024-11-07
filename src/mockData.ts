import { Income, Expense, Goal } from "./types";
import { v4 as uuidv4 } from "uuid";

// Goals Data
export const mockGoals: Goal[] = [
  {
    id: uuidv4(),
    description: "Carro Novo",
    importance:
      "Preciso de transporte confiável para reuniões de negócios e família",
    startDate: "2024-01-01",
    targetDate: "2024-06-30",
    amount: 35000,
    workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    completed: true,
    status: "waiting",
    imageUrl: "",
    completedDate: "",
  },
  {
    id: uuidv4(),
    description: "Fundo de Emergência",
    importance: "Segurança financeira para despesas inesperadas",
    startDate: "2024-01-15",
    targetDate: "2024-05-15",
    amount: 20000,
    workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    completed: true,
    status: "waiting",
    imageUrl: "",
    completedDate: "",
  },
  {
    id: uuidv4(),
    description: "Entrada da Casa",
    importance: "Investimento no nosso futuro e estabilidade familiar",
    startDate: "2024-02-01",
    targetDate: "2024-12-31",
    amount: 50000,
    workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    completed: true,
    status: "waiting",
    imageUrl: "",
    completedDate: "",
  },
  {
    id: uuidv4(),
    description: "Expansão do Negócio",
    importance: "Escalar operações e aumentar potencial de receita",
    startDate: "2024-02-15",
    targetDate: "2024-07-15",
    amount: 25000,
    workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    completed: true,
    status: "waiting",
    imageUrl: "",
    completedDate: "",
  },
  {
    id: uuidv4(),
    description: "Viagem Mundial",
    importance: "Experiência de vida e enriquecimento cultural",
    startDate: "2024-03-01",
    targetDate: "2024-12-31",
    amount: 15000,
    workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    completed: false,
    status: "waiting",
    imageUrl: "",
    completedDate: "",
  },
];

// Income Data - 2 months
export const mockIncomes: Income[] = [
  // March 2024
  {
    id: uuidv4(),
    date: "2024-03-01",
    description: "Serviços de Consultoria",
    amount: 12000,
    category: "Business",
  },
  {
    id: uuidv4(),
    date: "2024-03-05",
    description: "Dividendos de Investimentos",
    amount: 3500,
    category: "Personal",
  },
  {
    id: uuidv4(),
    date: "2024-03-15",
    description: "Conclusão de Projeto",
    amount: 15000,
    category: "Business",
  },
  {
    id: uuidv4(),
    date: "2024-03-20",
    description: "Renda de Aluguel",
    amount: 2800,
    category: "Personal",
  },
  {
    id: uuidv4(),
    date: "2024-03-25",
    description: "Vendas de Curso Online",
    amount: 8500,
    category: "Business",
  },
  // February 2024
  {
    id: uuidv4(),
    date: "2024-02-01",
    description: "Serviços de Consultoria",
    amount: 11000,
    category: "Business",
  },
  {
    id: uuidv4(),
    date: "2024-02-05",
    description: "Dividendos de Investimentos",
    amount: 3200,
    category: "Personal",
  },
  {
    id: uuidv4(),
    date: "2024-02-15",
    description: "Conclusão de Projeto",
    amount: 13500,
    category: "Business",
  },
  {
    id: uuidv4(),
    date: "2024-02-20",
    description: "Renda de Aluguel",
    amount: 2800,
    category: "Personal",
  },
  {
    id: uuidv4(),
    date: "2024-02-25",
    description: "Vendas de Curso Online",
    amount: 7500,
    category: "Business",
  },
];

// Expenses Data - 2 months
export const mockExpenses: Expense[] = [
  // March 2024
  {
    id: uuidv4(),
    date: "2024-03-02",
    description: "Aluguel do Escritório",
    amount: 3500,
    category: "Business",
  },
  {
    id: uuidv4(),
    date: "2024-03-05",
    description: "Compras do Supermercado",
    amount: 800,
    category: "Personal",
  },
  {
    id: uuidv4(),
    date: "2024-03-07",
    description: "Campanha de Marketing",
    amount: 2500,
    category: "Business",
  },
  {
    id: uuidv4(),
    date: "2024-03-10",
    description: "Parcela do Carro",
    amount: 35000,
    category: "Goal",
  },
  {
    id: uuidv4(),
    date: "2024-03-12",
    description: "Fundo de Emergência",
    amount: 20000,
    category: "Goal",
  },
  {
    id: uuidv4(),
    date: "2024-03-15",
    description: "Almoço com Equipe",
    amount: 400,
    category: "Mixed",
  },
  {
    id: uuidv4(),
    date: "2024-03-18",
    description: "Entrada da Casa",
    amount: 50000,
    category: "Goal",
  },
  {
    id: uuidv4(),
    date: "2024-03-20",
    description: "Investimento Expansão",
    amount: 25000,
    category: "Goal",
  },
  {
    id: uuidv4(),
    date: "2024-03-25",
    description: "Economia Viagem Mundial",
    amount: 20000,
    category: "Goal",
  },
  // February 2024
  {
    id: uuidv4(),
    date: "2024-02-02",
    description: "Aluguel do Escritório",
    amount: 3500,
    category: "Business",
  },
  {
    id: uuidv4(),
    date: "2024-02-05",
    description: "Compras do Supermercado",
    amount: 750,
    category: "Personal",
  },
  {
    id: uuidv4(),
    date: "2024-02-07",
    description: "Campanha de Marketing",
    amount: 2000,
    category: "Business",
  },
  {
    id: uuidv4(),
    date: "2024-02-10",
    description: "Assinaturas de Software",
    amount: 300,
    category: "Mixed",
  },
  {
    id: uuidv4(),
    date: "2024-02-15",
    description: "Almoço com Equipe",
    amount: 350,
    category: "Mixed",
  },
  {
    id: uuidv4(),
    date: "2024-02-20",
    description: "Material de Escritório",
    amount: 250,
    category: "Business",
  },
];

// Mock data for Income table with specific examples
export const mockIncomeTableData: Income[] = [
  {
    id: uuidv4(),
    date: "2024-11-07",
    description: "Consultoria de Marketing",
    amount: 5000,
    category: "Business",
  },
  {
    id: uuidv4(),
    date: "2024-03-10",
    description: "Aluguel Recebido",
    amount: 2500,
    category: "Personal",
  },
];

// Mock data for Expenses table with specific examples
export const mockExpenseTableData: Expense[] = [
  {
    id: uuidv4(),
    date: "2024-03-15",
    description: "Material de Escritório",
    amount: 350,
    category: "Business",
  },
  {
    id: uuidv4(),
    date: "2024-03-12",
    description: "Supermercado",
    amount: 800,
    category: "Personal",
  },
  {
    id: uuidv4(),
    date: "2024-03-10",
    description: "Almoço com Cliente",
    amount: 150,
    category: "Mixed",
  },
  {
    id: uuidv4(),
    date: "2024-03-05",
    description: "Parcela do Carro Novo",
    amount: 2500,
    category: "Goal",
  },
];
