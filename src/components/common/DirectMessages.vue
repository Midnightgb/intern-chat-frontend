//src/components/common/DirectMessages.vue
<template>
  <div class="flex flex-col h-full w-full">
    <div class="bg-muted rounded-lg p-2 text-muted-foreground my-2">
      <div class="flex items-center justify-center">
        <MessageCircle />
        <span class="ml-2 text-sm font-medium inline">Mensajes Directos</span>
      </div>
      <div class="flex items-center justify-between mt-2">
        <div class="relative w-full">
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
            <CircleX class="w-6 h-6" />
          </button>
        </div>
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
      <div v-else-if="loading" class="space-y-2">
        <v-skeleton-loader
          v-for="index in 3"
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
            <ImageLoader :message="result" />
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

      <div v-else class="text-center text-sm font-bold p-4 text-slate-400">
        <p>No hay conversaciones o usuarios que coincidan con tu búsqueda.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
// Stores
import { useMessageStore } from '@/stores/messages/messageStore'
import { useCurrentConversationStore } from '@/stores/conversations/currentConversationStore'
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore'
// Icons
import { MessageCircle, CircleX } from 'lucide-vue-next'
// Components
import TruncatedContent from '@/components/common/TruncatedContent.vue'
import ImageLoader from '@/components/common/ImageLoader.vue'
// Utils
import { formatDate } from '@/utils/date/convertTime'
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
  // fn: función a la que se le aplicará el debounce y wait: tiempo de espera
  let timer // Inicializar el temporizador
  return function (...args) {
    // Devolver una función que recibe argumentos
    if (timer) clearTimeout(timer) // Si el temporizador está activo, limpiarlo
    timer = setTimeout(() => {
      // Establecer un nuevo temporizador
      fn(...args) // Llamar a la función con los argumentos
    }, wait) // Esperar el tiempo especificado
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

function getKey(result) {
  return isConversation(result) ? result.user_recipient.id_user : result.id_user
}

function getName(result) {
  return isConversation(result) ? result.user_recipient.full_name : result.full_name
}

function getSubtitle(result) {
  if (isConversation(result)) {
    return formatDate(result.date)
  } else {
    return result.network_user
  }
}

function getContent(result) {
  return isConversation(result) ? result.content : result.dominio || 'No domain specified'
}

function clearSearch() {
  search.value = ''
  filteredResults.value = conversations.value
  loading.value = false
}
</script>
