// src/stores/conversations/currentConversationStore.js

import { defineStore } from 'pinia'

export const useCurrentConversationStore = defineStore('currentConversationStore', {
  state: () => ({
    currentConversationId: null,
    currentConversationName: '',
  }),
  actions: {
    setCurrentConversationId(conversationId) {
      this.currentConversationId = conversationId
    },
    setCurrentConversationName(conversationName) {
      this.currentConversationName = conversationName
    },
  }
})
