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
    async updateMessageChannel(updatedMessage) {
      try {
        // Actualizar el mensaje en el estado
        const index = this.messages.findIndex(m => m.id_message === updatedMessage.id_message);
        if (index !== -1) {
          this.messages[index] = { 
            ...this.messages[index], 
            ...updatedMessage 
          };
        }

        console.log('Updating message in store:', updatedMessage);
        
        // Enviar solicitud de actualización al backend
        await updateMessageApi(updatedMessage);
      } catch (error) {
        this.error = 'No se pudo actualizar el mensaje';
        console.error('Error updating message in store:', error);
      }
    },
    async updateMessageCoversation(updateConversation) {
      try {
        // Actualizar la conversación en el estado
        const index = this.conversations.findIndex(c => c.id_conversation === updateConversation.id_conversation);
        if (index !== -1) {
          this.conversations[index] = { 
            ...this.conversations[index], 
            ...updateConversation 
          };
        }
      } catch (error) {
        this.error = 'No se pudo actualizar la conversación';
        console.error('Error updating conversation in store:', error);
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
