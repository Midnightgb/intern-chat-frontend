<template>
  <fwb-modal size="xl" position="center" @close="$emit('close')">
    <template #header>
      <h3 class="text-xl font-medium text-gray-900 dark:text-white">
        Edit User
      </h3>
    </template>
    <template #body>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" id="name" v-model="editedUser.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" id="email" v-model="editedUser.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <!-- Add more fields as needed -->
      </form>
    </template>
    <template #footer>
      <fwb-button @click="handleSubmit" color="blue">Save changes</fwb-button>
      <fwb-button @click="$emit('close')" color="gray">Cancel</fwb-button>
    </template>
  </fwb-modal>
</template>

<script setup>
import { ref } from 'vue'
import { FwbModal, FwbButton } from 'flowbite-vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'user-updated'])

const editedUser = ref({ ...props.user })

const handleSubmit = () => {
  // Aquí iría la lógica para actualizar el usuario
  // Por ejemplo, una llamada a la API
  // updateUser(editedUser.value)
  emit('user-updated', editedUser.value)
  emit('close')
}
</script>
