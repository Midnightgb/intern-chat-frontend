//src/components/common/DirectMessages.vue
<template>
  <div class="flex flex-col h-full w-full dark:bg-gray-800">
    <div class="bg-muted rounded-lg p-2 text-muted-foreground my-2 dark:bg-gray-700 dark:text-gray-300">
      <div class="flex items-center justify-center">
        <MessageCircle class="dark:text-gray-400" />
        <span class="ml-2 text-sm font-medium inline dark:text-gray-200">Mensajes Directos</span>
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
import { useMessageStore } from '@stores/messages/messageStore'
import { useCurrentConversationStore } from '@stores/conversations/currentConversationStore'
import { useCurrentChannelStore } from '@stores/channels/currentChannelStore'
import { useCurrentContentStore } from '@stores/messages/contentStore'
// Icons
import { MessageCircle } from 'lucide-vue-next'
// Components
import SearchInput from '@components/chat/SearchInput.vue'
import ConversationList from '@components/chat/ConversationList.vue'
// API
import { getUserByName } from '@services/api'

const messageStore = useMessageStore()
const currentConversationStore = useCurrentConversationStore()
const currentChannelStore = useCurrentChannelStore()
const currentContentStore = useCurrentContentStore()

const conversations = computed(() => messageStore.conversations)
const loadingConversations = computed(() => messageStore.loadingConversations)
const search = ref('')
const filteredResults = ref([])
const loading = ref(false)
let searchCancelled = ref(false)

function debounce(fn, wait) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

watch(conversations, (newConversations) => {
  if (!search.value.trim()) {
    filteredResults.value = newConversations
  }
})

const debouncedSearch = debounce(async () => {
  if (searchCancelled.value || !search.value.trim()) {
    clearSearch()
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
    searchCancelled.value = true
    return
  }

  loading.value = true
  try {
    const apiResults = await searchUserInDB(search.value)
    if (!searchCancelled.value) {
      if (apiResults.status === false) {
      
        filteredResults.value = []
      } else {
        filteredResults.value = Array.isArray(apiResults) ? apiResults : [apiResults]
      }
    }
  } catch (error) {
    console.error('Error en la búsqueda:', error)
    filteredResults.value = []
  } finally {
    loading.value = false
  }
}, 300)

watch(search, (newSearch) => {
  searchCancelled.value = false
  if (newSearch.trim() === '') {
    clearSearch()
  } else {
    debouncedSearch()
  }
})

async function searchUserInDB(query) {
  try {
    const response = await getUserByName(query)
    return response.data
  } catch (error) {
    console.error('Error en searchUserInDB:', error)
    return []
  }
}

function handleResultClick(result) {
  

    // Verificar si es una conversación
    if (isConversation(result)) {
        // Actualizar la conversación actual
        currentConversationStore.updateCurrentConversation(
            result.user_recipient.id_user,
            result.user_recipient.full_name
        );

        // Limpiar contenido anterior
        currentContentStore.clearCurrentContent();
        currentContentStore.clearCurrentContentUsers();

        // Actualizar contenido actual
        currentContentStore.updateCurrentContent(result.user_recipient.full_name, result.user_recipient.photo_url, 'Conversation');

        // Crear un array de usuarios en la estructura deseada
        const users = [
            {
                users: {
                    id_user: result.user_send.id_user,
                    full_name: result.user_send.full_name,
                }
            },
            {
                users: {
                    id_user: result.user_recipient.id_user,
                    full_name: result.user_recipient.full_name,
                    photo_url: result.user_recipient.photo_url,
                }
            }
        ];

        // Actualizar usuarios en el contenido actual
        currentContentStore.updateCurrentContentUsers(users);
    } else {
        // Manejar otros tipos de resultados
        currentConversationStore.updateCurrentConversation(result.id_user, result.full_name);
        currentContentStore.clearCurrentContentUsers();
        currentContentStore.clearCurrentContent();
        currentContentStore.updateCurrentContent(result.full_name, null, 'Conversation');

        const users = [
            {
                users: {
                    id_user: result.user_send.id_user,
                    full_name: result.user_send.full_name,
                }
            }
        ];

        currentContentStore.updateCurrentContentUsers(users);
    }

    // Limpiar canal actual
    currentChannelStore.clearCurrentChannel();
}


function isConversation(result) {
  return result && result.user_recipient !== undefined
}

function clearSearch() {
  search.value = ''
  searchCancelled.value = true
  filteredResults.value = conversations.value
  loading.value = false
}
</script>