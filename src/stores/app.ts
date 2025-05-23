import { defineStore } from "pinia";
import type { PRIORITY, Todo } from "@/types";

export const useAppStore = defineStore("app", {
  state: () => ({
    name: "Octo Eureka",
    todos: [] as Todo[],
    todoIndex: -1,
    todoInput: "",
    mode: {
      isEditMode: false,
    },
    menus: {
      currentMenu: "",
      filter: {
        options: [
          {
            label: "Completed",
            value: "completed",
          },
          {
            label: "To Do",
            value: "todo",
          },
        ],
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
  actions: {
    addTodo() {
      const found = this.todos.find(
        (todo) => todo.title.toLowerCase() === this.todoInput.toLowerCase()
      );

      if (this.todoInput === "" || found) return;

      this.todos.push({
        id: this.todos.length + 1,
        title: this.todoInput,
        completed: false,
        description: "",
        priority: this.menus.priority.current,
      });

      this.todoInput = "";
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
    // Menu
    toggleMenu(menu: "filter" | "sort" | "priority") {
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
