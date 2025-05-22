<script setup lang="ts">
const appStore = useAppStore();
</script>

<template>
  <div class="flex gap-2">
    <input
      type="text"
      placeholder="Enter todo here"
      v-model="appStore.todoInput"
      class="bg-neutral-800/50 flex-grow border border-neutral-700 rounded-md p-2 text-white placeholder:text-neutral-500 outline-none"
      @keydown.enter="appStore.addTodo"
    />
    <button
      class="bg-neutral-800 px-3 py-2 text-white rounded-md"
      @click="appStore.addTodo"
    >
      Add
    </button>
  </div>
</template>
