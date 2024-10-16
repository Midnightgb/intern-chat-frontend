// src/stores/messages/messageStore.js
import { defineStore } from 'pinia';
import { updateMessage as updateMessageApi, deleteMessage as deleteMessageApi, updateConversation as updateConversationApi, deleteConversation as deleteConversationApi } from '@/services/api';
import { useCurrentContentStore } from '@stores/messages/contentStore'

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
    
      const currentContentStore = useCurrentContentStore();
      currentContentStore.updateCurrentContentMessage(messages.length)

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
          
          } else {
            console.error(`Failed to update ${errorMessage} in backend`);
          }
        }
      } catch (error) {
        this.error = `No se pudo actualizar ${errorMessage}`;
        console.error(`Error updating ${errorMessage} in store:`, error);
      }
    },
    async deleteMessage(messageId, type) {
      try {
      
        
        // Enviar solicitud de eliminación al backend
        if (type === 'id_direct_message') {
          await deleteConversationApi(messageId);
        } else {
          await deleteMessageApi(messageId);
        }

        // Actualizar el estado eliminando el mensaje
        this.messages = this.messages.filter(m => 
          m.id_message !== messageId && m.id_direct_message !== messageId
        );
      
      } catch (error) {
        this.error = 'No se pudo eliminar el mensaje';
        console.error('Error al eliminar el mensaje en el store:', error);
      }
    },
    async deleteConversation(conversation) {
      try {
      
        // Enviar solicitud de eliminación al backend
        await deleteConversationApi(conversation);

        // Actualizar el estado eliminando el mensaje
        this.conversations = this.conversations.filter(c => c.id_direct_message !== conversation);
      
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
