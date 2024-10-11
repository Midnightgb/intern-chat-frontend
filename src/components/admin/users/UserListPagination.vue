<template>
  <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
    aria-label="Table navigation">
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
      Showing
      <span class="font-semibold text-gray-900 dark:text-white">{{ (pagination.page - 1) * pagination.limit + 1 }}-{{ Math.min(pagination.page * pagination.limit, pagination.total_users) }}</span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total_users }}</span>
    </span>
    <ul class="inline-flex items-stretch -space-x-px">
      <!-- Pagination buttons -->
    </ul>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  pagination: {
    type: Object,
    required: true
  }
})
</script>

