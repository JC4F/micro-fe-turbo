<script setup lang="ts">
import { ref } from 'vue'
import { Button, Skeleton, cn } from '@repo/vue-ui'
import Count from './components/Count.vue'
import HelloWorld from './components/HelloWorld.vue'
import TodoApp from './components/TodoApp.vue'

const showApp = ref(false)
</script>

<template>
  <div
    id="app"
    class="vs-w-full vs-h-full vs-flex vs-flex-col vs-items-center vs-justify-center vs-gap-4"
  >
    <img alt="Vue logo" class="vs-mb-2" src="./assets/logo.svg" width="125" height="125" />

    <div
      :class="
        cn(
          'vs-flex vs-flex-col vs-items-center vs-gap-4 vs-transition-all vs-duration-1000 vs-max-h-0',
          showApp && '!vs-max-h-[100vh]'
        )
      "
    >
      <HelloWorld msg="You did it!" />
      <div class="vs-flex vs-items-center vs-justify-center vs-gap-2">
        <Suspense>
          <!-- component with nested async dependencies -->
          <Count />

          <!-- loading state via #fallback slot -->
          <template #fallback> <Skeleton class="vs-w-[100px] vs-h-9 vs-rounded-md" /> </template>
        </Suspense>
        <Button variant="destructive" @click="showApp = !showApp">Todo apps ^^</Button>
      </div>
      <template v-if="showApp">
        <TodoApp />
      </template>
    </div>
  </div>
</template>
