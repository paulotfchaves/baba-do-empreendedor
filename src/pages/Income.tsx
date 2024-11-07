import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/shared/Button";
import AddIncomeModal from "../components/income/AddIncomeModal";
import EditIncomeModal from "../components/income/EditIncomeModal";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";
import DataTable from "../components/shared/DataTable";
import CategoryBadge from "../components/shared/CategoryBadge";
import { Income as IncomeType } from "../types";
import { mockIncomeTableData } from "../mockData";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type GroupBy = "day" | "week" | "month";

console.log("Mock Income Table Data:", mockIncomeTableData);

export default function Income() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [incomes, setIncomes] = useState<IncomeType[]>(mockIncomeTableData);
  console.log("Incomes:", incomes);
  const [selectedIncome, setSelectedIncome] = useState<IncomeType | null>(null);
  const [groupBy, setGroupBy] = useState<GroupBy>("day");

  const handleAddIncome = (newIncome: Omit<IncomeType, "id">) => {
    const incomeWithId = {
      ...newIncome,
      id: uuidv4(),
    };
    setIncomes((prevIncomes) => [...prevIncomes, incomeWithId]);
    setShowAddModal(false);
  };

  const handleEditIncome = (
    id: string,
    updatedIncome: Omit<IncomeType, "id">
  ) => {
    setIncomes((prevIncomes) =>
      prevIncomes.map((income) =>
        income.id === id ? { ...updatedIncome, id } : income
      )
    );
    setSelectedIncome(null);
    setShowEditModal(false);
  };

  const handleDeleteIncome = () => {
    if (selectedIncome) {
      setIncomes((prevIncomes) =>
        prevIncomes.filter((income) => income.id !== selectedIncome.id)
      );
      setShowDeleteModal(false);
      setSelectedIncome(null);
    }
  };

  const totalPersonal = incomes
    .filter((income) => income.category === "Personal")
    .reduce((sum, income) => sum + income.amount, 0);

  const totalBusiness = incomes
    .filter((income) => income.category === "Business")
    .reduce((sum, income) => sum + income.amount, 0);

  const columns = [
    {
      key: "date",
      header: "Data",
      render: (value: string) =>
        format(new Date(value), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
    },
    {
      key: "description",
      header: "Descrição",
    },
    {
      key: "amount",
      header: "Valor",
      render: (value: number) =>
        value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },
    {
      key: "category",
      header: "Categoria",
      render: (value: "Personal" | "Business") => (
        <CategoryBadge category={value} />
      ),
    },
    {
      key: "actions",
      header: "Ações",
      render: (_: any, income: IncomeType) => (
        <div className="space-x-2">
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedIncome(income);
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
              setSelectedIncome(income);
              setShowDeleteModal(true);
            }}
            className="inline-flex items-center bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Minhas Receitas</h1>
          <p className="mt-2 text-gray-600">
            Você precisa alocar todos os recursos recebidos para atingir seus
            sonhos.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar Receita</span>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Pessoal</h3>
          <p className="text-3xl font-bold mt-2 text-[#FF66B2]">
            {totalPersonal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Negócio</h3>
          <p className="text-3xl font-bold mt-2 text-[#33CCCC]">
            {totalBusiness.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <DataTable
          data={incomes}
          columns={columns}
          groupBy={{
            value: groupBy,
            onChange: setGroupBy,
          }}
        />
      </div>

      <AddIncomeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddIncome}
      />

      <EditIncomeModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedIncome(null);
        }}
        onEdit={handleEditIncome}
        income={selectedIncome}
      />

      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedIncome(null);
        }}
        onConfirm={handleDeleteIncome}
        itemType="Income Entry"
      />
    </div>
  );
}
