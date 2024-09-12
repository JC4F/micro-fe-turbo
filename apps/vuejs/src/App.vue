<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app" class="w-full h-full flex flex-col items-center justify-center gap-4">
    <img alt="Vue logo" class="mb-2" src="./assets/logo.svg" width="125" height="125" />

    <HelloWorld msg="You did it!" />

    <Button></Button>
  </div>
</template>
