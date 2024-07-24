//src/layout/MainContent.vue
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
          <ServerHeader :serverName="currentChannelName" />
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
// Services
import { socketService } from '@/services/socketService';
// Stores
import { useCurrentChannelStore } from '@/stores/channels/currentChannelStore';
import { useMessageStore } from '@/stores/messages/messageStore';
// Components
import MessageInput from '@/components/chat/MessageInput.vue';
import MessageList from '@/components/chat/MessageList.vue';
import ServerHeader from '@/components/partials/ServerHeader.vue';

const currentChannelStore = useCurrentChannelStore();
const messageStore = useMessageStore();
const { currentChannelId, currentChannelName } = storeToRefs(currentChannelStore);
const { loading: isLoading } = storeToRefs(messageStore);

onMounted(() => {
  socketService.connect();
});

onUnmounted(() => {
  socketService.disconnect();
});

watch(currentChannelId, (newChannelId) => {
  if (newChannelId) {
    socketService.joinChannel(newChannelId);
  }
});
</script>