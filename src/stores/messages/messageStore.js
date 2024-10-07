// src/stores/messages/messageStore.js
import { defineStore } from 'pinia';
import { updateMessage as updateMessageApi, deleteMessage as deleteMessageApi, updateConversation as updateConversationApi, deleteConversation as deleteConversationApi } from '@/services/api';

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
        const index = this.messages.findIndex(m => m.id_message === updatedMessage.id_message);
        if (index !== -1 && this.messages[index].content !== updatedMessage.content) {
          this.messages[index] = { 
            ...this.messages[index], 
            ...updatedMessage 
          };
          const response = await updateMessageApi(updatedMessage);
          if (response) {
            console.log('XXX RESPONSE:', response);
          }
        }
      } catch (error) {
        this.error = 'No se pudo actualizar el mensaje';
        console.error('Error updating message in store:', error);
      }
    },
    async updateMessageConversation(updateConversation) {
      console.log('Entrando a updateMessageConversation', updateConversation);
      try {
        const index = this.conversations.findIndex(c => c.id_direct_message === updateConversation.id_direct_message);
        console.log('Index:', index);
        
        if (index !== -1 && this.conversations[index].content !== updateConversation.content) {
          this.conversations[index] = { 
            ...this.conversations[index], 
            ...updateConversation 
          };
          const response = await updateConversationApi(updateConversation);
          if (response) {
            console.log('Response from API:', response);
          } else {
            console.error('Failed to update direct message in backend');
          }
        }
      } catch (error) {
        this.error = 'No se pudo actualizar la conversación';
        console.error('Error updating conversation in store:', error);
      }
    },
    async deleteMessage(message) {
      try {
        console.log('Deleting message:', message);
        // Enviar solicitud de eliminación al backend
        await deleteMessageApi(message);

        // Actualizar el estado eliminando el mensaje
        this.messages = this.messages.filter(m => m.id_message !== message);
        console.log(`Mensaje con ID ${message} eliminado del estado y backend.`);
      } catch (error) {
        this.error = 'No se pudo eliminar el mensaje';
        console.error('Error al eliminar el mensaje en el store:', error);
      }
    },
    async deleteConversation(conversation) {
      try {
        console.log("esto me llego xxxx", conversation);
        // Enviar solicitud de eliminación al backend
        await deleteConversationApi(conversation);

        // Actualizar el estado eliminando el mensaje
        this.conversations = this.conversations.filter(c => c.id_direct_message !== conversation);
        console.log(`Conversación con ID ${conversation} eliminada del estado y backend.`);
      } catch (error) {
        this.error = 'No se pudo eliminar la conversación';
        console.error('Error al eliminar la conversación en el store:', error);
      }
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
