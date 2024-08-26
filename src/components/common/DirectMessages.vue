<template>
  <div class="flex flex-col h-full w-full">
    <div class="bg-muted rounded-lg p-2 text-muted-foreground my-2">
      <div class="flex items-center justify-center">
        <MessageCircle />
        <span class="ml-2 text-sm font-medium inline">Mensajes Directos</span>
      </div>
      <SearchInput v-model="search" @clear="clearSearch" />
    </div>
    <ConversationList
      :conversations="filteredResults"
      :loading="loadingConversations || loading"
      @select="handleResultClick"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
// Stores
import { useMessageStore } from '@/stores/messages/messageStore'
import { useCurrentConversationStore } from '@/stores/conversations/currentConversationStore'
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'
// Icons
import { MessageCircle } from 'lucide-vue-next'
// Components
import SearchInput from '@/components/chat/SearchInput.vue'
import ConversationList from '@/components/chat/ConversationList.vue'
// API
import { getUserByName } from '@/services/api'

const messageStore = useMessageStore()
const currentConversationStore = useCurrentConversationStore()
const currentChannelStore = useCurrentChannelStore()

const conversations = computed(() => messageStore.conversations)
const loadingConversations = computed(() => messageStore.loadingConversations)
const search = ref('')
const filteredResults = ref([])
const loading = ref(false)

function debounce(fn, wait) {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }
}

watch(conversations, (newConversations) => {
  if (!search.value.trim()) {
    filteredResults.value = newConversations
  }
})

const debouncedSearch = debounce(async () => {
  if (!search.value.trim()) {
    filteredResults.value = conversations.value
    loading.value = false
    return
  }
  const localResults = conversations.value.filter(
    (conversation) =>
      conversation.user_recipient.full_name.toLowerCase().includes(search.value.toLowerCase()) ||
      conversation.content.toLowerCase().includes(search.value.toLowerCase()) ||
      conversation.user_recipient.network_user.toLowerCase().includes(search.value.toLowerCase())
  )
  filteredResults.value = localResults
  if (localResults.length === 0) {
    loading.value = true
    const apiResults = await searchUserInDB(search.value)
    if (Object.prototype.hasOwnProperty.call(apiResults, 'status') && apiResults.status === false) {
      console.log('API error:', apiResults)
      filteredResults.value = []
    } else {
      filteredResults.value = Array.isArray(apiResults) ? apiResults : [apiResults]
    }
    loading.value = false
    console.log('API results:', apiResults)
  }
}, 300)

watch(search, () => {
  debouncedSearch()
})

async function searchUserInDB(query) {
  try {
    const response = await getUserByName(query)
    return response.data
  } catch (error) {
    return []
  }
}

function handleResultClick(result) {
  if (isConversation(result)) {
    currentConversationStore.updateCurrentConversation(
      result.user_recipient.id_user,
      result.user_recipient.full_name
    )
  } else {
    currentConversationStore.updateCurrentConversation(result.id_user, result.full_name)
  }
  currentChannelStore.clearCurrentChannel()
}

function isConversation(result) {
  return result && result.user_recipient !== undefined
}

function clearSearch() {
  search.value = ''
  filteredResults.value = conversations.value
  loading.value = false
}
</script>