<script setup lang="ts">
defineProps<{
  modelValue: boolean;
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
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="opacity-0 absolute inset-0 cursor-pointer z-10"
    />
    <div
      class="w-6 h-6 flex items-center justify-center border border-neutral-700 rounded-md"
    >
      <Check v-if="modelValue" class="w-4 h-4 text-white" />
    </div>
  </div>
</template>
