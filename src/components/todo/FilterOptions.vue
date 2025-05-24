<script lang="ts" setup>
const appStore = useAppStore();
</script>

<template>
  <div
    class="w-full md:w-fit flex divide-x-2 divide-bkg-500 text-txt-500 rounded-md"
  >
    <Modal id="filter" :options="appStore.menus.filter.options">
      <button
        class="w-full h-[42px] flex items-center gap-x-2 p-2 rounded-l-md cursor-pointer"
        :class="{
          'bg-secondary': appStore.menus.currentMenu === 'filter',
          'bg-primary hover:bg-secondary':
            appStore.menus.currentMenu !== 'filter',
        }"
        @click="() => appStore.toggleMenu('filter')"
      >
        <Filter class="w-5 h-5" />
        <span class="block md:hidden">Filter</span>
      </button>
    </Modal>
    <Modal id="sort" :options="appStore.menus.sort.options">
      <button
        class="w-full h-[42px] flex items-center gap-x-2 p-2 cursor-pointer"
        :class="{
          'bg-secondary': appStore.menus.currentMenu === 'sort',
          'bg-primary hover:bg-secondary':
            appStore.menus.currentMenu !== 'sort',
        }"
        @click="() => appStore.toggleMenu('sort')"
      >
        <Sort class="w-5 h-5" />
        <span class="block md:hidden">Sort</span>
      </button>
    </Modal>
    <Modal id="priority" :options="[]">
      <button
        class="w-full h-[42px] flex items-center gap-x-2 p-2 rounded-r-md cursor-pointer"
        :class="{
          'bg-secondary': appStore.menus.currentMenu === 'priority',
          'bg-primary hover:bg-secondary':
            appStore.menus.currentMenu !== 'priority',
          'text-priority-high': appStore.menus.priority.current === 'high',
          'text-priority-medium': appStore.menus.priority.current === 'medium',
          'text-priority-low': appStore.menus.priority.current === 'low',
        }"
        @click="() => appStore.toggleMenu('priority')"
      >
        <FlagFilled class="w-5 h-5" />
        <span class="block md:hidden">Priority</span>
      </button>
    </Modal>
  </div>
</template>
