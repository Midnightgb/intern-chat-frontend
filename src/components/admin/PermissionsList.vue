<template>
  <article class="relative">
    <HeaderTab title="Permisos" description="Visualiza todos los permisos existentes">
    </HeaderTab>
    <section class="flex flex-col gap-4 p-4">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
        <div v-if="isLoading"
          class="absolute inset-0 bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 flex items-center justify-center z-10">
          <fwb-spinner size="12" />
        </div>
        <ListTable 
          :items="permissions"
          :headers="['ID', 'Nombre', 'Estado', 'Creado', 'Actualizado']"
          :fields="['id_permission', 'name', 'status_permission', 'created_at', 'updated_at']"
          keyField="id_permission"
          :formatters="formatters"
        />
      </div>
    </section>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPermissions } from '@services/api'

import HeaderTab from '@components/common/HeaderTab.vue'
import { FwbSpinner } from 'flowbite-vue'
import ListTable from '@admin/common/ListTable.vue'

const isLoading = ref(false)
const permissions = ref([])

onMounted(async () => {
  await fetchPermissions()
})

async function fetchPermissions() {
  isLoading.value = true
  try {
    const response = await getPermissions()
    permissions.value = response.data
    console.log('permissions:', permissions);
  } catch (error) {
    console.error('Error fetching permissions:', error)
  } finally {
    isLoading.value = false
  }
}

const formatters = {
  created_at: (value) => new Date(value).toLocaleString('es-ES'),
  updated_at: (value) => new Date(value).toLocaleString('es-ES'),
  status_permission: (value) => value ? 'Activo' : 'Inactivo'
}
</script>
