<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@vue-ui/lib/utils";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <input
    v-model="modelValue"
    :class="
      cn(
        'vs-flex vs-h-9 vs-w-full vs-rounded-md vs-border vs-border-input vs-bg-transparent vs-px-3 vs-py-1 vs-text-sm vs-shadow-sm vs-transition-colors file:vs-border-0 file:vs-bg-transparent file:vs-text-sm file:vs-font-medium placeholder:vs-text-muted-foreground focus-visible:vs-outline-none focus-visible:vs-ring-1 focus-visible:vs-ring-ring disabled:vs-cursor-not-allowed disabled:vs-opacity-50',
        props.class
      )
    "
  />
</template>
