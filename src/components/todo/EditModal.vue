<script lang="ts" setup>
const appStore = useAppStore();

const { textarea, input } = useTextareaAutosize();
const target = useTemplateRef<HTMLElement>("target");
const { y, arrivedState } = useScroll(target, {
  offset: { top: 10 },
});

const isScrolled = ref(false);

const todoCopy = ref(
  JSON.parse(JSON.stringify(toRaw(appStore.todos[appStore.todoIndex])))
);

const updateTodo = () => {
  appStore.editTodo(appStore.todoIndex, {
    ...todoCopy.value,
    subtasks: appStore.todos[appStore.todoIndex].subtasks,
    description: input.value,
  });

  closeModal();
};

onClickOutside(target, () => {
  closeModal();
});

const closeModal = () => {
  appStore.todoIndex = -1;
  appStore.mode.isEditMode = false;
};

onMounted(() => {
  input.value = appStore.todos[appStore.todoIndex].description;
});
</script>

<template>
  <div
    v-if="todoCopy"
    class="fixed w-full inset-y-0 bg-bkg-500/40 backdrop-blur-sm z-10"
  >
    <div
      ref="target"
      class="absolute right-0 inset-y-0 w-full sm:w-1/2 xl:w-1/3 bg-primary overflow-y-auto"
    >
      <div
        class="sticky top-0 flex justify-between px-1 py-3 transition-all"
        :class="{
          'bg-bkg-100/20 backdrop-blur-sm shadow-lg': !arrivedState.top,
          'bg-primary': arrivedState.top,
        }"
      >
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="h-8 flex items-center gap-x-1 px-2 text-txt-100 hover:text-priority-high cursor-pointer rounded-md"
        >
          <Close class="w-6 h-6" />
          Close
        </button>

        <div class="flex items-center gap-x-4">
          <!-- Completed Checkbox -->
          <Checkbox
            id="edit-todo-is-complete"
            v-model:model-value="todoCopy.completed"
            :priority="todoCopy.priority"
            label="Done"
          />

          <!-- Save Button -->
          <button
            @click="updateTodo"
            class="h-8 flex items-center gap-x-1 px-2 text-txt-100 hover:text-txt-500 cursor-pointer rounded-md"
          >
            <Save class="w-6 h-6" />
            <span class="font-medium">Save</span>
          </button>
        </div>
      </div>

      <div class="p-3">
        <!-- Title & Priority -->
        <div class="flex flex-col sm:flex-row gap-x-4 mb-2 sm:mb-0">
          <div class="flex-grow">
            <!-- Input for Editing Title -->
            <label
              for="edit-todo-title"
              class="text-txt-100 font-medium tracking-wider"
              >Title</label
            >
            <input
              name="edit-todo-title"
              type="text"
              v-model="todoCopy.title"
              placeholder="Enter todo title..."
              class="w-full bg-primary border border-secondary mb-2 mt-1 p-2 pb-2.5 placeholder:text-txt-100 text-txt-500 outline-none rounded-md"
            />
          </div>

          <!-- Priority Toggle -->
          <div>
            <p class="text-txt-100">Priority</p>
            <div
              class="h-11 bg-secondary flex divide-x-2 divide-primary mt-1 rounded-md overflow-hidden"
            >
              <button
                class="w-1/4 flex items-center justify-center gap-x-1 px-3 cursor-pointer"
                :class="[
                  todoCopy.priority === 'high'
                    ? 'bg-priority-high text-bkg-100'
                    : 'hover:bg-bkg-100 text-priority-high',
                ]"
                @click="
                  () => {
                    todoCopy.priority = 'high';
                  }
                "
              >
                <Flag class="w-6 h-6" />
              </button>
              <button
                class="w-1/4 flex items-center justify-center gap-x-1 px-3 cursor-pointer"
                :class="[
                  todoCopy.priority === 'medium'
                    ? 'bg-priority-medium text-bkg-100'
                    : 'hover:bg-bkg-100 text-priority-medium',
                ]"
                @click="
                  () => {
                    todoCopy.priority = 'medium';
                  }
                "
              >
                <Flag class="w-6 h-6" />
              </button>
              <button
                class="w-1/4 flex items-center justify-center gap-x-1 px-3 cursor-pointer"
                :class="[
                  todoCopy.priority === 'low'
                    ? 'bg-priority-low text-bkg-100'
                    : 'hover:bg-bkg-100 text-priority-low',
                ]"
                @click="
                  () => {
                    todoCopy.priority = 'low';
                  }
                "
              >
                <Flag class="w-6 h-6" />
              </button>
              <button
                class="w-1/4 flex items-center justify-center gap-x-1 px-3 cursor-pointer"
                :class="[
                  todoCopy.priority === ''
                    ? 'bg-txt-500 text-bkg-100'
                    : 'hover:bg-bkg-100 text-txt-500',
                ]"
                @click="
                  () => {
                    todoCopy.priority = '';
                  }
                "
              >
                <FlagCross class="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <!-- Description -->
        <label
          for="edit-todo-description"
          class="text-txt-100 font-medium tracking-wider"
          >Description</label
        >
        <textarea
          ref="textarea"
          name="edit-todo-description"
          v-model="input"
          class="w-full bg-primary border border-secondary mt-1 p-2 pb-2.5 placeholder:text-txt-100 text-txt-500 outline-none resize-none overflow-y-hidden rounded-md"
          placeholder="Enter task description"
        />

        <!-- Sub tasks -->
        <p class="mb-0.5 text-txt-100 font-medium tracking-wider">Sub-tasks</p>
        <TodoInput :is-sub-task="true" class="mb-3" />
        <TodoList :todos="appStore.todos[appStore.todoIndex].subtasks" />
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
