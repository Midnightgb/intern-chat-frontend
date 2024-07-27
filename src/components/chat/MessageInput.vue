//src/components/chat/MessageInput.vue
<template>
  <div class="flex items-center gap-2">
    <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
      <img
        class="aspect-square h-full w-full"
        alt="User Avatar"
        src="/images/placeholder-user.png"
      />
    </span>
    <input
      v-model="message"
      class="flex h-10 w-full border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-lg bg-muted px-4 py-2 text-sm"
      placeholder="Type your message..."
      type="text"
      @keyup.enter="sendMessage"
    />
    <button
      @click="sendMessage"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
    >
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
        class="h-5 w-5"
      >
        <path d="M22 2L11 13"></path>
        <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
      </svg>
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
// Services
import { socketService } from '@/services/socketService'
// Stores
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'

const currentChannelStore = useCurrentChannelStore()
const { currentChannelId } = storeToRefs(currentChannelStore)

const message = ref('')

const sendMessage = () => {
  if (message.value.trim() === '') {
    return
  }

  socketService.sendMessage(currentChannelId.value, message.value)
  message.value = '' // Limpiar el input después de enviar
}
</script>
