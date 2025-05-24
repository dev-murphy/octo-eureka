<script setup lang="ts">
import type { PRIORITY } from "@/types";

const { label = "" } = defineProps<{
  id: string;
  modelValue: boolean;
  priority: PRIORITY;
  label?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <div class="relative" @click.stop>
    <input
      :id="id"
      :name="id"
      type="checkbox"
      :checked="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
      class="opacity-0 absolute inset-0 cursor-pointer z-10"
    />
    <div
      class="flex items-center gap-x-1.5"
      :class="{
        'border-priority-high text-priority-high': priority === 'high',
        'border-priority-medium text-priority-medium': priority === 'medium',
        'border-priority-low text-priority-low': priority === 'low',
        'border-txt-500 text-txt-500': priority === '',
      }"
    >
      <div class="w-5 h-5 flex items-center justify-center border-2 rounded-md">
        <Check v-if="modelValue" class="w-4 h-4" />
      </div>
      <label v-if="label" :for="id">{{ label }}</label>
    </div>
  </div>
</template>
