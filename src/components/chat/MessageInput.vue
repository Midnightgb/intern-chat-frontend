<template>
  <div class="flex items-center gap-2">
    <span class="relative flex shrink-0 w-8 h-8">
      <UploadFileDropdown @fileSelected="handleFileSelected" />
    </span>
    <div class="flex-1 relative">
      <input
        v-model="message"
        class="flex h-10 w-full border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-lg bg-muted px-4 py-2 text-sm"
        :placeholder="selectedFile ? selectedFile.name : 'Type your message...'"
        type="text"
        @keyup.enter="sendMessage"
      />
      <span v-if="selectedFile" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
        {{ selectedFile.name }}
      </span>
    </div>
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