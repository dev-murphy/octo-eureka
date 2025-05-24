<script setup lang="ts">
const { isSubTask = false } = defineProps<{
  isSubTask?: boolean;
}>();
const appStore = useAppStore();

const title = ref("");

const todoExists = computed(() => {
  let found;
  if (!isSubTask) {
    found = appStore.todos.find(
      (todo) => todo.title.toLowerCase() === title.value.toLowerCase()
    );
  } else {
    found = appStore.todos[appStore.todoIndex].subtasks.find(
      (todo) => todo.title.toLowerCase() === title.value.toLowerCase()
    );
  }

  return found !== undefined;
});

const addItem = () => {
  if (isSubTask) appStore.addSubtask(title.value);
  else appStore.addTodo(title.value);

  title.value = "";
};
</script>

<template>
  <div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex-grow flex gap-x-2">
        <input
          type="text"
          placeholder="Enter todo here"
          v-model="title"
          class="bg-neutral-800/50 flex-grow border border-neutral-700 rounded-md p-2 text-white placeholder:text-neutral-500 outline-none"
          @keydown.enter="addItem"
        />
        <button
          class="p-2 rounded-md"
          :class="[
            todoExists || title === ''
              ? 'bg-neutral-900 text-neutral-500 cursor-not-allowed'
              : 'bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer',
          ]"
          @click="addItem"
          :disabled="todoExists || title === ''"
        >
          <Plus class="w-6 h-6" />
        </button>
      </div>

      <FilterOptions v-if="!isSubTask" />
    </div>
    <p v-if="todoExists" class="pt-1 text-sm text-red-400 tracking-wide">
      A todo with this title already exist. Please type another title.
    </p>
  </div>
</template>
