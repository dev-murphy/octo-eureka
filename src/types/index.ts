export type PRIORITY = "high" | "medium" | "low" | "";

export interface BaseTodo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Todo extends BaseTodo {
  description: string;
  priority: PRIORITY;
  subtasks: BaseTodo[];
}

export interface DropdownOption {
  label: string;
  value: string;
}
