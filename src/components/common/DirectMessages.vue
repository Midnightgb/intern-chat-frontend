<template>
  <div class="flex flex-col h-full w-full">
    <div class="bg-muted rounded-lg p-2 text-muted-foreground mb-2">
      <div class="flex items-center justify-center">
        <MessageCircle />
        <span class="ml-2 text-sm font-medium inline">Direct Messages</span>
      </div>
    </div>

    <div class="flex-grow overflow-y-auto hide-scrollbar">
      <div v-if="loadingConversations" class="space-y-2">
        <v-skeleton-loader
          v-for="index in 8"
          :key="index"
          :loading="true"
          type="list-item-avatar-two-line"
          height="58"
          width="100%"
          class="select-none flex items-center justify-center scroll-m-2"
        ></v-skeleton-loader>
      </div>

      <div v-else-if="conversations.length > 0" class="space-y-1">
        <button
          v-for="conversation in conversations"
          :key="conversation.user_recipient.id_user"
          class="p-2 text-muted-foreground hover:bg-slate-200 hover:text-accent-foreground w-full rounded-lg"
          @click="handleConversationClick(conversation)"
        >
          <div class="flex items-center w-full">
            <ImageLoader :conversation="conversation" />
            <div class="flex flex-col items-start flex-grow ml-2">
              <div class="flex justify-between items-center w-full">
                <div class="text-sm font-medium inline capitalize truncate">
                  <TruncatedContent :content="conversation.user_recipient.full_name" />
                </div>
                <span class="text-xs text-muted-foreground">{{
                  formatDate(conversation.date)
                }}</span>
              </div>
              <span class="flex text-xs text-muted-foreground mt-1 truncate w-full">
                <TruncatedContent :content="conversation.content" />
              </span>
            </div>
          </div>
        </button>
      </div>

      <div v-else class="text-center py-4 text-muted-foreground">
        <p>No hay conversaciones.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
// Stores
import { useMessageStore } from '@/stores/messages/messageStore'
import { useCurrentConversationStore } from '@/stores/conversations/currentConversationStore'
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'
// Icons
import { MessageCircle } from 'lucide-vue-next'
// Components
import TruncatedContent from '@/components/common/TruncatedContent.vue'
import ImageLoader from '@/components/common/ImageLoader.vue'
// Utils
import { formatDate } from '@/utils/date/convertTime'

const messageStore = useMessageStore()
const currentConversationStore = useCurrentConversationStore()
const currentChannelStore = useCurrentChannelStore()
const conversations = computed(() => messageStore.conversations)
const loadingConversations = computed(() => messageStore.loadingConversations)

function handleConversationClick(conversation) {
  currentConversationStore.updateCurrentConversation(
    conversation.user_recipient.id_user,
    conversation.user_recipient.full_name
  )
  currentChannelStore.clearCurrentChannel()
}
</script>
