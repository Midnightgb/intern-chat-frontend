<template>
  <article class="relative">
    <HeaderTab title="Roles" description="Gestiona todos los roles existentes o añade uno nuevo">
    </HeaderTab>
    <section class="flex flex-col gap-4 p-4">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
        <div v-if="isLoading"
          class="absolute inset-0 bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 flex items-center justify-center z-10">
          <fwb-spinner size="12" />
        </div>

      </div>
    </section>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRoles } from '@services/api'
import { FwbSpinner } from 'flowbite-vue'
import HeaderTab from '@components/common/HeaderTab.vue'

const isLoading = ref(false)
const roles = ref([])

onMounted(async () => {
  await fetchRoles()
})

async function fetchRoles() {
  isLoading.value = true
  try {
    const response = await getRoles()
    roles.value = response.data
    console.log('roles:', roles);
  } catch (error) {
    console.error('Error fetching roles:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
