<script setup lang="ts">
const appStore = useAppStore();
</script>

<template>
  <div
    class="h-[500px] bg-black border border-neutral-600 rounded-lg overflow-auto"
  >
    <ul class="divide-y divide-neutral-700">
      <li
        v-for="(todo, index) in appStore.todos"
        :key="index"
        class="hover:bg-neutral-800/50 text-white flex items-center p-3"
      >
        <Checkbox v-model="appStore.todos[index].completed" />
        <p
          class="pl-2"
          :class="{
            'line-through text-neutral-600': todo.completed,
          }"
        >
          {{ todo.title }}
        </p>
        <button
          @click="appStore.removeTodo(index)"
          class="hover:bg-neutral-800 hover:text-red-500 ml-auto p-1.5 rounded-md cursor-pointer"
        >
          <Trash class="w-5 h-5" />
        </button>
      </li>
    </ul>
  </div>
</template>
