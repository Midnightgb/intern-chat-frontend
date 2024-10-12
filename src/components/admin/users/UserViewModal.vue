<template>
  <fwb-modal size="xl" position="center" @close="$emit('close')">
    <template #header>
      <h3 class="text-xl font-medium text-gray-900 dark:text-white">
        User Details
      </h3>
    </template>
    <template #body>
      <div class="space-y-4">
        <p><strong>ID:</strong> {{ user.id_user }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <!-- Add more user details as needed -->
      </div>
    </template>
    <template #footer>
      <fwb-button @click="$emit('close')">Close</fwb-button>
    </template>
  </fwb-modal>
</template>

<script setup>
import { FwbModal, FwbButton } from 'flowbite-vue'

defineProps({
  user: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])
</script>
