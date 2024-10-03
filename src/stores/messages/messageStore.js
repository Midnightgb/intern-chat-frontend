// src/stores/messages/messageStore.js
import { defineStore } from 'pinia';
import { updateMessage as updateMessageApi, deleteMessage as deleteMessageApi, updateConversation as updateConversationApi } from '@/services/api';

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
        // Verificar si el mensaje realmente cambió antes de actualizar
        const index = this.messages.findIndex(m => m.id_message === updatedMessage.id_message);
        if (index !== -1 && this.messages[index].content !== updatedMessage.content) {
          // Actualizar el mensaje solo si su contenido ha cambiado
          this.messages[index] = { 
            ...this.messages[index], 
            ...updatedMessage 
          };

          console.log('Updating message in store:', updatedMessage);

          const response = await updateMessageApi(updatedMessage);
          if (response) {
            console.log('XXX RESPONSE:', response);
          }
          
          // Enviar solicitud de actualización al backend
          await updateMessageApi(updatedMessage);
        }
      } catch (error) {
        this.error = 'No se pudo actualizar el mensaje';
        console.error('Error updating message in store:', error);
      }
    },
    async updateMessageConversation(updateConversation) {
      try {
        // Verificar si la conversación realmente cambió antes de actualizar
        const index = this.conversations.findIndex(c => c.id_conversation === updateConversation.id_conversation);
        if (index !== -1 && this.conversations[index].name !== updateConversation.name) {
          // Actualizar la conversación solo si su nombre ha cambiado
          this.conversations[index] = { 
            ...this.conversations[index], 
            ...updateConversation 
          };
    
          console.log('Updating conversation in store:', updateConversation);
          
          // Enviar solicitud de actualización al backend
         const response = await updateConversationApi(updateConversation);
          if (response) {
            console.log('XXXXX RESPONSE DIRECT:', response);
          }
        }
      } catch (error) {
        this.error = 'No se pudo actualizar la conversación';
        console.error('Error updating conversation in store:', error);
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
