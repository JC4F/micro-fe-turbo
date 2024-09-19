<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { Button } from '@repo/vue-ui'
import { useGeneralStore } from '@repo/util'

const count = ref(useGeneralStore.getState().count)
const unscribe = useGeneralStore.subscribe((state) => {
  count.value = state.count
})

function incrementCount() {
  count.value++
  useGeneralStore.setState({ count: count.value })
}

onUnmounted(() => {
  unscribe()
})
</script>

<template>
  <Button @click="incrementCount">count is {{ count }}</Button>
</template>
