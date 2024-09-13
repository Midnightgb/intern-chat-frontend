<!-- src/components/chat/MessageList.vue -->
<template>
  <div class="relative flex flex-col h-full">
    <div
      ref="messageContainer"
      class="flex flex-col gap-3 flex-grow overflow-y-auto pr-4"
      @scroll="handleScroll"
    >
      <!-- Mostrar un mensaje si no hay mensajes -->
      <div v-if="messages.length === 0" class="text-center text-gray-500 mt-10">
        No hay mensajes por mostrar.
      </div>

      <!-- Mostrar la lista de mensajes si existen -->
      <div
        v-for="message in messages"
        :key="message.id_message"
        class="flex items-start gap-2 relative bg-gray-300 rounded-lg p-3 break-words"
      >
        <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 z-10">
          <ImageLoader
            v-if="message.users || message.users_send"
            :message="message"
            class="aspect-square h-full w-full"
          />
          <CircleUserRound v-else size="32" class="aspect-square h-full w-full" />
        </span>
        <div class="flex-grow">
          <div class="flex justify-between">
            <div>
              <span class="font-semibold">
                {{ getUserName(message, message.users_send ? 'users_send' : 'users') }}
              </span>
              <span class="text-xs text-muted-foreground ml-2 truncate">
                {{ formatDate(message.created_at) }}
              </span>
            </div>
            <button 
              v-if="(message.user_id ? message.user_id === currentUserId : message.send_id === currentUserId) && message.recent == true" 
              class="pt-1 pr-1 rounded-full"
            >
              <DropDown
                :canEdit="true"
                @edit="editMessage(message)" 
                @delete="deleteMessage(message)" 
              />
            </button>
          </div>
          <div v-if="editingMessage === message.id_message">
            <input 
              v-model="editedContent" 
              @keyup.enter="confirmEditMessage(message.id_message)"
              class="w-full px-2 py-1 border border-gray-300 rounded-md"
            />
            <div class="flex justify-end mt-1">
              <button @click="confirmEditMessage(message.id_message)" class="text-sm text-blue-500">Guardar</button>
              <button @click="cancelEdit" class="ml-2 text-sm text-red-500">Cancelar</button>
            </div>
          </div>
          <div v-if="message.content? message.content : message.url_file" class="mt-1">
            <span v-if="message.content != null" class="text-sm">{{ message.content }}</span>
            <!--  @click="downloadFile(message.url_file)" -->
            <span v-if="isImage(message.url_file)" class="text-sm text-blue-500 cursor-pointer">
              <img :src="message.url_file" alt="Image" class="w-1/3 h-auto" />
            </span>
            <span v-else class="text-sm text-blue-500 cursor-pointer">
              {{ message.url_file }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <NewMessageNotification
      v-if="showNewMessageNotification"
      @scroll-to-bottom="scrollToBottom(true)"
    />
  </div>
</template>




<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
// Stores
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/messages/messageStore'
import { useCurrentUserStore } from '@/stores/user/currentUserStore';
// Utils
import { getUserName } from '@/utils/helpers'
import { formatDate } from '@/utils/date/convertTime'
// Components
import { CircleUserRound } from 'lucide-vue-next'
import DropDown from '@/components/common/DropDown.vue'
import NewMessageNotification from '@/components/common/NewMessageNotification.vue'
import ImageLoader from '@/components/common/AvatarLoader.vue'
import { imageCache } from '@/utils/imageCache';

const cachedImgSrc = ref(null)

const messageStore = useMessageStore()
const { messages } = storeToRefs(messageStore)

const currentUserStore = useCurrentUserStore();
const { currentUserId } = storeToRefs(currentUserStore);

const messageContainer = ref(null)
const isScrolledToBottom = ref(true)
const showNewMessageNotification = ref(false)

const editingMessage = ref(null)
const editedContent = ref('')

console.log("estos son los ",messages.value)



function isImage(url) {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  }

const scrollToBottom = (smooth) => {
  if (messageContainer.value) {
    messageContainer.value.scrollTo({
      top: messageContainer.value.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    })
    isScrolledToBottom.value = true
    showNewMessageNotification.value = false
  } else {
    console.warn('[scrollToBottom] messageContainer.value is null')
  }
}

const handleScroll = () => {
  if (messageContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = messageContainer.value
    const scrolledToBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1

    isScrolledToBottom.value = scrolledToBottom

    if (scrolledToBottom) {
      showNewMessageNotification.value = false
    }
  } else {
    console.warn('[handleScroll] messageContainer.value is null')
  }
}

const editMessage = (message) => {
  const messageId = message.id_message || message.id_direct_message;
  const idType = message.id_message ? 'Id obtenido de un canal' : 'Id obtenido de un mensaje directo';

  if (!messageId) {
    console.error('No valid message ID found!');
    return;
  }

  console.log(`${idType}: ${messageId}`);
  console.log(`Editando mensaje: ${messageId}`);
  
  editingMessage.value = messageId;
  editedContent.value = message.content;
}

const confirmEditMessage = (messageId) => {
  console.log(`Confirming edit for message with ID: ${messageId}`);
  messageStore.updateMessageChannel({
    id_message: messageId,
    content: editedContent.value
  })
  editingMessage.value = null
}

const cancelEdit = () => {
  editingMessage.value = null
}

const deleteMessage = (messageId) => {
  const idMessage = messageId.id_message || messageId.id_direct_message;
  const idType = messageId.id_message ? 'Id obtenido de un canal' : 'Id obtenido de un mensaje directo';

  if (!idMessage) {
    console.error('No valid message ID found!');
    return;
  }

  console.log(`${idType}: ${idMessage}`);
  console.log(`Eliminando mensaje: ${idMessage}`);
}

onMounted(() => {
  scrollToBottom()
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.addEventListener('scroll', handleScroll)
    } else {
      console.warn('[onMounted] messageContainer.value is null, scroll listener not added')
    }
  })
})

watch(
  () => [...messages.value],
  (newMessages, oldMessages) => {
    nextTick(() => {
      const smooth = isScrolledToBottom.value
      if (newMessages.length > oldMessages.length) {
        if (isScrolledToBottom.value) {
          scrollToBottom(smooth)
        } else {
          showNewMessageNotification.value = true
        }
      } else {
        console.log('No new messages')
      }
    })
  },
  { deep: true }
)


</script>
