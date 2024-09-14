<script setup lang="ts">
import Count from './components/Count.vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div
    id="app"
    class="vs-w-full vs-h-full vs-flex vs-flex-col vs-items-center vs-justify-center vs-gap-4"
  >
    <img alt="Vue logo" class="vs-mb-2" src="./assets/logo.svg" width="125" height="125" />

    <HelloWorld msg="You did it!" />

    <Suspense>
      <!-- component with nested async dependencies -->
      <Count />

      <!-- loading state via #fallback slot -->
      <template #fallback> Loading.................... </template>
    </Suspense>
  </div>
</template>
