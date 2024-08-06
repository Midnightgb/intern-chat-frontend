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
            class="h-6 w-6 flex-shrink-0"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
          <div class="flex flex-col items-start flex-grow ml-2">
            <div class="flex justify-between items-center w-full">
              <span class="text-sm font-medium">{{ conversation.user_recipient.full_name }}</span>
              <span class="text-xs text-muted-foreground">{{ conversation.created_at }}</span>
            </div>
            <span class="text-xs text-muted-foreground mt-1 truncate">
              {{ conversation.content }}
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
import { computed } from 'vue';
import { useMessageStore } from '@/stores/messages/messageStore';
import { useCurrentConversationStore } from '@/stores/conversations/currentConversationStore';
import { FwbSpinner } from 'flowbite-vue';

const messageStore = useMessageStore();
const currentConversationStore = useCurrentConversationStore();
const conversations = computed(() => messageStore.conversations);
const loadingConversations = computed(() => messageStore.loadingConversations);

function handleConversationClick(conversation) {
  currentConversationStore.setCurrentConversationId(conversation.user_recipient.id_user);
  currentConversationStore.setCurrentConversationName(conversation.user_recipient.full_name);
}
</script>
