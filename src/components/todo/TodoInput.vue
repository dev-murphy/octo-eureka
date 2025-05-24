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
      (todo) => todo.title.toLowerCase() === title.value.toLowerCase().trim()
    );
  } else {
    found = appStore.todos[appStore.todoIndex].subtasks.find(
      (todo) => todo.title.toLowerCase() === title.value.toLowerCase().trim()
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
          class="bg-primary flex-grow border border-secondary rounded-md p-2 text-txt-500 placeholder:text-txt-100 outline-none"
          @keydown.enter="addItem"
        />
        <button
          class="bg-primary disabled:bg-bkg-100 p-2 text-txt-500 disabled:text-txt-100 rounded-md"
          :class="[
            todoExists || title.trim() === ''
              ? 'cursor-not-allowed'
              : 'hover:bg-secondary cursor-pointer',
          ]"
          @click="addItem"
          :disabled="todoExists || title.trim() === ''"
        >
          <Plus class="w-6 h-6" />
        </button>
      </div>

      <FilterOptions v-if="!isSubTask" />
    </div>
    <p v-if="todoExists" class="pt-1 text-sm text-priority-high tracking-wide">
      A todo with this title already exist. Please type another title.
    </p>
  </div>
</template>
