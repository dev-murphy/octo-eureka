<script setup lang="ts">
import type { PRIORITY } from "@/types";

defineProps<{
  modelValue: boolean;
  priority: PRIORITY;
}>();

defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <div class="relative">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
      class="opacity-0 absolute inset-0 cursor-pointer z-10"
    />
    <div
      class="w-5 h-5 flex items-center justify-center border-2 rounded-md"
      :class="{
        'border-red-500 text-red-500': priority === 'high',
        'border-yellow-500 text-yellow-500': priority === 'medium',
        'border-blue-500 text-blue-500': priority === 'low',
        'border-white text-white': priority === '',
      }"
    >
      <Check v-if="modelValue" class="w-4 h-4" />
    </div>
  </div>
</template>
