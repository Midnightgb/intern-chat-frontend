// src/stores/messages/messageStore.js
import { defineStore } from 'pinia';
import { updateMessage as updateMessageApi } from '@/services/api';

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [], 
    conversations: [],
    loadingMessages: false,
    loadingConversations: false,
    error: null,
  }),
  actions: {
    async setMessages(messages) {
      console.log('Setting messages:', messages);
      this.messages = messages;
    },
    addMessage(message) {
      this.messages.push(message);
    },
    async updateMessage(updatedMessage) {
      try {
        // Actualizar el mensaje en el estado
        const index = this.messages.findIndex(m => m.id_message === updatedMessage.id_message);
        if (index !== -1) {
          this.messages[index] = { 
            ...this.messages[index], 
            ...updatedMessage 
          };
        }

        // Enviar solicitud de actualización al backend
        await updateMessageApi(updatedMessage);
      } catch (error) {
        this.error = 'No se pudo actualizar el mensaje';
        console.error('Error updating message in store:', error);
      }
    },
    deleteMessage(messageId) {
      this.messages = this.messages.filter(m => m.id_message !== messageId);
    },
    setConversations(conversations) {
      this.conversations = conversations;
    },
    setLoadingMessages(loading) {
      this.loadingMessages = loading;
    },
    setLoadingConversations(loading) {
      this.loadingConversations = loading;
    },
    setError(error) {
      this.error = error;
    },
    clearMessages() {
      this.messages = [];
    }
  },
});
