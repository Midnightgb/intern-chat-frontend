<template>
  <HeaderTab title="Canales" description="Gestiona todos los canales existentes o añade uno nuevo">
    <fwb-button>
      <template #prefix>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor"
          aria-hidden="true">
          <path
            d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      </template>
      Añadir nuevo canal
    </fwb-button>
  </HeaderTab>
  <section class="flex flex-col gap-4 p-4">
    <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
      <div v-if="isLoading"
        class="absolute inset-0 bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 flex items-center justify-center z-10">
        <fwb-spinner size="12" />
      </div>
      <ListTable 
        :items="channels" 
        :headers="['ID', 'Nombre', 'Descripcion', 'URL Imagen', 'Estado', 'Creado', 'Actualizado']"
        :fields="['id_channel', 'name', 'description', 'image_channel', 'status_channel', 'created_at', 'updated_at']" 
        keyField="id_channel"
        :formatters="formatters"
      >
        <template #cell-image_channel="{ value }">
          <TruncatedContent :content="value" :max-length="30" />
        </template>
      </ListTable>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getChannels } from '@services/api'

import HeaderTab from '@components/common/HeaderTab.vue'
import { FwbButton, FwbSpinner } from 'flowbite-vue'
import ListTable from '@admin/common/ListTable.vue'
import TruncatedContent from '@components/common/TruncatedContent.vue'

const isLoading = ref(false)
const channels = ref([])

onMounted(async () => {
  await fetchChannels()
})

async function fetchChannels() {
  isLoading.value = true
  try {
    const response = await getChannels()
    channels.value = response.data
    console.log('channels:', channels.value)
  } catch (error) {
    console.error('Error fetching channels:', error)
  } finally {
    isLoading.value = false
  }
}

const formatters = {
  created_at: (value) => new Date(value).toLocaleString('es-ES'),
  updated_at: (value) => new Date(value).toLocaleString('es-ES'),
  status_channel: (value) => value ? 'Activo' : 'Inactivo'
}
</script>