import { defineStore } from "pinia";
import type { PRIORITY, Todo } from "@/types";

export const useAppStore = defineStore("app", {
  state: () => ({
    name: "Octo Eureka",
    todos: [] as Todo[],
    todoIndex: -1,
    mode: {
      isEditMode: false,
    },
    menus: {
      currentMenu: "",
      filter: {
        options: [
          {
            label: "All",
            value: "",
          },
          {
            label: "Completed",
            value: "completed",
          },
          {
            label: "Ongoing",
            value: "todo",
          },
        ],
        selected: "",
      },
      sort: {
        options: [
          {
            label: "Name (Desc)",
            value: "a-z",
          },
          {
            label: "Name (Asc)",
            value: "z-a",
          },
        ],
      },
      priority: {
        current: "" as PRIORITY,
      },
    },
  }),
  getters: {
    filteredTodos(state) {
      if (state.menus.filter.selected === "") return state.todos;

      if (state.menus.filter.selected === "completed")
        return state.todos.filter((todo) => todo.completed);

      return state.todos.filter((todo) => !todo.completed);
    },
  },
  actions: {
    // Main Task
    addTodo(title: string, dueDate: Date | null) {
      this.todos.push({
        id: this.todos.length + 1,
        title,
        completed: false,
        description: "",
        subtasks: [],
        priority: this.menus.priority.current,
        dueDate,
      });

      this.menus.priority.current = "";
    },
    removeTodo(index: number) {
      this.todos.splice(index, 1);
    },
    editTodo(index: number, newTodo: Partial<Todo>) {
      if (index < 0 || index >= this.todos.length) return;

      this.todos[index] = {
        ...this.todos[index],
        ...newTodo,
      };
    },
    // Subtasks
    addSubtask(title: string) {
      this.todos[this.todoIndex].subtasks.push({
        id: this.todos[this.todoIndex].subtasks.length + 1,
        title,
        completed: false,
      });
    },
    removeSubtask(index: number) {
      this.todos[this.todoIndex].subtasks.splice(index, 1);
    },
    // Menu
    toggleMenu(menu: "filter" | "sort" | "priority" | "calendar") {
      if (this.menus.currentMenu === menu) {
        this.menus.currentMenu = "";
        return;
      }

      this.menus.currentMenu = menu;
    },
    // Priority
    setPriority(priority: PRIORITY) {
      this.menus.priority.current = priority;
    },
  },
});
