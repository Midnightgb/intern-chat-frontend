import { io } from 'socket.io-client';
import { useMessageStore } from '@/stores/messages/messageStore';
import { useAuthStore } from '@/stores/auth';

const SOCKET_URL = 'https://intern-chat-backend-production.onrender.com';

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
      this.messageStore.addMessage(message);
    });

    this.socket.on('update_message_channel', (message) => {
      this.messageStore.updateMessage(message);
    });

    this.socket.on('delete_message_channel', (message) => {
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