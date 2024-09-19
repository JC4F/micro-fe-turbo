<script setup lang="ts">
import { ref } from 'vue'
import { Button, cn } from '@repo/vue-ui'
import Count from './components/main/Count.vue'
import TodoApp from './components/main/TodoApp.vue'

const showApp = ref(false)
</script>

<template>
  <div
    id="app"
    class="vs-w-full vs-h-full vs-flex vs-flex-col vs-items-center vs-justify-center vs-gap-2"
  >
    <img alt="Vue logo" class="vs-mb-2" src="./assets/logo.svg" width="125" height="125" />
    <h1>Vite + Vue 3</h1>
    <div class="vs-flex vs-items-center vs-justify-center vs-gap-2">
      <Count />
      <Button variant="destructive" @click="showApp = !showApp">💩 apps 💩</Button>
    </div>

    <div
      :class="
        cn(
          'vs-flex vs-flex-col vs-items-center vs-gap-4 vs-transition-all vs-duration-1000 vs-max-h-0',
          showApp && '!vs-max-h-[100vh]'
        )
      "
    >
      <template v-if="showApp">
        <TodoApp />
      </template>
    </div>
  </div>
</template>
