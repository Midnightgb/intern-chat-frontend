//src/components/common/DirectMessages.vue
<template>
  <div class="flex flex-col h-full w-full">
    <div class="bg-muted rounded-lg p-2 text-muted-foreground my-2">
      <div class="flex items-center justify-center">
        <MessageCircle />
        <span class="ml-2 text-sm font-medium inline">Mensajes Directos</span>
      </div>
      <!-- Botón para crear un nuevo mensaje directo y input para buscar usuarios -->
      <div class="flex items-center justify-between mt-2">
        <div class="relative w-10/12">
          <input
            v-model="search"
            type="text"
            placeholder="Buscar..."
            class="w-full p-1 rounded-lg bg-slate-200 text-muted-foreground placeholder:text-xs"
          />
          <button
            v-if="search"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full transition-all hover:text-slate-600 text-slate-400"
            @click="clearSearch"
          >
            <CircleX class="w-6 h-6"/>
          </button>
        </div>
        <button
          class="ml-auto p-2 rounded-full transition-all hover:bg-slate-200 hover:text-accent-foreground"
          @click="nada"
        >
          <CirclePlus />
        </button>
      </div>
      <!--  -->
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

      <div v-else-if="filteredResults.length > 0" class="space-y-1">
        <button
          v-for="result in filteredResults"
          :key="getKey(result)"
          class="p-2 text-muted-foreground border-b-2 hover:bg-slate-200 hover:text-accent-foreground w-full"
          @click="handleResultClick(result)"
        >
          <div class="flex items-center w-full">
            <ImageLoader :message="result" v-if="isConversation(result)" />
            <img
              v-else
              :src="result.photo_url || 'path/to/default/avatar.png'"
              alt="User avatar"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div class="flex flex-col items-start flex-grow ml-2">
              <div class="flex justify-between items-center w-full">
                <div class="text-sm font-medium inline capitalize truncate">
                  <TruncatedContent :content="getName(result)" />
                </div>
                <span class="text-xs text-muted-foreground">
                  {{ getSubtitle(result) }}
                </span>
              </div>
              <span class="flex text-xs text-muted-foreground mt-1 truncate w-full">
                <TruncatedContent :content="getContent(result)" />
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
import { computed, ref, watchEffect } from 'vue'
// Stores
import { useMessageStore } from '@/stores/messages/messageStore'
import { useCurrentConversationStore } from '@/stores/conversations/currentConversationStore'
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'
// Icons
import { MessageCircle, CirclePlus, CircleX } from 'lucide-vue-next'
// Components
import TruncatedContent from '@/components/common/TruncatedContent.vue'
import ImageLoader from '@/components/common/ImageLoader.vue'
// Utils
import { formatDate } from '@/utils/date/convertTime'
// API
import { getUserByName } from '@/services/api.js'

const messageStore = useMessageStore()
const currentConversationStore = useCurrentConversationStore()
const currentChannelStore = useCurrentChannelStore()
const conversations = computed(() => messageStore.conversations)
const loadingConversations = computed(() => messageStore.loadingConversations)

const search = ref('')
const filteredResults = ref([])
let debounceTimeout = null

watchEffect(async () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  if (!search.value) {
    filteredResults.value = conversations.value
    return
  }

  const localResults = conversations.value.filter(
    (conversation) =>
      conversation.user_recipient.full_name.toLowerCase().includes(search.value.toLowerCase()) ||
      conversation.content.toLowerCase().includes(search.value.toLowerCase()) || 
      conversation.user_recipient.network_user.toLowerCase().includes(search.value.toLowerCase())
  )

  if (localResults.length > 0) {
    filteredResults.value = localResults
  } else {
    debounceTimeout = setTimeout(async () => {
      if (search.value === '') {
        return
      }
      const apiResults = await searchUserInDB(search.value)
      filteredResults.value = Array.isArray(apiResults) ? apiResults : [apiResults]
      console.log('API results:', apiResults)
    }, 200)
  }
})

async function searchUserInDB(query) {
  try {
    const response = await getUserByName(query)
    console.log('query:', query);
    console.log('API response:', response);
    return response.data
  } catch (error) {
    console.warn('User not found')
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
    currentConversationStore.updateCurrentConversation(
      result.id_user,
      result.full_name
    )
  }
  currentChannelStore.clearCurrentChannel()
}

function isConversation(result) {
  return result && result.user_recipient !== undefined
}

function getKey(result) {
  console.log("1isConversation: ", isConversation(result))
  
  return isConversation(result) ? result.user_recipient.id_user : result.id_user
}

function getName(result) {
  console.log("2isConversation: ", isConversation(result))
  
  return isConversation(result) ? result.user_recipient.full_name : result.full_name
}

function getSubtitle(result) {
  console.log("3isConversation: ", isConversation(result))
  
  if (isConversation(result)) {
    return formatDate(result.date)
  } else {
    return result.network_user
  }
}

function getContent(result) {
  console.log("4isConversation: ", isConversation(result))
  return isConversation(result) ? result.content : (result.dominio || 'No domain specified')
}

function clearSearch() {
  search.value = ''
}

function nada() {
  console.log('nada')
}

</script>
