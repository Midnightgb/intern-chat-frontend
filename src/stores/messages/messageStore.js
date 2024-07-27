import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [],
    loading: false,
    error: null,
  }),
  actions: {
    setMessages(messages) {
      console.log('Setting messages:', messages); // Agregado para depuración
      this.messages = messages;
    },
    addMessage(message) {
      console.log('Adding message to store:', message); // Agregado para depuración
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
