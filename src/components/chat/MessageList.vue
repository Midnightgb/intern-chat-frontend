//src/components/chat/MessageList.vue
<template>
  <div class="flex flex-col gap-4">
    <div v-for="message in messages" :key="message.id_message" class="flex items-start gap-2">
      <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
        <img class="aspect-square h-full w-full" alt="User Avatar" :src="message.users.avatar_url || '/images/placeholder-user.png'" />
      </span>
      <div class="flex-grow">
        <div class="flex items-center justify-between">
          <div>
            <span class="font-semibold">{{ message.users.full_name }}</span>
            <span class="text-xs text-muted-foreground ml-2">{{ formatDate(message.created_at) }}</span>
          </div>
          <button class="p-1 hover:bg-gray-100 rounded-full">
            <EllipsisVertical class="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div class="text-muted-foreground mt-1">{{ message.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EllipsisVertical } from 'lucide-vue-next'
import { storeToRefs } from 'pinia';
import { useMessageStore } from '@/stores/messages/messageStore';

const messageStore = useMessageStore();
const { messages } = storeToRefs(messageStore);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};
</script>