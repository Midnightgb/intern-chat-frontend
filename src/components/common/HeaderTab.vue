<template>
  <header
    class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-row items-center justify-between space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
    <hgroup>
      <h5 class="mr-3 font-semibold dark:text-white">{{ title }}</h5>
      <p class="text-gray-500 dark:text-gray-400">{{ description }}</p>
    </hgroup>
    <slot></slot>
  </header>
</template>

<script setup>
defineProps({
  title: String,
  description: String
})
</script>
