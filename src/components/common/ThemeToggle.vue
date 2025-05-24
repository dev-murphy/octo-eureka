<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <button
    role="switch"
    :aria-checked="modelValue"
    class="absolute top-4 right-4 w-[46px] p-0.5 bg-secondary border border-primary hover:border-accent inline-flex items-center rounded-full transition-colors duration-300 ease-in-out cursor-pointer"
    @click="toggle"
  >
    <span
      class="h-5 w-5 inline-flex items-center justify-center rounded-full bg-bkg-500 text-txt-500 transition-all duration-300 ease-in-out"
      :class="[modelValue ? 'translate-x-full' : 'translate-x-0']"
    >
      <Sun v-if="!modelValue" class="w-4 h-4" />
      <Moon v-else class="w-4 h-4" />
    </span>
  </button>
</template>
