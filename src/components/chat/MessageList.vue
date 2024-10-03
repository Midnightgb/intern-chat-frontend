<template>
  <div class="relative flex flex-col h-full">
    <div
      ref="messageContainer"
      class="flex flex-col gap-3 flex-grow overflow-y-auto pr-4"
      @scroll="handleScroll"
    >
      <!-- Mostrar un mensaje si no hay mensajes -->
      <div v-if="computedMessages.length === 0" class="text-center text-gray-500 mt-10">
        No hay mensajes por mostrar.
      </div>

      <!-- Mostrar la lista de mensajes si existen -->
      <div
        v-for="message in computedMessages"
        :key="message.id_message || message.id_direct_message"
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

            <!-- Mostrar el menú de acciones solo si no estamos confirmando eliminación -->
            <button 
              v-if="(message.user_id ? message.user_id === currentUserId : message.send_id === currentUserId) && message.isRecent && deletingMessage !== message.id_message" 
              class="pt-1 pr-1 rounded-full"
            >
              <DropDown
                :canEdit="true"
                @edit="editMessage(message)" 
                @delete="deleteMessage(message)" 
              />
            </button>

            <!-- Mostrar la confirmación de eliminación -->
            <div v-if="deletingMessage === message.id_message" class="flex gap-2">
              <button @click="confirmDeleteMessage(message.id_message)" class="text-sm text-red-500">Confirmar</button>
              <button @click="cancelDelete" class="text-sm text-blue-500">Cancelar</button>
            </div>
          </div>

          <div v-if="editingMessage === message.id_message || editingMessage === message.id_direct_message">
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

          <div v-if="message.content || message.url_file" class="mt-1">
            <span v-if="message.content != null" class="text-sm">{{ message.content }}</span>
            <span v-if="isImage(message.url_file)" class="text-sm text-blue-500 cursor-pointer">
              <img :src="message.url_file" alt="Image" class="w-1/3 h-auto" />
            </span>
            <span v-else-if="message.url_file" class="text-sm text-blue-500 cursor-pointer">
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
import { ref, onMounted, nextTick, watch, computed } from 'vue'
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

const messageStore = useMessageStore()
const { messages } = storeToRefs(messageStore)

const currentUserStore = useCurrentUserStore();
const { currentUserId } = storeToRefs(currentUserStore);

const messageContainer = ref(null)
const isScrolledToBottom = ref(true)
const showNewMessageNotification = ref(false)

const editingMessage = ref(null)
const typeMessage = ref(null) 
const editedContent = ref('')
const deletingMessage = ref(null)

// Computed property para los mensajes
const computedMessages = computed(() => 
  messages.value.map(message => ({
    ...message,
    isRecent: true, // Asumimos que todos los mensajes son recientes por ahora
    id: message.id_message || message.id_direct_message // Aseguramos una key única
  }))
)

function isImage(url) {
  return url && /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
}

const scrollToBottom = (smooth) => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTo({
        top: messageContainer.value.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      })
      isScrolledToBottom.value = true
      showNewMessageNotification.value = false
    }
  })
}

const handleScroll = () => {
  if (messageContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = messageContainer.value
    const scrolledToBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1

    isScrolledToBottom.value = scrolledToBottom

    if (scrolledToBottom) {
      showNewMessageNotification.value = false
    }
  }
}

const editMessage = (message) => {
  const messageId = message.id_message || message.id_direct_message;
  
  if (!messageId) {
    console.error('No valid message ID found!');
    return;
  }
  
  if (message.id_message) {
    console.log('Selected message ID from channel:', message.id_message);
    typeMessage.value = 'channel';
  } else {
    console.log('Selected direct message ID:', message.id_direct_message);
    typeMessage.value = 'direct';
  }
  
  editingMessage.value = messageId;
  editedContent.value = message.content;
}

const confirmEditMessage = (messageId) => {
  if (typeMessage.value === 'channel') {
    console.log("EDITANDO UN MENSAJE DE CANAL");
    messageStore.updateMessageChannel({
      id_message: messageId,
      content: editedContent.value
    });
  } else if (typeMessage.value === 'direct') {
    console.log("EDITANDO UN MENSAJE DIRECTO");
    
    messageStore.updateMessageConversation({
      id_direct_message: messageId,
      content: editedContent.value
    });
  }else {
    console.error('No valid message type found!');
    return;
  } 

  editingMessage.value = null;
  typeMessage.value = null;

  nextTick(() => {
    scrollToBottom(true);
  });
}

const cancelEdit = () => {
  editingMessage.value = null
}

const deleteMessage = (message) => {
  const messageId = message.id_message || message.id_direct_message;
  if (!messageId) {
    console.error('No valid message ID found!');
    return;
  }
  
  deletingMessage.value = messageId;
}

const confirmDeleteMessage = (messageId) => {
  const message = computedMessages.value.find(m => m.id === messageId);
  if (message) {
    messageStore.deleteMessage(message);
  }
  deletingMessage.value = null;
  nextTick(() => {
    scrollToBottom(true)
  })
}

const cancelDelete = () => {
  deletingMessage.value = null;
}

onMounted(() => {
  scrollToBottom(false)
  if (messageContainer.value) {
    messageContainer.value.addEventListener('scroll', handleScroll)
  }
})

watch(
  computedMessages,
  (newMessages, oldMessages) => {
    nextTick(() => {
      if (newMessages.length > oldMessages.length) {
        if (isScrolledToBottom.value) {
          scrollToBottom(true)
        } else {
          showNewMessageNotification.value = true
        }
      }
    })
  },
  { deep: true }
)
</script>