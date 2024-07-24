//src/services/socketService.js
import { io } from 'socket.io-client';
import { useMessageStore } from '@/stores/messages/messageStore';
import { useAuthStore } from '@/stores/auth';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

const SOCKET_URL = API_ENDPOINTS.SOCKET_URL;

class SocketService {
  constructor() {
    this.socket = null;
    this.messageStore = null;
    this.authStore = null;
  }

  connect() {
    this.messageStore = useMessageStore();
    this.authStore = useAuthStore();

    this.socket = io(SOCKET_URL);

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('messages_channel', (data) => {
      this.messageStore.setMessages(data);
    });

    this.socket.on('new_message_channel', (message) => {
      //agregar consumo para enviar mensaje
      this.messageStore.addMessage(message);
    });

    this.socket.on('update_message_channel', (message) => {
      //agregar consumo para actualizar mensaje
      this.messageStore.updateMessage(message);
    });

    this.socket.on('delete_message_channel', (message) => {
      //agregar consumo para eliminar mensaje
      this.messageStore.deleteMessage(message.id_message);
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  joinChannel(channelId) {
    const token = this.authStore.token;
    this.socket.emit('join_channel', { channelId, token });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  
  sendMessage(channelId, content) {
    console.log('sendMessage', channelId, content);
    this.socket.emit('new_message', { channelId, content, token: this.authStore.token });
  }
}

export const socketService = new SocketService();