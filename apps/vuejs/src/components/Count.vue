<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { Button } from '@repo/vue-ui'

// @ts-ignore
const hostModule = await import('react-shell/Store')
const store = hostModule.default.useGeneralStore

console.log(store.getState())
const count = ref(store.getState().count)
const unscribe = store.subscribe((state: any) => {
  count.value = state.count
})

function incrementCount() {
  count.value++
  console.log(count.value)
  store.setState({ count: count.value })
}

onUnmounted(() => {
  unscribe()
})
</script>

<template>
  <Button @click="incrementCount">count is {{ count }}</Button>
</template>
