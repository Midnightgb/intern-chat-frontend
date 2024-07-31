// src/stores/messages/messageStore.js
import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [],
    conversations: [],
    loading: false,
    error: null,
  }),
  actions: {
    setMessages(messages) {
      console.log('Setting messages:', messages); // Agregado para depuración
      this.messages = messages;
    },
    addMessage(message) {
      this.messages.push(message);
    },
    updateMessage(updatedMessage) {
      const index = this.messages.findIndex(m => m.id_message === updatedMessage.id_message);
      if (index !== -1) {
        this.messages[index] = updatedMessage;
      }
    },
    deleteMessage(messageId) {
      this.messages = this.messages.filter(m => m.id_message !== messageId);
    },
    setConversations(conversations) {
      console.log('Setting conversations:', conversations); // Agregado para depuración
      this.conversations = conversations;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setError(error) {
      this.error = error;
    },
    clearMessages() {
      this.messages = [];
    }
  },
});
