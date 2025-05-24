<script setup lang="ts">
import type { DropdownOption } from "@/types";

const { options = [] } = defineProps<{
  id: string;
  options?: DropdownOption[];
}>();

const target = useTemplateRef<HTMLElement>("target");
const appStore = useAppStore();

onClickOutside(target, () => (appStore.menus.currentMenu = ""));
</script>

<template>
  <div ref="target" class="relative w-full">
    <!-- Trigger -->
    <slot />

    <!-- Dropdown menu -->
    <div
      v-if="appStore.menus.currentMenu === id"
      class="absolute top-full right-0 translate-y-1 flex flex-col bg-primary divide-y divide-secondary rounded-lg rounded-tr-none shadow-2xl z-10"
    >
      <div v-if="id === 'priority'" class="flex gap-x-0.5 p-1">
        <button
          :class="[
            'p-1 rounded',
            appStore.menus.priority.current === 'high'
              ? 'bg-priority-high text-bkg-100'
              : 'hover:bg-bkg-100 text-priority-high',
          ]"
          @click="appStore.setPriority('high')"
        >
          <Flag class="w-6 h-6" />
        </button>
        <button
          :class="[
            'p-1 rounded',
            appStore.menus.priority.current === 'medium'
              ? 'bg-priority-medium text-bkg-100'
              : 'hover:bg-bkg-100 text-priority-medium',
          ]"
          @click="appStore.setPriority('medium')"
        >
          <Flag class="w-6 h-6" />
        </button>
        <button
          :class="[
            'p-1 rounded',
            appStore.menus.priority.current === 'low'
              ? 'bg-priority-low text-bkg-100'
              : 'hover:bg-bkg-100 text-priority-low',
          ]"
          @click="appStore.setPriority('low')"
        >
          <Flag class="w-6 h-6" />
        </button>
        <button
          class="hover:bg-bkg-100 p-1 rounded"
          @click="appStore.setPriority('')"
        >
          <FlagCross class="w-6 h-6 text-txt-100" />
        </button>
      </div>

      <button
        v-for="(option, index) in options"
        :key="`${id}-${index}`"
        class="w-max py-1 px-3 text-sm text-txt-500"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
