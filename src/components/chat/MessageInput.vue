//src/components/chat/MessageInput.vue
<template>
  <div class="flex items-center gap-2">
    <span class="relative flex w-8 h-8 shrink-0">
      <UploadFileDropdown @fileSelected="handleFileSelected" />
    </span>
    <div class="relative flex-1">
      <input
        v-model="message"
        class="flex flex-1 w-full h-10 px-4 py-2 text-sm border rounded-lg border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-muted"
        :placeholder="selectedFile ? selectedFile.name : 'Type your message...'"
        type="text"
        @keyup.enter="sendMessage"
      />
      <span v-if="selectedFile" class="absolute text-sm text-gray-500 transform -translate-y-1/2 right-2 top-1/2">
        {{ selectedFile.name }}
      </span>
    </div>
    <button
      @click="sendMessage"
      class="inline-flex items-center justify-center w-10 h-10 text-sm font-medium transition-colors rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
    >
      <Send class="w-5 h-5" />
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
import UploadFileDropdown from '@/components/common/UploadFileDropdown.vue'

const currentChannelStore = useCurrentChannelStore()
const currentConversationStore = useCurrentConversationStore()
const { currentChannelId } = storeToRefs(currentChannelStore)
const { currentConversationId } = storeToRefs(currentConversationStore)

const message = ref('')
const selectedFile = ref(null)

const sendMessage = async () => {
  if (message.value.trim() === '' && !selectedFile.value) {
    return;
  }


  try {
/*     const response = await apiClient.post(API_ENDPOINTS.SEND_MESSAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }); */
  if (currentChannelId.value) {
    socketService.sendMessage(currentChannelId.value, message.value, selectedFile.value);
  } else if (currentConversationId.value) {
    if (selectedFile.value) {
      socketService.sendDirectMessage(currentConversationId.value, null, selectedFile.value);
    }else{
      socketService.sendDirectMessage(currentConversationId.value, message.value, null);
    }
  }
    message.value = '';
    selectedFile.value = null;
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
};

const handleFileSelected = (file) => {
  selectedFile.value = file
}
</script>