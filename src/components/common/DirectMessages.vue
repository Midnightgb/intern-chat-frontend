<template>
  <div class="flex flex-col h-full">
    <div class="bg-muted rounded-lg p-2 text-muted-foreground">
      <div class="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
        </svg>
        <span class="ml-2 text-sm font-medium inline">Direct Messages</span>
      </div>
    </div>

    <div v-if="loadingConversations" class="flex items-center justify-center">
      <fwb-spinner color="gray" size="10" />
    </div>

    <div v-else-if="conversations.length > 0" class="space-y-2">
      <button
        v-for="conversation in conversations"
        :key="conversation.user_recipient.id_user"
        class="bg-muted rounded-lg p-2 text-muted-foreground hover:bg-slate-200 transition-all hover:text-accent-foreground w-full border border-rounded border-black"
        @click="handleConversationClick(conversation)"
      >
        <div class="flex items-center w-full">
          <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 z-10">
            <img
              v-if="getUserAvatar(conversation, conversation.user_recipient ? 'user_recipient' : 'users')"
              class="aspect-square h-full w-full"
              alt="User Avatar"
              :src="getUserAvatar(conversation, conversation.user_recipient ? 'user_recipient' : 'users')"
            />
            <CircleUserRound v-else size="32" class="aspect-square h-full w-full" />
          </span>
          <div class="flex flex-col items-start flex-grow border border-red-500">
            <div class="flex justify-between items-center w-full">
              <TruncatedContent :content="conversation.user_recipient.full_name" :maxLength="12" class="text-sm font-medium" />
              <span class="ml-1 text-xs text-muted-foreground">{{ formatDate(conversation.date) }}</span>
            </div>
            <span class="text-xs text-muted-foreground mt-1">
              <TruncatedContent :content="conversation.content" />
            </span>
          </div>
        </div>
      </button>
    </div>

    <div v-else>
      <p>No hay conversaciones.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
// Stores
import { useMessageStore } from '@/stores/messages/messageStore'
import { useCurrentConversationStore } from '@/stores/conversations/currentConversationStore'
// Components
import TruncatedContent from '@/components/common/TruncatedContent.vue'
import { FwbSpinner } from 'flowbite-vue'
import { CircleUserRound } from 'lucide-vue-next'
import { getUserAvatar  } from '@/utils/helpers'

import { formatDate } from '@/utils/date/convertTime'; 

const messageStore = useMessageStore()
const currentConversationStore = useCurrentConversationStore()
const conversations = computed(() => messageStore.conversations)
const loadingConversations = computed(() => messageStore.loadingConversations)

function handleConversationClick(conversation) {
  currentConversationStore.setCurrentConversationId(conversation.user_recipient.id_user)
  currentConversationStore.setCurrentConversationName(conversation.user_recipient.full_name)
}
</script>