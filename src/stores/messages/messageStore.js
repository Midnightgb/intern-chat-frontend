// src/stores/messages/messageStore.js
import { defineStore } from 'pinia';
import { getMessagesChannel } from '@/services/api';  

export const useMessageStore = defineStore('message', {
  state: () => ({
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMessages(channelId) {
      console.log("ESTAN ENTRADO A HACER LA PETICION");
      this.loading = true;
      try {
        const response = await getMessagesChannel(channelId);
        console.log('Messages xxxxx:', response);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          this.error = 'Acceso denegado. Verifica tus credenciales.';
        } else {
          this.error = 'Ocurrió un error al obtener los mensajes.';
        }
        console.error('Error fetching messages:', err);
      } finally {
        this.loading = false;
      }
    },
  },
});
