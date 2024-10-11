<template>
  <button :id="`user-${user.id_user}-dropdown-button`" :data-dropdown-toggle="`user-${user.id_user}-dropdown`"
    class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
    type="button">
    <Ellipsis />
  </button>
  <div :id="`user-${user.id_user}-dropdown`"
    class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
      :aria-labelledby="`user-${user.id_user}-dropdown-button`">
      <li>
        <a href="#"
          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
      </li>
      <li>
        <a href="#"
          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
      </li>
    </ul>
    <div class="py-1">
      <a href="#"
        class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { Ellipsis } from 'lucide-vue-next'

defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

