// src/stores/conversations/currentConversationStore.js

import { defineStore } from 'pinia';

export const useCurrentConversationStore = defineStore('currentConversationStore', {
  state: () => ({
    currentConversationId: null,
    currentConversationName: '',
  }),
  actions: {
    updateCurrentConversation(id, name) {
      this.currentConversationId = id;
      this.currentConversationName = name;
    },
    clearCurrentConversation() {
      this.currentConversationId = null;
      this.currentConversationName = null;
    }
  },
});
