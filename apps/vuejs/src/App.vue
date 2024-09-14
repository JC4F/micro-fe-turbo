<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { Button } from '@repo/vue-ui'

const count = ref(0)

// console.log(hehe.default.useGeneralStore)

onMounted(async () => {
  // @ts-ignore
  const hehe = await import('react-shell/Store')
  console.log(hehe.default.useGeneralStore.getState())
  hehe.default.useGeneralStore.subscribe(console.log)
})

function incrementCount() {
  count.value++
}
</script>

<template>
  <div id="app" class="w-full h-full flex flex-col items-center justify-center gap-4">
    <img alt="Vue logo" class="mb-2" src="./assets/logo.svg" width="125" height="125" />

    <HelloWorld msg="You did it!" />

    <Button @click="incrementCount">count is {{ count }}</Button>
  </div>
</template>
