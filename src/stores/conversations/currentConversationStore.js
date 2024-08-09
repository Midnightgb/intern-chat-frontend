// src/stores/conversations/currentConversationStore.js

import { defineStore } from 'pinia';

export const useCurrentConversationStore = defineStore('currentConversationStore', {
  state: () => ({
    currentConversationId: null,
    currentConversationName: '',
  }),
  actions: {
    setCurrentConversationId(id) {
      this.currentConversationId = id;
    },
    setCurrentConversationName(name) {
      this.currentConversationName = name;
    },
  },
});
