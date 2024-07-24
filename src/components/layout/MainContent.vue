//src/components/chat/MessageList.vue
<template>
  <main class="flex-1 border-r border-t border-gray-300 mt-2 rounded-tr-xl bg-background p-6">
    <div class="flex flex-col h-full">
      <!-- Mostrar mensaje cuando el canal no esté seleccionado -->
      <div v-if="currentChannelId === null" class="flex items-center justify-center h-full">
        <h2 class="text-2xl font-bold text-gray-500">Por favor, selecciona un canal.</h2>
      </div>
      <!-- Mostrar loader cuando el canal esté seleccionado pero los datos no se hayan cargado -->
      <div v-else-if="isLoading" class="flex items-center justify-center h-full">
        <fwb-spinner color="gray" size="10" />
      </div>
      <!-- Mostrar contenido del canal cuando los datos estén listos -->
      <div v-else>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
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
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
              <line x1="6" x2="6.01" y1="6" y2="6"></line>
              <line x1="6" x2="6.01" y1="18" y2="18"></line>
            </svg>
            <h2 class="text-xl font-bold">Server 1</h2>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
            >
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
                class="h-5 w-5"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <button
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
            >
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
                class="h-5 w-5"
              >
                <path
                  d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1-1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                ></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>
        <div class="flex-1 bg-muted rounded-lg p-4 overflow-auto">
          <MessageList />
        </div>
        <MessageInput />
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { FwbSpinner } from 'flowbite-vue';
import { onMounted, onUnmounted, watch } from 'vue';
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore';
import { useMessageStore } from '@/stores/messages/messageStore';
import { socketService } from '@/services/socketService';

import MessageInput from '@/components/chat/MessageInput.vue';
import MessageList from '@/components/chat/MessageList.vue';

const currentChannelStore = useCurrentChannelStore();
const messageStore = useMessageStore();
const { currentChannelId } = storeToRefs(currentChannelStore);
const { loading: isLoading } = storeToRefs(messageStore);

onMounted(() => {
  socketService.connect();
});

onUnmounted(() => {
  socketService.disconnect();
});

watch(currentChannelId, (newChannelId) => {
  if (newChannelId) {
    console.log('Joining channel:', newChannelId);
    socketService.joinChannel(newChannelId);
  }
});
</script>