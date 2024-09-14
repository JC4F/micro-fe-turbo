<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { Button } from '@repo/vue-ui'

const hostModule = await import('react-shell/Store')
const store = hostModule.default.useGeneralStore

const count = ref(store.getState().count)
const unscribe = store.subscribe((state) => {
  count.value = state.count
})

function incrementCount() {
  count.value++
  store.setState({ count: count.value })
}

onUnmounted(() => {
  unscribe()
})
</script>

<template>
  <Button @click="incrementCount">count is {{ count }}</Button>
</template>
