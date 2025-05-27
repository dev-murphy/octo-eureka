<script lang="ts" setup>
const appStore = useAppStore();

const mode = useColorMode();
const isDarkMode = ref(mode.value === "dark");
const id = ref<number | undefined>();

watch(isDarkMode, () => {
  id.value = setTimeout(() => {
    if (id.value !== undefined) {
      clearTimeout(id.value);
    }

    mode.value = isDarkMode.value ? "dark" : "light";
  }, 300);
});
</script>

<template>
  <div
    class="w-full min-h-dvh bg-bkg-500 flex flex-col items-center justify-center font-[Inter_Tight] px-4"
  >
    <ThemeToggle v-model="isDarkMode" />

    <h1
      class="flex gap-x-2 text-center text-3xl md:text-5xl text-accent font-bold"
    >
      <img
        v-if="mode === 'light'"
        src="@/assets/images/logo.webp"
        alt="logo"
        class="w-10 h-10"
      />

      <img
        v-if="mode === 'dark'"
        src="@/assets/images/logo-dark.webp"
        alt="logo"
        class="w-10 h-10"
      />
      {{ appStore.name }}
    </h1>

    <div class="w-full max-w-[650px] flex flex-col gap-4 mt-4 mx-auto">
      <TodoInput />
      <TodoList :todos="appStore.filteredTodos" />
    </div>

    <EditModal v-if="appStore.mode.isEditMode" />
  </div>
</template>
