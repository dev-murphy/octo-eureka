<script setup lang="ts">
import { useAppStore } from "../stores/app";

const appStore = useAppStore();
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-neutral-900 text-4xl text-white"
  >
    <h1 class="font-inter">Welcome to {{ appStore.appName }} App</h1>
  </div>
</template>
