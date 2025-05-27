<script lang="ts" setup>
const props = defineProps<{
  value: string;
  modelValue: string;
  name: string;
  label?: string;
}>();
defineEmits<{ (e: "update:modelValue", value: string): void }>();

const input = toRef(props.modelValue);
</script>

<template>
  <div class="flex items-center gap-x-1 select-none">
    <div class="relative w-4 h-4">
      <div
        class="absolute top-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center border border-txt-500 rounded-full"
      >
        <div
          v-if="value === modelValue"
          class="w-2 h-2 bg-txt-500 rounded-full"
        />
      </div>
      <input
        type="radio"
        :id="value"
        :value="value"
        :name="name"
        v-model="input"
        @change="$emit('update:modelValue', input)"
        class="relative -translate-y-0.5 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
    <label v-if="label" :for="value" class="text-txt-500 cursor-pointer">
      {{ label }}
    </label>
  </div>
</template>
