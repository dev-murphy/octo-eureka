export type PRIORITY = "high" | "medium" | "low" | "";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: PRIORITY;
}

export interface DropdownOption {
  label: string;
  value: string;
}
