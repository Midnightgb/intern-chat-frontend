// src/services/socketService.js
import { io } from 'socket.io-client'
import { useMessageStore } from '@stores/messages/messageStore'
import { useAuthStore } from '@stores/auth'
import { API_ENDPOINTS } from '@constants/apiEndpoints'
import { postMessage, postDirectMessage } from '@services/api'
import useLogout from '@composables/useLogout'

const SOCKET_URL = API_ENDPOINTS.SOCKET_URL

class SocketService {
  constructor() {
    this.socket = null
    this.messageStore = null
    this.authStore = null
    this.currentRequest = null
  }

  connect() {
    this.messageStore = useMessageStore()
    this.authStore = useAuthStore()

    if (!this.authStore.isAuthenticated || !this.authStore.token) {
      useLogout().handleLogout()
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
      this.authStore.setSessionCookie(data.token_new)
      this.socket.auth.token = data.token_new
    })

    this.socket.on('messages_channel', (data) => {
      this.messageStore.setMessages(data)
      this.messageStore.setLoadingMessages(false)
    })

    this.socket.on('new_message_channel', (message) => {
      console.log('Nuevo mensaje canal:', message);
      this.messageStore.addMessage(message)
    })

    this.socket.on('update_message_channel', (message) => {
      const existingMessage = this.messageStore.messages.find(m => m.id_message === message.id_message);
      if (!existingMessage || existingMessage.content !== message.content) {
        this.messageStore.updateMessageChannel(message);
      }
    })

    this.socket.on('delete_message_channel', (message) => {
      //this.messageStore.deleteMessage(message.id_message)
      console.log('Mensaje eliminado:', message);
      
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
      this.messageStore.setMessages(data)
      this.messageStore.setLoadingMessages(false)
    })
//new_conversations
    this.socket.on('new_conversation_direct', (data) => {
      this.messageStore.addMessage(data)
    })
    this.socket.on('get_direct_messages', (data) => {
      this.messageStore.setMessages(data)
      this.messageStore.setLoadingMessages(false)
    })

    this.socket.on('error', (error) => {
      console.warn('WebSocket error:', error);
      this.messageStore.setError(error);
      this.messageStore.setLoadingMessages(false);
      this.messageStore.setLoadingConversations(false);

      this.messageStore.setMessages([]);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
    })
  }
  
  cancelCurrentRequest() {
    if (this.currentRequest) {
      this.currentRequest.abort()
      this.currentRequest = null
    }
  }

  joinChannel(channelId) {
    this.cancelCurrentRequest()
    this.messageStore.clearMessages()
    const token = this.authStore.token
    this.messageStore.setLoadingMessages(true)
    
    this.currentRequest = new AbortController()
    this.socket.emit('join_channel', { channelId, token, signal: this.currentRequest.signal })
  }

  sendDirectMessage(recipient_id, message, file = null) {
    this.socket.emit('direct_message', { send_id: this.authStore.user.id, recipient_id, token: this.authStore.token })
    //if there is a file, send it in a form data
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('recipient_id', recipient_id)
      formData.append('content', message)
      postDirectMessage(formData)
    }else{
      const content = { recipient_id, content: message }
      postDirectMessage(content)
    }
  }

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
      useLogout().handleLogout()
      return;
    }

    const token = this.authStore.token;
    if (!token) {
      useLogout().handleLogout()
      return;
    }
    this.messageStore.setLoadingConversations(true)
    this.socket.emit('get_conversations', { token })
  }

  getDirectMessages(send_id, recipient_id) {
    this.cancelCurrentRequest()
    this.messageStore.clearMessages()
    const token = this.authStore.token
    this.messageStore.setLoadingMessages(true)
    
    this.currentRequest = new AbortController()
    this.socket.emit('direct_message', { send_id, recipient_id, token, signal: this.currentRequest.signal })
  }

  disconnect() {
    this.cancelCurrentRequest()
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export const socketService = new SocketService()