<script setup lang="ts">
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
    class="todo-container relative h-[500px] bg-black border border-neutral-600 rounded-lg overflow-y-auto"
    @scroll="handleScroll"
  >
    <p
      v-if="appStore.todos.length === 0"
      class="w-4/5 pt-3 text-lg text-neutral-400 text-center mx-auto"
    >
      There is no todo items currently. You can add todo by typing the title and
      click the add button.
    </p>

    <!-- Todo List -->
    <ul v-else ref="list-element" class="divide-y divide-neutral-700">
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

    <div
      :class="[
        canScroll
          ? 'sticky bottom-0 w-full h-8 bg-linear-to-t from-black to-transparent flex items-end justify-center pb-2 text-white'
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
