<template>
  <div class="space-y-2">
    <!-- Título de Direct Messages -->
    <div class="bg-muted rounded-lg p-2 text-muted-foreground">
      <div class="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
        </svg>
        <span class="ml-2 text-sm font-medium inline">Direct Messages</span>
      </div>
    </div>

    <!-- Mostrar loader mientras se cargan las conversaciones -->
    <div v-if="loadingConversations" class="flex items-center justify-center">
      <fwb-spinner color="gray" size="10" />
    </div>

    <!-- Lista de conversaciones -->
    <div v-else-if="conversations.length > 0" class="space-y-2">
      <a
        v-for="conversation in conversations"
        :key="conversation.user_recipient.id_user"
        class="bg-muted rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full"
        :href="'#/direct/' + conversation.user_recipient.id_user"
        @click="handleConversationClick(conversation)"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
          <span class="ml-2 text-sm font-medium inline">{{ conversation.user_recipient.full_name }}</span>
        </div>
      </a>
    </div>

    <!-- Mostrar mensaje cuando no hay conversaciones -->
    <div v-else>
      <p>No hay conversaciones.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMessageStore } from '@/stores/messages/messageStore'
import { socketService } from '@/services/socketService'
import { FwbSpinner } from 'flowbite-vue'

const messageStore = useMessageStore()
const conversations = computed(() => messageStore.conversations)
const loadingConversations = computed(() => messageStore.loadingConversations)

function handleConversationClick(conversation) {
  console.log('Conversation clicked:', conversation)
  // Llama al método para obtener los mensajes directos
  socketService.getDirectMessages(conversation.send_id, conversation.recipient_id)
}
</script>


