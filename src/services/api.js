// src/services/api.js
import axios from 'axios';
import { API_ENDPOINTS } from '@constants/apiEndpoints';
import { useAuthStore } from '@stores/auth';
import useLogout from '@composables/useLogout';

const publicApi = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const apiClient = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer`
  },
});

// obtener el token actual
const getToken = () => {
  const authStore = useAuthStore();
  return authStore.getSessionCookie();
};

// actualizar el token
const updateToken = (newToken) => {
  const authStore = useAuthStore();
  authStore.setSessionCookie(newToken);
  console.log('Nuevo token actualizado:', newToken);
};

// Configuración de interceptores
const setupInterceptors = (api) => {
  api.interceptors.request.use(addTokenToRequest, handleRequestError);
  api.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
};

// Funciones para los interceptores
const addTokenToRequest = (config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = config.data instanceof FormData ? 'multipart/form-data' : 'application/json';
  }
  return config;
};

const handleRequestError = (error) => {
  console.error('Error en la solicitud:', error);
  return Promise.reject(error);
};

const handleSuccessResponse = (response) => {
  const newToken = response.headers['new-token'];
  if (newToken) {
    updateToken(newToken);
  }
  return response;
};

const handleErrorResponse = async (error) => {
  if (error.response?.status === 401 && error.config.url !== API_ENDPOINTS.LOGOUT) {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
      console.log('Token expirado, cerrando sesión...');
      const { handleLogout } = useLogout();
      await handleLogout();
    }
  }
  return Promise.reject(error);
};

// Aplicar interceptores
setupInterceptors(apiClient);

// Auth
export const login = (credentials) => publicApi.post(API_ENDPOINTS.LOGIN, credentials);
export const logout = () => apiClient.get(API_ENDPOINTS.LOGOUT);
// Channels
export const getChannels = () => apiClient.get(API_ENDPOINTS.GET_CHANNELS);
export const postMessage = (content) => apiClient.post(API_ENDPOINTS.SEND_MESSAGE, content);
export const updateMessage = (message) => apiClient.post(API_ENDPOINTS.UPDATE_MESSAGE, message);
export const deleteMessage = (messageId) => apiClient.post(API_ENDPOINTS.DELETE_MESSAGE, { id_message: messageId });
// Users
export const getUserByName = (network_user) => apiClient.get(API_ENDPOINTS.GET_USER_BY_NAME.replace(':network_user', network_user));
export const getUsers = (page = 1, limit = 10) => apiClient.get(API_ENDPOINTS.GET_USERS, { params: { page, limit } });
export const createUser = (user) => apiClient.post(API_ENDPOINTS.CREATE_USER, user);
export const deleteUser = (id_user) => apiClient.delete(API_ENDPOINTS.DELETE_USER, id_user );
// Direct Messages
export const getConversations = () => apiClient.get(API_ENDPOINTS.GET_CONVERSATIONS);
export const postDirectMessage = (content) => apiClient.post(API_ENDPOINTS.CREATE_CONVERSATION, content);
export const deleteConversation = (conversationId) => apiClient.delete(API_ENDPOINTS.DELETE_CONVERSATION.replace(':id', conversationId));
export const updateConversation = (conversation) => apiClient.post(API_ENDPOINTS.UPDATE_CONVERSATION, conversation);
// Permissions
export const getPermissions = (id_user) => apiClient.post(API_ENDPOINTS.GET_PRIVILEGES, { id_user });

export default apiClient;
