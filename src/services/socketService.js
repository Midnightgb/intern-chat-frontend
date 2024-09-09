// src/services/socketService.js
import { io } from 'socket.io-client'
import { useMessageStore } from '@/stores/messages/messageStore'
import { useAuthStore } from '@/stores/auth'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'
import { postMessage } from '@/services/api'

const SOCKET_URL = API_ENDPOINTS.SOCKET_URL

class SocketService {
  constructor() {
    this.socket = null
    this.messageStore = null
    this.authStore = null
  }

  connect() {
    this.messageStore = useMessageStore()
    this.authStore = useAuthStore()

    if (!this.authStore.isAuthenticated || !this.authStore.token) {
      return;
    }
    
    this.socket = io(SOCKET_URL, {
      auth: {
        token: this.authStore.token
      }
    })

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server')
    })

    this.socket.on('token_renewed', (data) => {
      console.log('Data emitida: ', data);
      console.log('Nuevo Token recibido emitido: ', data.token_new)
      this.authStore.setSessionCookie(data.token_new)
      this.socket.auth.token = data.token_new
    })

    this.socket.on('messages_channel', (data) => {
      this.messageStore.setMessages(data)
      this.messageStore.setLoadingMessages(false)
    })

    this.socket.on('new_message_channel', (message) => {
      this.messageStore.addMessage(message)
    })

    this.socket.on('update_message_channel', (message) => {
      this.messageStore.updateMessage(message)
    })

    this.socket.on('delete_message_channel', (message) => {
      this.messageStore.deleteMessage(message.id_message)
    })

    this.socket.on('conversations', (data) => {
      this.messageStore.setConversations(data)
      this.messageStore.setLoadingConversations(false)
    })

    this.socket.on('conversation_messages', (messages) => {
      this.messageStore.setMessages(messages)
      this.messageStore.setLoadingMessages(false)
    })

    this.socket.on('direct_message', (data) => {
      this.messageStore.setMessages(data) // Actualiza los mensajes directos en el mismo estado
      this.messageStore.setLoadingMessages(false)
    })

    this.socket.on('get_direct_messages', (data) => {
      this.messageStore.setMessages(data) // Actualiza los mensajes directos en el mismo estado
      this.messageStore.setLoadingMessages(false)
    })

    this.socket.on('error', (error) => {
      console.warn('WebSocket error:', error);
      this.messageStore.setError(error);
      this.messageStore.setLoadingMessages(false);
      this.messageStore.setLoadingConversations(false);

      // Asegúrate de que si hay un error, los mensajes se establezcan en una lista vacía.
      this.messageStore.setMessages([]);  // Aquí se establece que no hay mensajes disponibles.
    });


    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
    })
  }

  joinChannel(channelId) {
    this.messageStore.clearMessages()
    const token = this.authStore.token
    this.messageStore.setLoadingMessages(true)
    this.socket.emit('join_channel', { channelId, token })
  }

/*   sendMessage(channel_id, message) {
    postMessage({ channel_id, content: message })
    this.socket.emit('new_message_channel', { channel_id, message, token: this.authStore.token })
  } */
    sendMessage(channel_id, message, file = null) {
      const content = { channel_id, content: message };
      if (file) {
        content.file = file;
      }
      postMessage(content)
        .then(() => {
          this.socket.emit('new_message_channel', { 
            channel_id, 
            message, 
            file: file ? file.name : null, 
            token: this.authStore.token 
          });
        })
        .catch(error => {
          console.error('Error al enviar el mensaje:', error);
        });
    }
  getConversations() {
    if (!this.socket || !this.authStore.isAuthenticated) {
      console.warn('No se pueden obtener conversaciones: socket no inicializado o usuario no autenticado');
      return;
    }

    const token = this.authStore.token;
    if (!token) {
      console.warn('Token no disponible');
      return;
    }
    this.messageStore.setLoadingConversations(true)
    this.socket.emit('get_conversations', { token })
  }

  getDirectMessages(send_id, recipient_id) {
    this.messageStore.clearMessages()
    const token = this.authStore.token
    this.messageStore.setLoadingMessages(true)
    this.socket.emit('direct_message', { send_id, recipient_id, token })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export const socketService = new SocketService()
