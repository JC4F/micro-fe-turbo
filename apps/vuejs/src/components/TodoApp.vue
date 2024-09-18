<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { Trash2, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button, Input } from '@repo/vue-ui'
import { TodoManager } from '@repo/util'

const queryClient = useQueryClient()
const newTask = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

// Fetch tasks from TodoManager with TanStack Query
const { data: tasks, isLoading } = useQuery({
  queryKey: ['tasks'],
  queryFn: () => TodoManager.getInstance().getTasks()
})

// Mutations for adding and deleting tasks
const addTaskMutation = useMutation({
  mutationFn: (newTask: string) => TodoManager.getInstance().addTask(newTask),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  }
})

const deleteTaskMutation = useMutation({
  mutationFn: (taskId: number) => TodoManager.getInstance().deleteTask(taskId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  }
})

// Calculate pagination values
const totalPages = computed(() => Math.ceil((tasks.value || []).length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)
const currentTasks = computed(() => (tasks.value || []).slice(startIndex.value, endIndex.value))

console.log(tasks.value)

const goToNextPage = () => {
  currentPage.value = Math.min(currentPage.value + 1, totalPages.value)
}

const goToPrevPage = () => {
  currentPage.value = Math.max(currentPage.value - 1, 1)
}

const handleAddTask = () => {
  if (newTask.value.trim()) {
    addTaskMutation.mutate(newTask.value)
    newTask.value = ''
  }
}

const handleDeleteTask = (taskId: number) => {
  deleteTaskMutation.mutate(taskId)
}
</script>

<template>
  <div class="vs-max-w-md vs-mx-auto vs-bg-white vs-rounded-xl vs-shadow-md vs-overflow-hidden">
    <div class="vs-p-6">
      <h1 class="vs-text-xl vs-font-bold vs-text-gray-800 vs-mb-4">Todo App</h1>

      <form @submit.prevent="handleAddTask" class="vs-flex vs-space-x-2 vs-mb-4">
        <Input type="text" v-model="newTask" placeholder="Add a new task" class="vs-flex-grow" />
        <Button type="submit" size="sm">
          <PlusCircle class="vs-h-4 vs-w-4 vs-mr-1" />
          Add
        </Button>
      </form>

      <ul class="vs-space-y-2 vs-mb-4">
        <template v-if="isLoading">
          <div>Loading tasks...</div>
        </template>
        <template v-else>
          <li
            v-for="task in currentTasks"
            :key="task.id"
            class="vs-flex vs-items-center vs-justify-between vs-p-2 vs-bg-gray-50 vs-rounded-lg"
          >
            <span class="vs-text-gray-700 vs-text-sm">{{ task.text }}</span>
            <Button
              variant="destructive"
              size="sm"
              @click="handleDeleteTask(task.id)"
              aria-label="Delete task"
              class="vs-size-8 !vs-p-0"
            >
              <Trash2 class="vs-h-3 vs-w-3" />
            </Button>
          </li>
        </template>
      </ul>

      <div class="vs-flex vs-items-center vs-justify-between vs-text-sm">
        <Button
          @click="goToPrevPage"
          :disabled="currentPage === 1"
          variant="outline"
          size="sm"
          class="vs-text-xs"
        >
          <ChevronLeft class="vs-h-3 vs-w-3 vs-mr-1" />
          Prev
        </Button>
        <span class="vs-text-gray-500">Page {{ currentPage }} of {{ totalPages }}</span>
        <Button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          variant="outline"
          size="sm"
          class="vs-text-xs"
        >
          Next
          <ChevronRight class="vs-h-3 vs-w-3 vs-ml-1" />
        </Button>
      </div>
    </div>
  </div>
</template>
