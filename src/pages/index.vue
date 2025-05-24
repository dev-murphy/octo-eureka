<script lang="ts" setup>
const appStore = useAppStore();

const mode = useColorMode();
const isLightMode = ref(false);
const id = ref<number | undefined>();

watch(isLightMode, () => {
  id.value = setTimeout(() => {
    if (id.value !== undefined) {
      clearTimeout(id.value);
    }

    mode.value = isLightMode.value ? "dark" : "light";
  }, 300);
});
</script>

<template>
  <div
    class="w-full min-h-dvh bg-bkg-500 flex flex-col items-center justify-center font-[Inter_Tight] px-4"
  >
    <h1 class="text-center text-3xl md:text-5xl text-txt-100 font-bold">
      Welcome to {{ appStore.name }}
    </h1>

    <ThemeToggle v-model="isLightMode"  />

    <div class="w-full max-w-[650px] flex flex-col gap-4 mt-4 mx-auto">
      <TodoInput />
      <TodoList :todos="appStore.todos" />
    </div>

    <EditModal v-if="appStore.mode.isEditMode" />
  </div>
</template>
