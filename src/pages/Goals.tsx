import { useState } from "react";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/shared/Button";
import AddGoalModal from "../components/goals/AddGoalModal";
import EditGoalModal from "../components/goals/EditGoalModal";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";
import { Goal } from "../types";
import StatusBadge from "../components/shared/StatusBadge";

export default function Goals() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: uuidv4(),
      description: "Novo Carro",
      importance: "Preciso de um transporte confiável para reuniões e família",
      startDate: "2024-01-01",
      targetDate: "2024-06-30",
      amount: 35000,
      workdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      status: "in_progress",
      imageUrl: "",
      completed: false,
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
      status: "completed",
      imageUrl: "",
      completed: false,
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
      status: "waiting",
      imageUrl: "",
      completed: false,
      completedDate: "",
    },
  ]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddGoal = (
    newGoal: Omit<Goal, "id" | "status" | "completed" | "completedDate">
  ) => {
    const goalWithDefaults: Goal = {
      id: uuidv4(),
      status: "waiting", // Status padrão
      completed: false, // Sempre falso ao criar
      completedDate: "", // Sempre vazio ao criar
      ...newGoal,
    };
    setGoals((prevGoals) => [...prevGoals, goalWithDefaults]);
  };

  const handleEditGoal = (id: string, updatedGoal: Omit<Goal, "id">) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, ...updatedGoal } : goal
      )
    );
  };

  const handleDeleteGoal = () => {
    if (selectedGoal) {
      setGoals((prevGoals) =>
        prevGoals.filter((goal) => goal.id !== selectedGoal.id)
      );
      setSelectedGoal(null);
      setShowDeleteModal(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(goals.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentGoals = goals.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Meus Sonhos</h1>
          <p className="mt-2 text-gray-600">
            Definir seus sonhos claramente ajuda você a alcançá-los. Vamos fazer
            um plano!
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar Sonho</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Histórico de Sonhos
          </h2>
        </div>
        {goals.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Nenhum sonho definido ainda. Clique em "Adicionar Sonho" para
            começar!
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Data de Início
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Data Alvo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição do Sonho
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentGoals.map((goal) => (
                      <tr key={goal.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {goal.startDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {goal.targetDate}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">
                              {goal.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {goal.importance}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {goal.amount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={goal.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <Button
                            variant="secondary"
                            onClick={() => setSelectedGoal(goal)}
                            className="inline-flex items-center"
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setSelectedGoal(goal);
                              setShowDeleteModal(true);
                            }}
                            className="inline-flex items-center bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="rounded-lg border-gray-300 shadow-sm focus:border-[#FF66B2] focus:ring-[#FF66B2]"
                >
                  <option value={10}>10 linhas</option>
                  <option value={25}>25 linhas</option>
                  <option value={50}>50 linhas</option>
                  <option value={100}>100 linhas</option>
                </select>
                <span className="text-sm text-gray-700">
                  Mostrando {startIndex + 1} até{" "}
                  {Math.min(endIndex, goals.length)} de {goals.length} registros
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-sm text-gray-700">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <AddGoalModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddGoal}
      />

      <EditGoalModal
        isOpen={!!selectedGoal && !showDeleteModal}
        onClose={() => setSelectedGoal(null)}
        onEdit={handleEditGoal}
        goal={selectedGoal}
      />

      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedGoal(null);
        }}
        onConfirm={handleDeleteGoal}
        itemType="Sonho"
      />
    </div>
  );
}
