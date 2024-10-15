<template>
  <fwb-modal size="xl" position="center" @close="$emit('close')">
    <template #header>
      <h3 class="text-xl font-medium text-gray-500 dark:text-white">
        User Details
      </h3>
    </template>
    <template #body>
      <div class="space-y-4 text-gray-900 dark:text-white">
        <p><strong>ID:</strong> <TruncatedContent :content="user.id_user" :max-length="15" /></p>
        <p><strong>Nombre:</strong> {{ user.full_name }}</p>
        <p><strong>Usuario de red:</strong> {{ user.network_user }}</p>
        <p><strong>Dominio:</strong> {{ user.dominio }}</p>
        <p><strong>Rol:</strong> {{ user.role.name }}</p>
        <p><strong>Estado:</strong> {{ user.status_user ? 'Activo' : 'Inactivo' }}</p>
      </div>
    </template>
    <template #footer>
      <fwb-button @click="$emit('close')">Cerrar</fwb-button>
    </template>
  </fwb-modal>
</template>

<script setup>
import { FwbModal, FwbButton } from 'flowbite-vue'
import TruncatedContent from '@/components/common/TruncatedContent.vue'

defineProps({
  user: {
    type: Object,
    required: true
  }
})
defineEmits(['close'])
</script>
