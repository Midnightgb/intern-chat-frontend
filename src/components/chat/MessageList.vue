<template>
  <div class="flex flex-col gap-3 min-h-0 overflow-y-auto pr-4">
    <div
      v-for="message in messages"
      :key="message.id_message"
      :class="[
        'flex items-start gap-2 relative rounded-lg p-3',
        message.user_id === currentUserId ? 'bg-blue-200' : 'bg-gray-200'
      ]"
    >
      <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 z-10 bg-white">
        <img
          class="aspect-square h-full w-full"
          alt="User Avatar"
          :src="message.users.photo_url || '/images/placeholder-user.png'"
        />
      </span>
      <div class="flex-grow">
        <div class="flex justify-between">
          <div>
            <span
              class="font-semibold"
              :class="{ 'text-blue-600': message.user_id === currentUserId }"
            >
              {{ message.users.full_name }}
            </span>
            <span class="text-xs text-muted-foreground ml-2">
              {{ formatDate(message.created_at) }}
            </span>
          </div>
          <button class="pt-1 pr-1 hover:bg-gray-200 rounded-full transition-colors duration-200">
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
import { computed } from 'vue'
// Stores
import { useMessageStore } from '@/stores/messages/messageStore'
import { useAuthStore } from '@/stores/auth'

// drop down
import DropDown from '@/components/common/DropDown.vue'

const messageStore = useMessageStore()
const authStore = useAuthStore()
const { messages } = storeToRefs(messageStore)
const currentUserId = computed(() => authStore.user?.id)

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

/* Estilos adicionales para mejorar la apariencia */
.bg-blue-100 {
  background-color: #e6f3ff;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.text-blue-600 {
  color: #2563eb;
}
</style>
