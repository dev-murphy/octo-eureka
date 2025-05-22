<script setup lang="ts">
const appStore = useAppStore();

const todoExists = computed(() => {
  const found = appStore.todos.find(
    (todo) => todo.title.toLowerCase() === appStore.todoInput.toLowerCase()
  );

  if (found) return true;
  return false;
});
</script>

<template>
  <div>
    <div class="flex gap-2">
      <input
        type="text"
        placeholder="Enter todo here"
        v-model="appStore.todoInput"
        class="bg-neutral-800/50 flex-grow border border-neutral-700 rounded-md p-2 text-white placeholder:text-neutral-500 outline-none"
        @keydown.enter="appStore.addTodo"
      />
      <button
        class="bg-neutral-800 hover:bg-neutral-700 p-2 text-white rounded-md cursor-pointer"
        @click="appStore.addTodo"
      >
        <Plus class="w-6 h-6" />
      </button>
    </div>
    <p v-if="todoExists" class="pt-1 text-sm text-red-400 tracking-wide">
      A todo with this title already exist. Please type another title.
    </p>
  </div>
</template>
