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
      <fwb-pagination 
        v-model="currentPage" 
        :total-pages="pagination.total_pages" 
        show-icons
        @update:modelValue="onPageChange"
      />
    </ul>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { FwbPagination } from 'flowbite-vue'

const props = defineProps({
  pagination: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['page-change'])

const currentPage = ref(props.pagination.page)

watch(() => props.pagination.page, (newPage) => {
  currentPage.value = newPage
})

function onPageChange(newPage) {
  emit('page-change', newPage)
}
</script>
