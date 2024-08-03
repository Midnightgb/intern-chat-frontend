//src/components/chat/ChatContent.vue
<template>
  <div class="flex-1 px-6 pt-6 overflow-hidden flex flex-col">
    <!-- Mostrar mensaje cuando no hay selección -->
    <div v-if="!currentId" class="flex items-center justify-center h-full">
      <h2 class="text-2xl font-bold text-gray-500">{{ noSelectionMessage }}</h2>
    </div>
    <!-- Mostrar loader cuando se están cargando los datos -->
    <div v-else-if="isLoading" class="flex items-center justify-center h-full">
      <fwb-spinner color="gray" size="10" />
    </div>
    <!-- Mostrar contenido cuando los datos estén listos -->
    <div v-else class="flex flex-col h-full">
      <div class="flex items-center justify-between mb-2 border-b">
        <ServerHeader :serverName="currentName" />
      </div>
      <div class="flex-1 bg-muted rounded-lg px-4 overflow-hidden flex flex-col">
        <MessageList class="flex-1 overflow-y-auto" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { FwbSpinner } from 'flowbite-vue'
import MessageList from '@/components/chat/MessageList.vue'
import ServerHeader from '@/components/partials/ServerHeader.vue'

defineProps({
  currentId: {
    type: Number,
    default: null
  },
  currentName: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  noSelectionMessage: {
    type: String,
    default: 'Por favor, selecciona una opción.'
  }
})
</script>