<script lang="ts" setup>
const appStore = useAppStore();

const { textarea, input } = useTextareaAutosize();
const target = useTemplateRef<HTMLElement>("target");

const todoCopy = ref(
  structuredClone(toRaw(appStore.todos[appStore.todoIndex]))
);

const updateTodo = () => {
  appStore.editTodo(appStore.todoIndex, {
    ...todoCopy.value,
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
    class="fixed w-full inset-y-0 bg-black/40 backdrop-blur-sm"
  >
    <div
      ref="target"
      class="absolute right-0 inset-y-0 w-full sm:w-1/2 xl:w-1/3 bg-neutral-900 p-3"
    >
      <div class="flex justify-between mb-5">
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="h-8 bg-neutral-700 hover:bg-red-700 flex items-center gap-x-1 px-2 text-neutral-200 cursor-pointer rounded-md"
        >
          <Close class="w-5 h-5" />
          Close
        </button>

        <div class="flex items-center gap-x-4">
          <!-- Completed Checkbox -->
          <Checkbox
            id="edit-todo-is-complete"
            v-model:model-value="todoCopy.completed"
            :priority="todoCopy.priority"
            label="Mark as Done"
          />

          <!-- Save Button -->
          <button
            @click="updateTodo"
            class="h-8 bg-neutral-700 hover:bg-neutral-600 flex items-center gap-x-1 px-2 text-neutral-200 cursor-pointer rounded-md"
          >
            <Save class="w-5 h-5" />
            <span class="font-medium">Save</span>
          </button>
        </div>
      </div>

      <div class="flex gap-x-4">
        <div class="flex-grow">
          <!-- Input for Editing Title -->
          <label
            for="edit-todo-title"
            class="mb-0.5 text-neutral-400 font-medium tracking-wider"
            >Title</label
          >
          <input
            name="edit-todo-title"
            type="text"
            v-model="todoCopy.title"
            placeholder="Enter todo title..."
            class="w-full bg-neutral-800 border border-neutral-700 mb-2 p-2 pb-2.5 placeholder:text-neutral-500 text-white outline-none rounded-md"
          />
        </div>

        <div>
          <p class="text-neutral-400">Priority</p>
          <div
            class="h-11 bg-neutral-700 flex divide-x-2 divide-neutral-900 rounded-md overflow-hidden"
          >
            <button
              class="flex items-center gap-x-1 px-3"
              :class="[
                todoCopy.priority === 'high'
                  ? 'bg-red-500 text-neutral-900'
                  : 'hover:bg-neutral-800 text-red-500',
              ]"
              @click="
                () => {
                  todoCopy.priority = 'high';
                }
              "
            >
              <Flag class="w-5 h-5" />
            </button>
            <button
              class="flex items-center gap-x-1 px-3"
              :class="[
                todoCopy.priority === 'medium'
                  ? 'bg-yellow-500 text-neutral-900'
                  : 'hover:bg-neutral-800 text-yellow-500',
              ]"
              @click="
                () => {
                  todoCopy.priority = 'medium';
                }
              "
            >
              <Flag class="w-5 h-5" />
            </button>
            <button
              class="flex items-center gap-x-1 px-3"
              :class="[
                todoCopy.priority === 'low'
                  ? 'bg-blue-500 text-neutral-900'
                  : 'hover:bg-neutral-800 text-blue-500',
              ]"
              @click="
                () => {
                  todoCopy.priority = 'low';
                }
              "
            >
              <Flag class="w-5 h-5" />
            </button>
            <button
              class="flex items-center gap-x-1 px-3"
              :class="[
                todoCopy.priority === ''
                  ? 'bg-white text-neutral-900'
                  : 'hover:bg-neutral-800 text-white',
              ]"
              @click="
                () => {
                  todoCopy.priority = '';
                }
              "
            >
              <FlagCross class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Description -->
      <label
        for="edit-todo-description"
        class="mb-0.5 text-neutral-400 font-medium tracking-wider"
        >Description</label
      >

      <textarea
        ref="textarea"
        name="edit-todo-description"
        v-model="input"
        class="w-full bg-neutral-800 border border-neutral-700 p-2 pb-2.5 placeholder:text-neutral-500 text-white outline-none resize-none rounded-md"
        placeholder="Enter task description"
      />
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
