// src/stores/messages/messageStore.js
import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [], 
    conversations: [],
    loadingMessages: false,
    loadingConversations: false,
    error: null,
  }),
  actions: {
    setMessages(messages) {
      console.log('Setting messages:', messages);
      console.log("-------------------------------------");
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
      console.log('Setting conversations:', conversations);
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
