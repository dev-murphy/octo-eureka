<script lang="ts" setup>
const appStore = useAppStore();
</script>

<template>
  <div
    class="w-full min-h-dvh bg-linear-to-br from-black to-neutral-800 flex flex-col items-center justify-center font-[Inter_Tight] px-4"
  >
    <h1 class="text-center text-3xl md:text-5xl text-neutral-400 font-bold">
      Welcome to {{ appStore.name }}
    </h1>
    <div class="w-full max-w-[650px] flex flex-col gap-4 mt-4 mx-auto">
      <Input />
      <List />
    </div>
  </div>
</template>
