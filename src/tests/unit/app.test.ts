import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAppStore } from "../../stores/app";

describe("App Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("Initial State", () => {
    it("should have correct initial state", () => {
      const store = useAppStore();

      expect(store.name).toBe("Octo Eureka");
      expect(store.todoIndex).toBe(-1);
      expect(store.todos.length).toBe(0);
    });
  });

  describe("Getters", () => {
    it("should show filtered completed todos", () => {
      const store = useAppStore();
      store.addTodo("This is todo #1", null);
      store.addTodo("This is todo #2", null);
      store.addTodo("This is todo #3", null);

      expect(store.filteredTodos.length).toEqual(3);

      store.menus.filter.selected = "completed";
      expect(store.filteredTodos.length).toEqual(0);

      store.editTodo(1, {
        completed: true,
      });
      expect(store.filteredTodos.length).toEqual(1);

      store.menus.filter.selected = "todo";
      expect(store.filteredTodos.length).toEqual(2);
    });
  });

  describe("Actions", () => {
    it("should be able to add todo", () => {
      const store = useAppStore();
      const title = "This is a todo";

      store.addTodo(title, null);

      expect(store.todos.length).toBe(1);
      expect(store.todos[0].title).toBe(title);
    });

    it("should be able to edit todo", () => {
      const store = useAppStore();
      store.addTodo("This is a simple todo", null);

      expect(store.todos[0].title).toBe("This is a simple todo");
      expect(store.todos[0].completed).toBe(false);
      expect(store.todos[0].subtasks.length).toBe(0);
      expect(store.todos[0].priority).toBe("");
      expect(store.todos[0].dueDate).toBeNull();

      store.editTodo(0, {
        title: "This title is edited",
        completed: true,
        subtasks: [
          {
            title: "First Subtask",
            completed: false,
            id: 1,
          },
        ],
        dueDate: new Date(),
        priority: "high",
      });
      expect(store.todos[0].title).toBe("This title is edited");
      expect(store.todos[0].completed).toBe(true);
      expect(store.todos[0].subtasks.length).toBe(1);
      expect(store.todos[0].priority).toBe("high");
      expect(store.todos[0].dueDate).toBeInstanceOf(Date);
    });

    it("should remove todo", () => {
      const store = useAppStore();
      store.addTodo("This is a simple todo", null);
      expect(store.todos.length).toBe(1);

      store.removeTodo(0);
      expect(store.todos.length).toBe(0);
    });

    it("should be able to add subtask", () => {
      const store = useAppStore();
      store.addTodo("This is a simple todo", null);
      store.todoIndex = 0;

      store.addSubtask("This is a sub task");
      expect(store.todos[store.todoIndex].subtasks[0].id).toEqual(1);
      expect(store.todos[store.todoIndex].subtasks[0].title).toEqual(
        "This is a sub task"
      );
      expect(store.todos[store.todoIndex].subtasks[0].completed).toEqual(false);
    });

    it("should be able to remove subtask", () => {
      const store = useAppStore();
      store.addTodo("This is a simple todo", null);
      store.todoIndex = 0;

      store.addSubtask("This is a sub task");
      expect(store.todos[store.todoIndex].subtasks.length).toEqual(1);

      store.removeSubtask(0);
      expect(store.todos[store.todoIndex].subtasks.length).toEqual(0);
    });

    it("should toogle menu", () => {
      const store = useAppStore();
      expect(store.menus.currentMenu).toEqual("");

      store.toggleMenu("filter");
      expect(store.menus.currentMenu).toEqual("filter");

      store.toggleMenu("filter");
      expect(store.menus.currentMenu).toEqual("");
    });

    it("should set priority", () => {
      const store = useAppStore();
      expect(store.menus.priority.current).toEqual("");

      store.setPriority("high");
      expect(store.menus.priority.current).toEqual("high");
    });
  });
});
