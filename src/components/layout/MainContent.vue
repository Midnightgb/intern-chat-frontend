<!-- src/components/layout/MainContent.vue -->
<template>
  <main class="flex-1 border-gray-300 dark:border-gray-700 rounded-tr-xl bg-gray-100 dark:bg-gray-800 flex flex-col h-screen">
    <!-- Contenido principal -->
    <div class="flex-1 px-6 pt-6 overflow-hidden flex flex-col">
      <!-- Mostrar mensaje cuando no se ha seleccionado nada -->
      <div v-if="!currentChannelId && !currentConversationId" class="flex items-center justify-center h-full">
        <h2 class="text-2xl font-bold text-gray-500 dark:text-gray-400">Selecciona un canal o una conversación.</h2>
      </div>
      
      <!-- Mostrar loader cuando se están cargando mensajes -->
      <div v-else-if="isLoadingMessages" class="flex items-center justify-center h-full">
        <fwb-spinner color="gray" size="10" />
      </div>
      
      <!-- Mostrar contenido de mensajes -->
      <div v-else class="flex flex-col h-full">
        <div class="flex items-center justify-between mb-2 border-b dark:border-gray-700">
          <ServerHeader :serverName="currentChannelName || currentConversationName" />
        </div>
        <div class="flex-1  rounded-lg px-4 overflow-hidden flex flex-col modern-scrollbar">
          <MessageList class="flex-1 overflow-y-auto" />
        </div>
      </div>
    </div>
    
    <!-- Barra inferior con MessageInput -->
    <div v-if="currentChannelId || currentConversationId" class="border-t border-gray-300 dark:border-gray-700 p-4 bg-gray-100 dark:bg-gray-800">
      <MessageInput />
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, computed, watch } from 'vue'

// Services
import { socketService } from '@services/socketService'
// Stores
import { useCurrentChannelStore } from '@stores/channels/currentChannelStore'
import { useCurrentConversationStore } from '@stores/conversations/currentConversationStore'
import { useMessageStore } from '@stores/messages/messageStore'
import { useAuthStore } from '@stores/auth'
// Components
import { FwbSpinner } from 'flowbite-vue'
import MessageInput from '@components/chat/MessageInput.vue'
import MessageList from '@components/chat/MessageList.vue'
import ServerHeader from '@components/partials/ServerHeader.vue'

const currentChannelStore = useCurrentChannelStore()
const currentConversationStore = useCurrentConversationStore()
const messageStore = useMessageStore()

const { currentChannelId, currentChannelName } = storeToRefs(currentChannelStore)
const { currentConversationId, currentConversationName } = storeToRefs(currentConversationStore)
const isLoadingMessages = computed(() => messageStore.loadingMessages)
const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth();
  if (authStore.isAuthenticated) {
    socketService.connect();
  }  socketService.getConversations()

})

onUnmounted(() => {
  socketService.disconnect()
})

watch([currentChannelId, currentConversationId], ([newChannelId, newConversationId], [oldChannelId, oldConversationId]) => {
  if (newChannelId !== oldChannelId || newConversationId !== oldConversationId) {
    socketService.cancelCurrentRequest();
    if (newChannelId) {
      socketService.joinChannel(newChannelId);
    } else if (newConversationId) {
      socketService.getDirectMessages(newConversationId, newConversationId);
    }
  }
})
</script>
