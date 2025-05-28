<script setup lang="ts">
import { getRelativeDate } from "@/utils";

const { isSubTask = false } = defineProps<{
  isSubTask?: boolean;
}>();

const appStore = useAppStore();
const title = ref("");
const showCalendar = ref(false);

const calenderContainer = useTemplateRef<HTMLElement>("calendar-container");
const { width } = useElementSize(calenderContainer);

onClickOutside(calenderContainer, () => {
  showCalendar.value = false;
});

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

const todoDate = ref<Date | null>(null);

const addItem = () => {
  if (isSubTask) appStore.addSubtask(title.value);
  else appStore.addTodo(title.value, todoDate.value);

  title.value = "";
  todoDate.value = null;
};

const resetDate = () => {
  todoDate.value = null;
  showCalendar.value = false;
};

const dynamicPadding = computed(() => {
  const paddingRight = width.value + 12;
  return {
    paddingRight: `${paddingRight}px`,
  };
});
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
            :style="dynamicPadding"
            data-test="todo-title-input"
            @keydown.enter="!todoExists && title.trim() !== '' && addItem()"
          />

          <div
            ref="calendar-container"
            v-if="!isSubTask"
            class="absolute top-1/2 right-1.5 -translate-y-1/2 z-10"
          >
            <div
              class="flex items-center gap-x-1 hover:bg-bkg-100 p-1 text-txt-100 rounded-md"
            >
              <button
                @click="
                  () => {
                    showCalendar = !showCalendar;
                  }
                "
                class="flex items-center justify-center gap-x-1 text-sm cursor-pointer"
                data-test="calendar-dropdown"
              >
                <Calendar class="w-5 h-5" />
                <span v-if="todoDate">
                  {{ getRelativeDate(todoDate) }}
                </span>
              </button>
              <button
                v-if="todoDate !== null"
                class="hover:text-priority-high cursor-pointer"
                @click="resetDate"
                data-test="clear-todo-date"
              >
                <Close class="w-4 h-4" />
              </button>
            </div>

            <XCalander
              v-if="showCalendar"
              class="absolute top-full translate-y-1.5 right-0 z-20"
              :todo-date="todoDate"
              @set-date="
                (date) => {
                  todoDate = date;
                }
              "
            />
          </div>
        </div>

        <button
          class="bg-primary sm:disabled:bg-bkg-100 p-2 text-txt-500 sm:disabled:text-txt-100 rounded-md"
          :class="[
            todoExists || title.trim() === ''
              ? 'cursor-not-allowed'
              : 'hover:bg-secondary cursor-pointer',
          ]"
          :disabled="todoExists || title.trim() === ''"
          data-test="add-todo-btn"
          @click="addItem"
        >
          <Plus class="w-6 h-6" />
        </button>
      </div>

      <FilterOptions v-if="!isSubTask" />
    </div>
    <p
      v-if="todoExists"
      class="pt-1 text-sm text-priority-high tracking-wide"
      data-test="todo-input-error"
    >
      A todo with this title already exist. Please type another title.
    </p>
  </div>
</template>
