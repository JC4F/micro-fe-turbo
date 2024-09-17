<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@vue-ui/lib/utils";

interface SkeletonProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SkeletonProps>();
</script>

<template>
  <div
    :class="cn('vs-animate-pulse vs-rounded-md vs-bg-primary/10', props.class)"
  />
</template>
