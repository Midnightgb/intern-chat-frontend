<template>
  <div class="flex items-center gap-2">
    <span class="relative flex shrink-0 w-8 h-8">
      <UploadFileTest class="absolute bottom-0 right-0" :resetFile="resetFile" @fileSelected="handleFileSelected" />
    </span>
    <div class="relative w-full">
      <input
        v-model="message"
        class="flex h-10 w-full border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-lg bg-muted px-4 py-2 text-sm"
        placeholder="Type your message..."
        type="text"
        @keyup.enter="sendMessage"
      />
      <div v-if="selectedFile" class="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
        <img v-if="isImage" :src="selectedFile" alt="preview" class="w-8 h-8 object-cover rounded" />
        <div v-else class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7v10M17 7v10m-5-6h3" />
          </svg>
          <span>{{ fileName }}</span>
        </div>
      </div>
      <input v-if="selectedFile" type="hidden" name="uploadedFile" :value="fileName" />
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
import { Send } from 'lucide-vue-next';
import UploadFileTest from '@/components/common/UploadFileDropdown.vue'

const currentChannelStore = useCurrentChannelStore()
const currentConversationStore = useCurrentConversationStore()
const { currentChannelId } = storeToRefs(currentChannelStore)
const { currentConversationId } = storeToRefs(currentConversationStore)

const message = ref('')
const resetFile = ref(false)
const selectedFile = ref(null)
const fileName = ref('')
const isImage = ref(false)

const sendMessage = () => {
  if (message.value.trim() === '' && !selectedFile.value) {
    console.log('No message or file to send.')
    return
  }

  const payload = {
    text: message.value,
    file: selectedFile.value ? {
      name: fileName.value,
      content: selectedFile.value,
      isImage: isImage.value
    } : null
  }

  if (currentChannelId.value) {
    console.log("SE ESTA ENVIANDO UN MENSAJE A UN CANAL", payload)
    socketService.sendMessage(currentChannelId.value, payload)
  } else if (currentConversationId.value) {
    console.log('%cSE ESTA MANDANDO UN MENSAJE A UNA CONVERSACION', 'color: darkblue;', payload)
  }
  
  message.value = ''
  selectedFile.value = null
  console.log('Message and file cleared.')
  resetFile.value = true
  setTimeout(() => {
    resetFile.value = false
  }, 100)
}

const handleFileSelected = (file) => {
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedFile.value = e.target.result
      console.log('File selected:', file.name)
    }
    fileName.value = file.name
    isImage.value = file.type.startsWith('image/')
    reader.readAsDataURL(file)
  } else {
    selectedFile.value = null
    console.log('File cleared.')
  }
}
</script>
