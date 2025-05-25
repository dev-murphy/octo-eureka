<script setup lang="ts">
import { getRelativeDate } from "@/utils";

const { isSubTask = false } = defineProps<{
  isSubTask?: boolean;
}>();

const appStore = useAppStore();
const title = ref("");
const showCalendar = ref(false);

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

const d = ref<Date | null>(null);

const addItem = () => {
  if (isSubTask) appStore.addSubtask(title.value);
  else appStore.addTodo(title.value, d.value);

  title.value = "";
  d.value = null;
};
</script>

<template>
  <div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex-grow flex gap-x-2">
        <div class="relative w-full">
          <input
            type="text"
            placeholder="Enter todo here"
            v-model="title"
            class="w-full bg-primary border border-secondary rounded-md p-2 text-txt-500 placeholder:text-txt-100 outline-none"
            @keydown.enter="addItem"
          />

          <div
            v-if="!isSubTask"
            class="absolute top-1/2 right-4 -translate-y-1/2 z-10"
          >
            <button
              @click="
                () => {
                  showCalendar = !showCalendar;
                }
              "
              class="flex items-center justify-center gap-x-1 text-sm text-txt-100"
            >
              <Calendar class="w-5 h-5" />
              <span v-if="d">
                {{ getRelativeDate(d) }}
              </span>
            </button>

            <XCalander
              v-if="showCalendar"
              class="absolute bg-bkg-500 top-full translate-y-1 right-0 z-20"
              :todo-date="d"
              @set-date="
                (date) => {
                  d = date;
                }
              "
            />
          </div>
        </div>

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
