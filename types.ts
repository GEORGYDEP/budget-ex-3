export interface BudgetLineItem {
  id: string;
  label: string;
  forecast: number;
  real: number;
  isTotal?: boolean;
}

export interface BudgetCategory {
  title: string;
  color: string;
  items: BudgetLineItem[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type ExerciseState = 'view_forecast' | 'view_real' | 'exercise' | 'quiz' | 'completed';
