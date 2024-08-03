//src/components/layout/MainContent.vue
<template>
  <main class="flex-1 border-gray-300 rounded-tr-xl bg-background flex flex-col h-screen">
    <ChatContent
      :currentId="currentId"
      :currentName="currentName"
      :isLoading="isLoading"
      :noSelectionMessage="noSelectionMessage"
    />
    <!-- Barra inferior con MessageInput -->
    <div v-if="currentId" class="border-t border-gray-300 p-4 bg-background">
      <MessageInput @send-message="sendMessage" />
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { socketService } from '@/services/socketService'
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'
import { useMessageStore } from '@/stores/messages/messageStore'
import ChatContent from '@/components/chat/ChatContent.vue'
import MessageInput from '@/components/chat/MessageInput.vue'

const route = useRoute()
const currentChannelStore = useCurrentChannelStore()
const messageStore = useMessageStore()

const { currentChannelId, currentChannelName } = storeToRefs(currentChannelStore)
const { loadingMessages, loadingConversations } = storeToRefs(messageStore)

const currentId = computed(() => {
  return route.name === 'direct' ? route.params.userId : currentChannelId.value
})

const currentName = computed(() => {
  return route.name === 'direct' ? 'Mensaje Directo' : currentChannelName.value
})

const isLoading = computed(() => {
  return route.name === 'direct' ? loadingConversations.value : loadingMessages.value
})

const noSelectionMessage = computed(() => {
  return route.name === 'direct' ? 'Por favor, selecciona un usuario.' : 'Por favor, selecciona un canal.'
})

onMounted(() => {
  socketService.connect()
})

onUnmounted(() => {
  socketService.disconnect()
})

watch(currentId, (newId) => {
  if (newId) {
    if (route.name === 'direct') {
      socketService.getDirectMessages(newId, route.params.recipientId)
    } else {
      socketService.joinChannel(newId)
    }
  }
})

function sendMessage(message) {
  if (route.name === 'direct') {
    socketService.sendDirectMessage(currentId.value, message)
  } else {
    socketService.sendMessage(currentId.value, message)
  }
}
</script>