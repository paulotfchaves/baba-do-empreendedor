export interface Income {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: "Business" | "Personal";
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: "Business" | "Personal" | "Mixed" | "Goal";
}

export interface Goal {
  id: string;
  description: string;
  importance: string;
  startDate: string;
  targetDate: string;
  amount: number;
  workdays: string[];
  status: "waiting" | "in_progress" | "completed";
  imageUrl: string;
  completed: boolean;
  completedDate: string;
}
