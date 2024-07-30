//src/components/chat/MessageList.vue
<template>
  <div class="relative flex flex-col h-full">
    <div
      ref="messageContainer"
      class="flex flex-col gap-3 flex-grow overflow-y-auto pr-4"
      @scroll="handleScroll"
    >
      <div
        v-for="message in messages"
        :key="message.id_message"
        class="flex items-start gap-2 relative bg-gray-300 rounded-lg p-3 break-words"
      >
        <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 z-10">
          <img
            v-if="getUserAvatar(message)"
            class="aspect-square h-full w-full"
            alt="User Avatar"
            :src="getUserAvatar(message)"
          />
          <span v-else class="aspect-square h-full w-full">
            <CircleUserRound size="32" />
          </span>
        </span>
        <div class="flex-grow">
          <div class="flex justify-between">
            <div>
              <span class="font-semibold">{{ getUserName(message) }}</span>
              <span class="text-xs text-muted-foreground ml-2">{{
                formatDate(message.created_at)
              }}</span>
            </div>
            <button class="pt-1 pr-1 rounded-full">
              <DropDown class="hover:text-black" />
            </button>
          </div>
          <div class="text-muted-foreground">{{ message.content }}</div>
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
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/messages/messageStore'
import DropDown from '@/components/common/DropDown.vue'
import { CircleUserRound } from 'lucide-vue-next'
import NewMessageNotification from '@/components/common/NewMessageNotification.vue'

const messageStore = useMessageStore()
const { messages } = storeToRefs(messageStore)

const messageContainer = ref(null)
const isScrolledToBottom = ref(true)
const showNewMessageNotification = ref(false)
const oldMessages = ref(0)

const formatDate = (dateString) => {
  const options = { hour: 'numeric', minute: 'numeric' }
  return new Date(dateString).toLocaleString(undefined, options)
}

const getUserAvatar = (message) => {
  return message.users?.avatar_url || false
}

const getUserName = (message) => {
  return message.users?.full_name || 'Unknown User'
}


const scrollToBottom = (smooth) => {
  if (messageContainer.value) {
    console.log('smooth', smooth);
    messageContainer.value.scrollTo({
      top: messageContainer.value.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    })
    isScrolledToBottom.value = true
    showNewMessageNotification.value = false
  }else {
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

onMounted(() => {
  oldMessages.value = messages.value.length
  scrollToBottom()
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.addEventListener('scroll', handleScroll)
    } else {
      console.warn('[onMounted] messageContainer.value is null, scroll listener not added')
    }
  })
})

watch(() => [...messages.value], (newMessages, oldMessages) => {
  nextTick(() => {
    const smooth = isScrolledToBottom.value
    if (newMessages.length > oldMessages.length) {
      if (isScrolledToBottom.value) {
        scrollToBottom(smooth)
      } else {
        showNewMessageNotification.value = true
      }
    } else {
      console.log('No new messages');
    }
  })
}, { deep: true })
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(204, 203, 203, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 20px;
  border: transparent;
}

.break-words {
  word-wrap: break-word;
  word-break: break-word;
}
</style>
