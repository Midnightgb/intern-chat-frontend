//src/components/chat/MessageList.vue
<template>
  <div class="flex flex-col gap-4 min-h-0 overflow-y-auto pr-4">
    <div
      v-for="message in messages"
      :key="message.id_message"
      class="flex items-start gap-2 relative"
    >
      <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 z-10 bg-white">
        <img
          class="aspect-square h-full w-full"
          alt="User Avatar"
          :src="message.users.avatar_url || '/images/placeholder-user.png'"
        />
      </span>
      <div class="flex-grow pb-4">
        <div class="flex items-center justify-between">
          <div>
            <span class="font-semibold">{{ message.users.full_name }}</span>
            <span class="text-xs text-muted-foreground ml-2">{{
              formatDate(message.created_at)
            }}</span>
          </div>
          <button class="p-1 hover:bg-gray-100 rounded-full">
            <DropDown />
          </button>
        </div>
        <div class="text-muted-foreground mt-1">{{ message.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
// Stores
import { useMessageStore } from '@/stores/messages/messageStore'

// drop down
import DropDown from '@/components/common/DropDown.vue';

const messageStore = useMessageStore()
const { messages } = storeToRefs(messageStore)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
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
</style>
     