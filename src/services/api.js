// src/services/api.js
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { useAuthStore } from '@/stores/auth';
import useLogout from '@/composables/useLogout'

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

// Interceptor para agregar el token a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      console.log('token en la solicitud:', token);
      //if the request is a post request and it has a file in it, then we change the content type to multipart/form-data
      if (config.method === 'post' && config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      }else{
        config.headers['Content-Type'] = 'application/json';
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar la respuesta y renovar el token si es necesario
apiClient.interceptors.response.use(
  (response) => {
    const newToken = response.headers['new-token'];
    if (newToken) {
      console.log('Nuevo token en la respuesta:', newToken);
      updateToken(newToken);
    }
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        console.log('Token expirado, cerrando sesión...')
        const { handleLogout } = useLogout()
        await handleLogout()
      }
    }
    return Promise.reject(error)
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

export const postDirectMessage = (content) => {
  console.log('Enviando mensaje:', content);
  
  return apiClient.post(API_ENDPOINTS.CREATE_CONVERSATION, content);
};

export default apiClient;
