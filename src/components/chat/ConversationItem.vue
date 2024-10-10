//src/components/chat/ConversationItem.vue
<template>
  <button
    class="p-2 text-muted-foreground border-b-2 hover:bg-slate-200 hover:text-accent-foreground w-full dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100"
    @click="selectConversation(conversation)"
  >
    <div class="flex items-center w-full">
      <ImageLoader :message="conversation" />
      <div class="flex flex-col items-start flex-grow ml-2">
        <div class="flex justify-between items-center w-full">
          <div class="text-sm font-medium inline capitalize truncate dark:text-gray-200">
            <TruncatedContent :content="getName(conversation)" />
          </div>
          <span class="text-xs text-muted-foreground dark:text-gray-400">
            {{ getSubtitle(conversation) }}
          </span>
        </div>
        <span class="flex text-xs text-muted-foreground mt-1 truncate w-full dark:text-gray-400">
          <TruncatedContent :content="getContent(conversation)" />
        </span>
      </div>
    </div>
  </button>
</template>

<script setup>
import TruncatedContent from '@components/common/TruncatedContent.vue'
import ImageLoader from '@components/common/AvatarLoader.vue'
import { formatDate } from '@utils/date/convertTime'

defineProps({
  conversation: Object
})

const emit = defineEmits(['select'])

function getName(conversation) {
  return conversation.user_recipient ? conversation.user_recipient.full_name : conversation.full_name
}

function getSubtitle(conversation) {
  return conversation.user_recipient ? formatDate(conversation.date) : conversation.network_user
}

function getContent(conversation) {
  return conversation.user_recipient ? conversation.content : conversation.dominio || 'No domain specified'
}

function selectConversation(conversation) {
  emit('select', conversation)
}
</script>