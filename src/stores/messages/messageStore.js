// src/stores/messages/messageStore.js
import { defineStore } from 'pinia';
import { updateMessage as updateMessageApi, deleteMessage as deleteMessageApi, updateConversation as updateConversationApi } from '@services/api';

var errorMessage;
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
        const isDirectMessage = 'id_direct_message' in updatedMessage;
        const idField = isDirectMessage ? 'id_direct_message' : 'id_message';
        const updateApi = isDirectMessage ? updateConversationApi : updateMessageApi;
        errorMessage = isDirectMessage ? 'la conversación' : 'el mensaje';

        const index = this.messages.findIndex(m => m[idField] === updatedMessage[idField]);
        
        if (index !== -1 && this.messages[index].content !== updatedMessage.content) {
          this.messages[index] = { 
            ...this.messages[index], 
            ...updatedMessage 
          };
          
          const response = await updateApi(updatedMessage);
          
          if (response) {
            console.log('Response from API:', response);
          } else {
            console.error(`Failed to update ${errorMessage} in backend`);
          }
        }
      } catch (error) {
        this.error = `No se pudo actualizar ${errorMessage}`;
        console.error(`Error updating ${errorMessage} in store:`, error);
      }
    },
    async deleteMessage(message) {
      try {
        const messageId = message.id_message;
        // Enviar solicitud de eliminación al backend
        await deleteMessageApi(messageId);

        // Actualizar el estado eliminando el mensaje
        this.messages = this.messages.filter(m => m.id_message !== messageId);
        console.log(`Mensaje con ID ${messageId} eliminado del estado y backend.`);
      } catch (error) {
        this.error = 'No se pudo eliminar el mensaje';
        console.error('Error al eliminar el mensaje en el store:', error);
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
