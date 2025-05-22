<script setup lang="ts">
import type { DropdownOption } from "@/types";

const { options = [] } = defineProps<{
  id: string;
  options?: DropdownOption[];
}>();
const appStore = useAppStore();
</script>

<template>
  <div class="relative w-full">
    <!-- Trigger -->
    <slot />

    <!-- Dropdown menu -->
    <div
      v-if="appStore.menus.currentMenu === id"
      class="absolute top-full right-0 translate-y-1 flex flex-col bg-neutral-700 divide-y divide-neutral-600 rounded-lg rounded-tr-none shadow-2xl"
    >
      <div v-if="id === 'priority'" class="flex gap-x-0.5 p-1">
        <button
          :class="[
            'p-1 rounded',
            appStore.menus.priority.current === 'high'
              ? 'bg-red-500 text-black'
              : 'hover:bg-neutral-900 text-red-500',
          ]"
          @click="appStore.setPriority('high')"
        >
          <Flag class="w-6 h-6" />
        </button>
        <button
          :class="[
            'p-1 rounded',
            appStore.menus.priority.current === 'medium'
              ? 'bg-yellow-500 text-black'
              : 'hover:bg-neutral-900 text-yellow-500',
          ]"
          @click="appStore.setPriority('medium')"
        >
          <Flag class="w-6 h-6" />
        </button>
        <button
          :class="[
            'p-1 rounded',
            appStore.menus.priority.current === 'low'
              ? 'bg-blue-500 text-black'
              : 'hover:bg-neutral-900 text-blue-500',
          ]"
          @click="appStore.setPriority('low')"
        >
          <Flag class="w-6 h-6" />
        </button>
        <button
          class="hover:bg-neutral-900 p-1 rounded"
          @click="appStore.setPriority('')"
        >
          <FlagCross class="w-6 h-6 text-neutral-400" />
        </button>
      </div>

      <button
        v-for="(option, index) in options"
        :key="`${id}-${index}`"
        class="w-max py-1 px-3 text-sm text-white"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
