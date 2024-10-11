<template>
  <div class="flex items-center justify-between w-full p-2 bg-gray-100 dark:bg-gray-800">
    <div class="flex items-center gap-2">
      <Server class="text-gray-600 dark:text-gray-300"/>
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">{{ serverName }}</h2>
    </div>
    <div class="flex items-center gap-2">
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <Search />
      </button>

      <Modal v-if="isAdmin" />

      <button
        class="ml-auto p-2 rounded-full hover:bg-slate-200 hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-red-400"
        @click="handleCloseChat"
      >
        <X class="text-gray-600 dark:text-gray-300"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Server, X, Search } from 'lucide-vue-next'
import { useCurrentConversationStore } from '@stores/conversations/currentConversationStore'
import { useCurrentChannelStore } from '@stores/channels/currentChannelStore'
import { useCurrentUserStore } from '@stores/user/currentUserStore'
import Modal from '@components/common/Modal.vue'

// Inicializa tus stores
const currentConversationStore = useCurrentConversationStore()
const currentChannelStore = useCurrentChannelStore()
const currentUserStore = useCurrentUserStore() 
const isAdmin = computed(() => currentUserStore.currentUserRole === 'ADMIN')

function handleCloseChat() {
  currentConversationStore.clearCurrentConversation()
  currentChannelStore.clearCurrentChannel()
}

defineProps({
  serverName: {
    type: String,
    required: true
  }
})
</script>
