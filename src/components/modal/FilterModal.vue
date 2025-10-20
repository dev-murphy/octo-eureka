<script setup lang="ts">
const appStore = useAppStore();

const filterContainer = useTemplateRef<HTMLElement>("filter-container");
onClickOutside(filterContainer, () => {
  appStore.menus.currentMenu = "";
});
</script>

<template>
  <div ref="filter-container" class="relative w-full">
    <slot name="filter-btn" />

    <div
      v-if="appStore.menus.currentMenu === 'filter'"
      class="absolute top-full right-0 translate-y-1 flex flex-col bg-secondary divide-secondary rounded-lg rounded-tr-none shadow-lg overflow-hidden"
    >
      <button
        v-for="(option, index) in appStore.menus.filter.options"
        :key="`filter-option-${index}`"
        @click="
          () => {
            appStore.menus.filter.selected = option.value;
          }
        "
        class="flex items-center gap-x-1 px-2 py-1 cursor-pointer"
        :class="{
          'bg-primary text-accent pointer-events-none':
            option.value === appStore.menus.filter.selected,
          'text-txt-100 hover:text-txt-500 hover:bg-primary/50':
            option.value !== appStore.menus.filter.selected,
        }"
      >
        <Check
          class="w-4 h-4 transition-opacity"
          :class="[
            option.value === appStore.menus.filter.selected
              ? 'opacity-100'
              : 'opacity-0',
          ]"
        />
        <p>{{ option.label }}</p>
      </button>
    </div>
  </div>
</template>
