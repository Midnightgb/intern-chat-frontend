<template>
  <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
    aria-label="Table navigation">
    <div class="flex items-center space-x-4">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Mostrando
        <span class="font-semibold text-gray-900 dark:text-white">
          {{ (pagination.page - 1) * pagination.limit + 1 }}-{{
            Math.min(pagination.page * pagination.limit, pagination.total_users)
          }}
        </span>
        de
        <span class="font-semibold text-gray-900 dark:text-white">{{
          pagination.total_users
        }}</span>
      </span>
      <fwb-dropdown placement="top">
        <template #trigger>
          <button
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            {{ pagination.limit }} por página
          </button>
        </template>
        <fwb-list-group class="py-1">
          <fwb-list-group-item class="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            v-for="option in pageSizeOptions" :key="option" @click="changePageSize(option)">
            {{ option }}
          </fwb-list-group-item>
          <fwb-list-group-item>
            <div class="flex items-center">
              <input type="number" v-model="customPageSize" min="1" max="1000"
                class="w-20 px-2 py-1 text-sm border rounded text-gray-300 dark:text-gray-900"
                @keyup.enter="changePageSize(parseInt(customPageSize))" />
              <fwb-button class="ml-2 text-sm" variant="light"
                @click="changePageSize(parseInt(customPageSize))">
                Aplicar
              </fwb-button>
            </div>
          </fwb-list-group-item>
        </fwb-list-group>
      </fwb-dropdown>
    </div>
    <ul class="inline-flex items-stretch -space-x-px">
      <fwb-pagination v-model="currentPage" :total-pages="pagination.total_pages" show-icons
        @update:modelValue="onPageChange" />
    </ul>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { FwbPagination, FwbDropdown, FwbListGroup, FwbListGroupItem, FwbButton } from 'flowbite-vue'

const props = defineProps({
  pagination: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['page-change', 'limit-change'])

const currentPage = ref(props.pagination.page)
const customPageSize = ref('')
const pageSizeOptions = [10, 20, 50]

watch(
  () => props.pagination.page,
  (newPage) => {
    currentPage.value = newPage
  }
)

function onPageChange(newPage) {
  emit('page-change', newPage)
}

function changePageSize(newSize) {
  if (newSize >= 1 && newSize <= 1000) {
    emit('limit-change', newSize)
  }
}
</script>
