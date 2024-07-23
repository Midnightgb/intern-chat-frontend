// src/composables/messages/useMessagesWatcher.js
import { ref, watch } from 'vue';
import { useMessageStore } from '@/stores/messages/messageStore'; 

export function useMessagesWatcher(currentChannelId) {
  const messageStore = useMessageStore();
  const isLoading = ref(false);
  const messages = ref([]);

  watch(
    currentChannelId,
    async (newId) => {
      console.log("SE PRESENTA CAMBIOS EN EL ID DEL CANAL");
      if (newId !== null) {
        isLoading.value = true;
        await messageStore.fetchMessages(newId);
        messages.value = messageStore.messages[newId] || [];
        isLoading.value = false;
      } else {
        isLoading.value = false;
        messages.value = [];
      }
    },
    { immediate: true }
  );

  return {
    isLoading,
    error: messageStore.error,
    messages
  };
}
