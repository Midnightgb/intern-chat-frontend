//src/components/chat/ConversationList.vue
<template>
  <div class="flex-grow overflow-y-auto hide-scrollbar dark:bg-gray-800">
    <div v-if="loading" class="space-y-2">
      <v-skeleton-loader
        v-for="index in 8"
        :key="index"
        :loading="true"
        type="list-item-avatar-two-line"
        height="58"
        width="100%"
        class="select-none flex items-center justify-center scroll-m-2 dark:bg-gray-700"
      ></v-skeleton-loader>
    </div>
    <div v-else-if="conversations.length > 0" class="space-y-1">
      <ConversationItem
        v-for="conversation in conversations"
        :key="getKey(conversation)"
        :conversation="conversation"
        @select="handleSelect"
      />
    </div>
    <div v-else class="text-center text-sm font-bold p-4 text-slate-400 dark:text-gray-300">
      <p>No hay conversaciones o usuarios que coincidan con tu búsqueda.</p>
    </div>
  </div>
</template>

<script setup>
import ConversationItem from '@components/chat/ConversationItem.vue'

defineProps({
  conversations: Array,
  loading: Boolean
})

const emit = defineEmits(['select'])

function getKey(conversation) {
  return conversation.user_recipient ? conversation.user_recipient.id_user : conversation.id_user
}

function handleSelect(conversation) {
  emit('select', conversation)
}
</script>