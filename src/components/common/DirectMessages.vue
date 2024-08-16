//src/components/common/DirectMessages.vue
<template>
  <div class="flex flex-col h-full w-full">
    <div class="bg-muted rounded-lg p-2 text-muted-foreground mb-2">
      <div class="flex items-center justify-center">
        <MessageCircle />
        <span class="ml-2 text-sm font-medium inline">Direct Messages</span>
      </div>
              <!-- Botón para crear un nuevo mensaje directo y input para buscar usuarios -->
      <div class="flex items-center justify-between mt-2">
        <button
          class="ml-auto p-2 rounded-full hover:bg-slate-200 hover:text-accent-foreground"
          @click="handleNewConversation">
          <CirclePlus />
        </button>
        <input
          v-model="search"
          type="text"
          placeholder="Buscar..."
          class="w-1/2 p-2 rounded-lg bg-slate-200 text-muted-foreground"
        />
        <button
          v-if="search"
          class="p-2 rounded-full hover:bg-slate-200 hover:text-accent-foreground"
          @click="clearSearch">
          <CircleX />
        </button>
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

      <div v-else-if="filteredConversations.length > 0" class="space-y-1">
        <button
          v-for="conversation in filteredConversations"
          :key="conversation.user_recipient.id_user"
          class="p-2 text-muted-foreground hover:bg-slate-200 hover:text-accent-foreground w-full rounded-lg"
          @click="handleConversationClick(conversation)"
        >
          <div class="flex items-center w-full">
            <ImageLoader :message="conversation" />
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
import { computed, ref } from 'vue'
// Stores
import { useMessageStore } from '@/stores/messages/messageStore'
import { useCurrentConversationStore } from '@/stores/conversations/currentConversationStore'
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'
// Icons
import { MessageCircle,CirclePlus,CircleX } from 'lucide-vue-next'
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

const search = ref('')

const filteredConversations = computed(() => {
  if (!search.value) return conversations.value
  return conversations.value.filter(conversation => 
    conversation.user_recipient.full_name.toLowerCase().includes(search.value.toLowerCase()) ||
    conversation.content.toLowerCase().includes(search.value.toLowerCase())
  )
})

function handleConversationClick(conversation) {
  currentConversationStore.updateCurrentConversation(
    conversation.user_recipient.id_user,
    conversation.user_recipient.full_name
  )
  currentChannelStore.clearCurrentChannel()
}

function handleNewConversation() {
  currentConversationStore.clearCurrentConversation()
  currentChannelStore.clearCurrentChannel()
}

function clearSearch() {
  search.value = ''
}
</script>
