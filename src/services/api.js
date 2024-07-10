import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://intern-chat-backend-production.onrender.com/collaborative_chat/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
