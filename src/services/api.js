// src/services/api.js
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

const publicApi = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const apiClient = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer`
  },
});

// Interceptor para agregar el token a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const cookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('session='));
    const token = cookie ? cookie.split('=')[1] : null;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funciones de API
export const login = (credentials) => {
  return publicApi.post(API_ENDPOINTS.LOGIN, credentials);
};

export const logout = () => {
  return apiClient.get(API_ENDPOINTS.LOGOUT);
};

export const getChannels = () => {
  return apiClient.get(API_ENDPOINTS.GET_CHANNELS);
};

export const postMessage = (content) => {
  return apiClient.post(API_ENDPOINTS.SEND_MESSAGE, content);
};

export const updateMessage = (message) => {
  return apiClient.post(API_ENDPOINTS.UPDATE_MESSAGE, {
    id_message: message.id_message,
    content: message.content
  });
};

export const getUserByName = (network_user) => {
  return apiClient.get(API_ENDPOINTS.GET_USER_BY_NAME.replace(':network_user', network_user));
};

export default apiClient;
