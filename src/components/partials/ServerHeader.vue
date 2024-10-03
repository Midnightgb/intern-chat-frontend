//src/components/partials/ServerHeader.vue
<template>
  <div class="flex items-center gap-2">
    <button
      class="ml-auto p-2 rounded-full hover:bg-slate-200 hover:text-red-500"
      @click="handleCloseChat"
    >
    <X/>
    </button>
    <Server/>
    <h2 class="text-xl font-bold">{{ serverName }}</h2>
  </div>
  <div class="flex items-center gap-2">
    <button
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
    >
    <Search />
    </button>
    <button
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
    >
    <Settings />
    </button>
  </div>
</template>

<script setup>
import { Server, X, Search, Settings } from 'lucide-vue-next'
import { useCurrentConversationStore } from '@stores/conversations/currentConversationStore'
import { useCurrentChannelStore } from '@stores/channels/currentChannelStore'

const currentConversationStore = useCurrentConversationStore()
const currentChannelStore = useCurrentChannelStore()

function handleCloseChat() {
  currentConversationStore.clearCurrentConversation()
  currentChannelStore.clearCurrentChannel()
}

defineProps({
  serverName: {
    type: String,
    required: true
  }
})
</script>
