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

    this.socket = io(SOCKET_URL)

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server')
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

    this.socket.on('error', (error) => {
      console.warn('WebSocket error:', error)
      this.messageStore.setError(error)
      this.messageStore.setLoadingMessages(false) 
      this.messageStore.setLoadingConversations(false) 
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
    })
  }

  joinChannel(channelId) {
    const token = this.authStore.token
    this.messageStore.clearMessages()  
    this.messageStore.setLoadingMessages(true) 
    this.socket.emit('join_channel', { channelId, token })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  sendMessage(channel_id, message) {
    console.log('sendMessage', channel_id, message, this.authStore.token)
    postMessage({ channel_id, content: message })
    this.socket.emit('new_message_channel', { channel_id, message, token: this.authStore.token })
  }

  getConversations() {
    const token = this.authStore.token
    this.messageStore.setLoadingConversations(true) 
    this.socket.emit('get_conversations', { token })
  }
}

export const socketService = new SocketService()
