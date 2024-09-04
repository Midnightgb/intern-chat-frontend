<template>
  <div class="flex items-center gap-2">
    <span class="relative flex shrink-0 w-8 h-8">
      <UploadFileTest class="absolute bottom-0 right-0" />
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
      <Send class="h-5 w-5" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { socketService } from '@/services/socketService'
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'
import { useCurrentConversationStore } from '@/stores/conversations/currentConversationStore'
import { Send } from 'lucide-vue-next'
import UploadFileTest from '@/components/common/UploadFileDropdown.vue'

const currentChannelStore = useCurrentChannelStore()
const currentConversationStore = useCurrentConversationStore()
const { currentChannelId } = storeToRefs(currentChannelStore)
const { currentConversationId } = storeToRefs(currentConversationStore)

const message = ref('')

const sendMessage = () => {
  if (message.value.trim() === '') {
    return
  }

  if (currentChannelId.value) {
    console.log("SE ESTA ENVIANDO UN MENSAJE A UN CANAL")
    socketService.sendMessage(currentChannelId.value, message.value)
  } else if (currentConversationId.value) {
    console.log('%cSE ESTA MANDANDO UN MENSAJE A UNA CONVERSACION', 'color: darkblue;')
  }
  message.value = '' // Limpiar el input después de enviar
}
</script>
