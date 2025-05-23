<script setup lang="ts">
const appStore = useAppStore();

const editTodo = (index: number) => {
  appStore.todoIndex = index;
  appStore.mode.isEditMode = true;
};
</script>

<template>
  <div
    class="h-[500px] bg-black border border-neutral-600 rounded-lg overflow-auto"
  >
    <p
      v-if="appStore.todos.length === 0"
      class="w-4/5 pt-3 text-lg text-neutral-400 text-center mx-auto"
    >
      There is no todo items currently. You can add todo by typing the title and
      click the add button.
    </p>
    <ul v-else class="divide-y divide-neutral-700">
      <li
        v-for="(todo, index) in appStore.todos"
        :key="`todo-item-${index}`"
        class="w-full hover:bg-neutral-800/50 text-white flex items-center p-3 overflow-hidden"
      >
        <Checkbox
          :id="`todo-${index}-is-complete`"
          v-model="todo.completed"
          :priority="todo.priority"
        />

        <!-- Title, description and subtask -->
        <div class="pl-2 pr-5">
          <p
            class="truncate overflow-hidden"
            :class="{
              'line-through text-neutral-600': todo.completed,
            }"
          >
            {{ todo.title }}
          </p>

          <!-- Description -->
          <div
            v-if="todo.description"
            class="flex items-center gap-x-1 text-neutral-400"
          >
            <Notes class="w-4 h-4" />
            <span
              class="w-full max-w-[30ch] text-sm truncate overflow-hidden"
              >{{ todo.description }}</span
            >
          </div>
        </div>

        <!-- Button Group: Delete & Edit -->
        <div class="flex gap-x-0.5 ml-auto">
          <!-- Edit Button -->
          <button
            @click="editTodo(index)"
            class="hover:bg-neutral-800 hover:text-blue-500 p-1.5 rounded-md cursor-pointer"
          >
            <Edit class="w-5 h-5" />
          </button>

          <!-- Delete Button -->
          <button
            @click="appStore.removeTodo(index)"
            class="hover:bg-neutral-800 hover:text-red-500 p-1.5 rounded-md cursor-pointer"
          >
            <Trash class="w-5 h-5" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
