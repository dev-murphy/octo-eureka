<script lang="ts" setup>
const appStore = useAppStore();
</script>

<template>
  <div
    class="w-full md:w-fit flex divide-x-2 divide-neutral-950 text-white rounded-md"
  >
    <Modal id="filter" :options="appStore.menus.filter.options">
      <button
        class="w-full h-[42px] flex items-center gap-x-2 p-2 rounded-l-md cursor-pointer"
        :class="{
          'bg-neutral-700': appStore.menus.currentMenu === 'filter',
          'bg-neutral-900 hover:bg-neutral-700':
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
          'bg-neutral-700': appStore.menus.currentMenu === 'sort',
          'bg-neutral-900 hover:bg-neutral-700':
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
          'bg-neutral-700': appStore.menus.currentMenu === 'priority',
          'bg-neutral-900 hover:bg-neutral-700':
            appStore.menus.currentMenu !== 'priority',
          'text-red-500': appStore.menus.priority.current === 'high',
          'text-yellow-500': appStore.menus.priority.current === 'medium',
          'text-blue-500': appStore.menus.priority.current === 'low',
        }"
        @click="() => appStore.toggleMenu('priority')"
      >
        <FlagFilled class="w-5 h-5" />
        <span class="block md:hidden">Priority</span>
      </button>
    </Modal>
    <!-- <button class="hover:bg-neutral-700 p-2">
      <List class="w-6 h-6" />
    </button> -->
  </div>
</template>
