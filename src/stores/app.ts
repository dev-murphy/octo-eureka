import { defineStore } from "pinia";
import type { Todo } from "@/types";
export const useAppStore = defineStore("app", {
  state: () => ({
    name: "Octo Eureka",
    todos: [] as Todo[],
    todoInput: "",
  }),
  actions: {
    addTodo() {
      this.todos.push({
        id: this.todos.length + 1,
        title: this.todoInput,
        completed: false,
      });
      this.todoInput = "";
    },
    removeTodo(index: number) {
      this.todos.splice(index, 1);
    },
  },
});
