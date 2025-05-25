<script setup lang="ts">
import type { BaseTodo, Todo } from "@/types";
import { getRelativeDate } from "@/utils";

defineProps<{ todos: Todo[] | BaseTodo[] }>();

const appStore = useAppStore();

const container = useTemplateRef<HTMLElement>("container-element");
const list = useTemplateRef<HTMLElement>("list-element");

const scrollTop = ref(0);
const canScroll = ref(false);
const atTheBottom = ref(false);

const editTodo = (index: number) => {
  appStore.todoIndex = index;
  appStore.mode.isEditMode = true;
};

const { height } = useElementSize(list);

const handleScroll = () => {
  if (!container.value) return;
  scrollTop.value = container.value.scrollTop;
};

watch(scrollTop, () => {
  if (!container.value) return;

  atTheBottom.value =
    container.value.scrollHeight + 2 - scrollTop.value <= 500 + 5;
});

watch(height, () => {
  if (!container.value) return;

  canScroll.value = container.value.scrollHeight > container.value.clientHeight;
  atTheBottom.value =
    container.value.scrollHeight + 2 - scrollTop.value <= 500 + 5;
});
</script>

<template>
  <div
    ref="container-element"
    class="todo-container h-[500px] bg-bkg-100 border-2 border-bkg-100 rounded-lg overflow-y-auto"
    @scroll="handleScroll"
  >
    <p
      v-if="todos.length === 0"
      class="w-4/5 pt-3 text-lg text-txt-100 text-center mx-auto"
    >
      There is no todo items currently. You can add todo by typing the title and
      click the add button.
    </p>

    <!-- Todo List -->
    <ul v-else ref="list-element" class="divide-y divide-primary">
      <li
        v-for="(todo, index) in todos"
        :key="`todo-item-${index}`"
        class="w-full hover:bg-primary text-txt-500 flex items-center p-3 overflow-hidden"
        @click="editTodo(index)"
      >
        <Checkbox
          :id="`todo-${index}-is-complete`"
          v-model="todo.completed"
          :priority="'priority' in todo ? todo.priority : ''"
        />

        <!-- Title, description and subtask -->
        <div class="pl-2 pr-5">
          <p
            class="truncate overflow-hidden"
            :class="{
              'line-through text-secondary': todo.completed,
            }"
          >
            {{ todo.title }}
          </p>

          <div class="flex flex-col sm:flex-row text-txt-100">
            <!-- Subtasks  -->
            <div
              v-if="'subtasks' in todo && todo.subtasks.length > 0"
              class="flex items-center pr-1"
              :class="{
                'pr-1': 'description' in todo && todo.description !== '',
              }"
            >
              <Subtask class="w-5 h-4" />
              <span class="text-sm"
                >{{ todo.subtasks.length }}
                {{ todo.subtasks.length === 1 ? "task" : "tasks" }}</span
              >
            </div>

            <!-- Subtasks  -->
            <div
              v-if="'dueDate' in todo && todo.dueDate !== null"
              class="flex items-center pr-1"
              :class="{
                'pr-1': 'description' in todo && todo.description !== '',
              }"
            >
              <Calendar class="w-5 h-4" />
              <span class="text-sm">{{ getRelativeDate(todo.dueDate) }} </span>
            </div>

            <!-- Description -->
            <div
              v-if="'description' in todo && todo.description"
              class="flex items-center gap-x-1"
              :class="{
                'pl-1': 'subtasks' in todo && todo.subtasks.length !== 0,
              }"
            >
              <Notes class="w-5 h-5" />
              <span
                class="w-full max-w-[30ch] text-sm truncate overflow-hidden"
                >{{ todo.description }}</span
              >
            </div>
          </div>
        </div>

        <!-- Button Group: Delete -->
        <div class="flex gap-x-0.5 ml-auto">
          <!-- Delete Button -->
          <button
            @click.stop="
              'description' in todo
                ? appStore.removeTodo(index)
                : appStore.removeSubtask(index)
            "
            class="hover:bg-bkg-100 hover:text-priority-high p-1.5 rounded-md cursor-pointer"
          >
            <Trash class="w-5 h-5" />
          </button>
        </div>
      </li>
    </ul>

    <div
      v-if="height > 455"
      :class="[
        canScroll
          ? 'sticky bottom-0 w-full h-8 bg-linear-to-t from-bkg-500 to-transparent flex items-end justify-center pb-2 text-txt-500'
          : '',
      ]"
    >
      <p
        v-if="scrollTop < 5"
        class="flex gap-x-2 items-center animate-bounce pointer-events-none"
      >
        <Chevron class="w-6 h-6" />
        Scroll to see more todos
      </p>
      <button
        v-if="atTheBottom"
        @click="container?.scrollTo({ top: 0, behavior: 'smooth' })"
        class="hover:underline cursor-pointer"
      >
        Scroll to top
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  scrollbar-width: 0;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}

.todo-container::-webkit-scrollbar {
  display: none;
}
</style>
