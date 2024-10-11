<template>
  <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
    <div
      class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
      <div class="flex items-center space-x-3 w-full md:w-auto">
        <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown"
          class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          type="button">
          <Filter />
          Filter
          <ChevronDown />
        </button>
        <div id="filterDropdown" class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Filter dropdown content -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Filter, ChevronDown } from 'lucide-vue-next'
</script>

