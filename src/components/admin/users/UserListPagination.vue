<template>
  <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
    aria-label="Table navigation">
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
      Mostrando
      <span class="font-semibold text-gray-900 dark:text-white">{{ (pagination.page - 1) * pagination.limit + 1 }}-{{ Math.min(pagination.page * pagination.limit, pagination.total_users) }}</span>
      de
      <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total_users }}</span>
    </span>
    <ul class="inline-flex items-stretch -space-x-px">
      <fwb-pagination v-model="currentPage" :total-pages="pagination.total_pages" show-icons/>
    </ul>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'
import { FwbPagination } from 'flowbite-vue'
import { ref } from 'vue'

const props = defineProps({
  pagination: {
    type: Object,
    required: true
  }
})

const currentPage = ref(props.pagination.page)

</script>

